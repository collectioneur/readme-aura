import satori from 'satori';
import { transform } from 'sucrase';
import type { ExtractedBlock, FontConfig, RenderOptions } from './types.js';

interface SatoriElement {
  type: string;
  props: Record<string, unknown> & {
    children?: SatoriElement | SatoriElement[] | string;
  };
}

export function parseMeta(meta?: string): RenderOptions {
  const defaults: RenderOptions = { width: 800, height: 400 };
  if (!meta) return defaults;

  const pairs = [...meta.matchAll(/(\w+)=(\d+)/g)];
  for (const [, key, value] of pairs) {
    if (key === 'width') defaults.width = parseInt(value, 10);
    if (key === 'height') defaults.height = parseInt(value, 10);
  }
  return defaults;
}

export function createElement(
  type: unknown,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): unknown {
  const flat = children.flat().filter((c) => c != null && c !== false && c !== true);
  return {
    type,
    props: {
      ...(props ?? {}),
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

export function transpileJsx(jsxString: string, context?: Record<string, unknown>): unknown {
  const wrapped = `return (${jsxString.trim()});`;

  const { code } = transform(wrapped, {
    transforms: ['jsx'],
    jsxRuntime: 'classic',
    production: true,
  });

  const argNames = ['React', ...(context ? Object.keys(context) : [])];
  const argValues = [{ createElement }, ...(context ? Object.values(context) : [])];

  const fn = new Function(...argNames, code);
  const element = fn(...argValues);

  if (!element || typeof element !== 'object' || !('type' in element)) {
    throw new Error(
      'JSX did not produce a valid element. Make sure your code returns a single root element.',
    );
  }

  return element;
}

function extractStyles(node: unknown, styles: string[]): unknown {
  if (!node || typeof node !== 'object') return node;

  const el = node as SatoriElement;

  if (el.type === 'style') {
    if (el.props?.children) {
      styles.push(String(el.props.children));
    }
    return null;
  }

  if (el.props?.children) {
    if (Array.isArray(el.props.children)) {
      el.props.children = el.props.children
        .map((c) => extractStyles(c, styles))
        .filter((c): c is SatoriElement => c !== null) as SatoriElement[];
    } else {
      const processed = extractStyles(el.props.children, styles);
      if (processed === null) {
        delete el.props.children;
      } else {
        el.props.children = processed as SatoriElement;
      }
    }
  }
  return el;
}

export async function renderBlock(
  block: ExtractedBlock,
  fonts: FontConfig[],
  context?: Record<string, unknown>,
): Promise<string> {
  const { width, height } = parseMeta(block.meta);

  let element: unknown;
  try {
    element = transpileJsx(block.content, context);
  } catch (err) {
    throw new Error(`Failed to transpile JSX in block ${block.index}: ${(err as Error).message}`, {
      cause: err,
    });
  }

  const extractedStyles: string[] = [];
  element = extractStyles(element, extractedStyles);

  try {
    let svg = await satori(element as Parameters<typeof satori>[0], {
      width,
      height,
      fonts,
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          const codepoint = [...segment].map((c) => (c.codePointAt(0) ?? 0).toString(16)).join('-');
          const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoint}.svg`;
          const res = await fetch(url);
          const svgText = await res.text();
          return `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`;
        }
        return '';
      },
    });

    // Unpack nested SVGs encoded by Satori as data:image/svg+xml;utf8,... <image> tags
    svg = svg.replace(
      /<image\s+([^>]*?)href="data:image\/svg\+xml;utf8,([^"]+)"([^>]*?)\/>/g,
      (match, before, encoded, after) => {
        try {
          const decoded = decodeURIComponent(encoded);
          const contentMatch = decoded.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
          const content = contentMatch ? contentMatch[1] : decoded;
          return `<svg ${before.trim()} ${after.trim()}>${content}</svg>`;
        } catch {
          return match;
        }
      },
    );

    if (extractedStyles.length > 0) {
      const combinedStyles = extractedStyles.join('\n');
      svg = svg.replace('</svg>', `<style>\n${combinedStyles}\n</style>\n</svg>`);
    }

    return svg;
  } catch (err) {
    throw new Error(`Failed to render block ${block.index} to SVG: ${(err as Error).message}`, {
      cause: err,
    });
  }
}

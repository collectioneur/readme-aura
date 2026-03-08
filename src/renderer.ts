import satori from 'satori';
import { transform } from 'sucrase';
import type { ExtractedBlock, FontConfig, GitHubData, RenderOptions } from './types.js';

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
  const flat = children.flat().filter(c => c != null && c !== false && c !== true);
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

  // Build argument names and values from context
  const argNames = ['React', ...(context ? Object.keys(context) : [])];
  const argValues = [{ createElement }, ...(context ? Object.values(context) : [])];

  const fn = new Function(...argNames, code);
  const element = fn(...argValues);

  if (!element || typeof element !== 'object' || !('type' in element)) {
    throw new Error('JSX did not produce a valid element. Make sure your code returns a single root element.');
  }

  return element;
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
    throw new Error(
      `Failed to transpile JSX in block ${block.index}: ${(err as Error).message}`
    );
  }

  try {
    const svg = await satori(element as any, {
      width,
      height,
      fonts,
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          const codepoint = [...segment]
            .map(c => c.codePointAt(0)!.toString(16))
            .join('-');
          const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoint}.svg`;
          const res = await fetch(url);
          const svg = await res.text();
          return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        }
        return '';
      },
    });
    return svg;
  } catch (err) {
    throw new Error(
      `Failed to render block ${block.index} to SVG: ${(err as Error).message}`
    );
  }
}

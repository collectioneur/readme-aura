import { describe, it, expect } from 'vitest';
import { join } from 'node:path';
import { writeFile, unlink, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  parseMeta,
  createElement,
  transpileJsx,
  renderBlock,
  resolveLocalImages,
} from '../renderer.js';
import { loadDefaultFonts } from '../fonts.js';

interface ElementNode {
  type: unknown;
  props: Record<string, unknown> & { children?: unknown };
}

describe('parseMeta', () => {
  it('returns defaults when meta is undefined', () => {
    expect(parseMeta()).toEqual({ width: 800, height: 400 });
  });

  it('returns defaults when meta is empty string', () => {
    expect(parseMeta('')).toEqual({ width: 800, height: 400 });
  });

  it('parses width and height', () => {
    expect(parseMeta('width=1200 height=600')).toEqual({ width: 1200, height: 600 });
  });

  it('parses width only, keeps default height', () => {
    expect(parseMeta('width=1000')).toEqual({ width: 1000, height: 400 });
  });

  it('parses height only, keeps default width', () => {
    expect(parseMeta('height=500')).toEqual({ width: 800, height: 500 });
  });

  it('ignores unknown keys', () => {
    expect(parseMeta('foo=999 width=300')).toEqual({ width: 300, height: 400 });
  });

  it('handles meta with no valid pairs', () => {
    expect(parseMeta('no-pairs-here')).toEqual({ width: 800, height: 400 });
  });
});

describe('createElement', () => {
  it('creates element with type and props', () => {
    const el = createElement('div', { id: 'test' }) as ElementNode;
    expect(el.type).toBe('div');
    expect(el.props.id).toBe('test');
    expect(el.props.children).toBeUndefined();
  });

  it('handles null props', () => {
    const el = createElement('span', null) as ElementNode;
    expect(el.type).toBe('span');
    expect(el.props).toEqual({ children: undefined });
  });

  it('unwraps single child from array', () => {
    const el = createElement('div', null, 'hello') as ElementNode;
    expect(el.props.children).toBe('hello');
  });

  it('keeps multiple children as array', () => {
    const el = createElement('div', null, 'a', 'b', 'c') as ElementNode;
    expect(el.props.children).toEqual(['a', 'b', 'c']);
  });

  it('filters out null, false, and true from children', () => {
    const el = createElement('div', null, 'keep', null, false, true, 'also') as ElementNode;
    expect(el.props.children).toEqual(['keep', 'also']);
  });

  it('flattens nested arrays in children', () => {
    const el = createElement('div', null, ['a', 'b'], 'c') as ElementNode;
    expect(el.props.children).toEqual(['a', 'b', 'c']);
  });

  it('returns undefined children when all are filtered out', () => {
    const el = createElement('div', null, null, false, true) as ElementNode;
    expect(el.props.children).toBeUndefined();
  });
});

describe('transpileJsx', () => {
  it('transpiles simple div with text', () => {
    const el = transpileJsx('<div>hello</div>') as ElementNode;
    expect(el.type).toBe('div');
    expect(el.props.children).toBe('hello');
  });

  it('transpiles nested elements', () => {
    const el = transpileJsx('<div><span>inner</span></div>') as ElementNode;
    expect(el.type).toBe('div');
    const child = el.props.children as ElementNode;
    expect(child.type).toBe('span');
    expect(child.props.children).toBe('inner');
  });

  it('transpiles element with style prop', () => {
    const el = transpileJsx('<div style={{ color: "red" }}>styled</div>') as ElementNode;
    expect(el.type).toBe('div');
    expect(el.props.style).toEqual({ color: 'red' });
    expect(el.props.children).toBe('styled');
  });

  it('injects context variables into JSX scope', () => {
    const el = transpileJsx('<div>{name}</div>', { name: 'world' }) as ElementNode;
    expect(el.type).toBe('div');
    expect(el.props.children).toBe('world');
  });

  it('injects multiple context variables', () => {
    const ctx = { title: 'Hello', count: 42 };
    const el = transpileJsx(
      '<div><span>{title}</span><span>{count}</span></div>',
      ctx,
    ) as ElementNode;
    expect(el.type).toBe('div');
    const children = el.props.children as ElementNode[];
    expect(children).toHaveLength(2);
    expect(children[0].props.children).toBe('Hello');
    expect(children[1].props.children).toBe(42);
  });

  it('throws on invalid JSX syntax', () => {
    expect(() => transpileJsx('<div><unclosed')).toThrow();
  });

  it('throws when JSX produces no valid element', () => {
    expect(() => transpileJsx('"just a string"')).toThrow('JSX did not produce a valid element');
  });

  it('handles JSX with whitespace and newlines', () => {
    const jsx = `
      <div>
        <span>line1</span>
        <span>line2</span>
      </div>
    `;
    const el = transpileJsx(jsx) as ElementNode;
    expect(el.type).toBe('div');
  });
});

describe('renderBlock', () => {
  it('prepends readme-aura attribution comment to SVG output', async () => {
    const fonts = await loadDefaultFonts();
    const block = {
      index: 0,
      content: '<div style={{ padding: 10 }}>test</div>',
      meta: undefined,
    };
    const svg = await renderBlock(block, fonts);
    expect(svg).toContain(
      '<!-- Generated by readme-aura https://github.com/collectioneur/readme-aura -->',
    );
    expect(svg.startsWith('<!-- Generated by readme-aura')).toBe(true);
  });
});

// Minimal 1x1 transparent PNG
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
);

describe('resolveLocalImages', () => {
  it('replaces local img src with base64 data URI', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'aura-test-'));
    const filePath = join(dir, 'logo.png');
    await writeFile(filePath, TINY_PNG);

    const el = createElement('div', null, createElement('img', { src: 'logo.png', width: 50 }));
    const resolved = (await resolveLocalImages(el, dir)) as ElementNode;
    const child = resolved.props.children as ElementNode;
    expect(child.props.src).toMatch(/^data:image\/png;base64,/);

    await unlink(filePath);
  });

  it('leaves https URLs untouched', async () => {
    const el = createElement('img', { src: 'https://example.com/logo.png', width: 50 });
    const resolved = (await resolveLocalImages(el, '/tmp')) as ElementNode;
    expect(resolved.props.src).toBe('https://example.com/logo.png');
  });

  it('leaves data URIs untouched', async () => {
    const el = createElement('img', { src: 'data:image/png;base64,abc', width: 50 });
    const resolved = (await resolveLocalImages(el, '/tmp')) as ElementNode;
    expect(resolved.props.src).toBe('data:image/png;base64,abc');
  });

  it('resolves nested img elements', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'aura-test-'));
    const filePath = join(dir, 'icon.png');
    await writeFile(filePath, TINY_PNG);

    const el = createElement(
      'div',
      null,
      createElement('span', null, 'text'),
      createElement('div', null, createElement('img', { src: 'icon.png' })),
    );
    const resolved = (await resolveLocalImages(el, dir)) as ElementNode;
    const children = resolved.props.children as ElementNode[];
    const innerDiv = children[1] as ElementNode;
    const img = innerDiv.props.children as ElementNode;
    expect(img.props.src).toMatch(/^data:image\/png;base64,/);

    await unlink(filePath);
  });

  it('returns non-object values unchanged', async () => {
    expect(await resolveLocalImages('hello', '/tmp')).toBe('hello');
    expect(await resolveLocalImages(null, '/tmp')).toBeNull();
    expect(await resolveLocalImages(42, '/tmp')).toBe(42);
  });
});

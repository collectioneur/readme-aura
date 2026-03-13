import { describe, it, expect, afterEach } from 'vitest';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseSource } from '../parser.js';

let tempDir: string;

async function createFixture(filename: string, content: string): Promise<string> {
  tempDir = await mkdtemp(join(tmpdir(), 'readme-aura-test-'));
  const filePath = join(tempDir, filename);
  await writeFile(filePath, content, 'utf-8');
  return filePath;
}

afterEach(async () => {
  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
  }
});

describe('parseSource', () => {
  it('returns unchanged markdown when no aura blocks exist', async () => {
    const source = '# Hello\n\nSome text here.\n';
    const filePath = await createFixture('source.md', source);

    const result = await parseSource(filePath);

    expect(result.blocks).toHaveLength(0);
    expect(result.markdown).toContain('# Hello');
    expect(result.markdown).toContain('Some text here.');
  });

  it('extracts a single aura block and replaces it with an image', async () => {
    const source = ['# Title', '', '```aura', '<div>Hello</div>', '```', '', 'After block.'].join(
      '\n',
    );
    const filePath = await createFixture('source.md', source);
    const assetsDir = join(tempDir, '.github/assets');

    const result = await parseSource(filePath, assetsDir, join(tempDir, 'README.md'));

    expect(result.blocks).toHaveLength(1);
    expect(result.blocks[0].index).toBe(0);
    expect(result.blocks[0].content).toBe('<div>Hello</div>');
    expect(result.markdown).toContain('readme-aura-component-0.svg');
    expect(result.markdown).not.toContain('```aura');
  });

  it('extracts multiple aura blocks with correct indices', async () => {
    const source = [
      '```aura',
      '<div>First</div>',
      '```',
      '',
      'Middle text.',
      '',
      '```aura',
      '<div>Second</div>',
      '```',
    ].join('\n');
    const filePath = await createFixture('source.md', source);
    const assetsDir = join(tempDir, '.github/assets');

    const result = await parseSource(filePath, assetsDir, join(tempDir, 'README.md'));

    expect(result.blocks).toHaveLength(2);
    expect(result.blocks[0].index).toBe(0);
    expect(result.blocks[0].content).toBe('<div>First</div>');
    expect(result.blocks[1].index).toBe(1);
    expect(result.blocks[1].content).toBe('<div>Second</div>');
    expect(result.markdown).toContain('readme-aura-component-0.svg');
    expect(result.markdown).toContain('readme-aura-component-1.svg');
  });

  it('preserves meta string in extracted block', async () => {
    const source = ['```aura width=1200 height=600', '<div>Sized</div>', '```'].join('\n');
    const filePath = await createFixture('source.md', source);
    const assetsDir = join(tempDir, '.github/assets');

    const result = await parseSource(filePath, assetsDir, join(tempDir, 'README.md'));

    expect(result.blocks).toHaveLength(1);
    expect(result.blocks[0].meta).toBe('width=1200 height=600');
  });

  it('leaves non-aura code blocks untouched', async () => {
    const source = [
      '```js',
      'console.log("hello");',
      '```',
      '',
      '```python',
      'print("hello")',
      '```',
    ].join('\n');
    const filePath = await createFixture('source.md', source);

    const result = await parseSource(filePath);

    expect(result.blocks).toHaveLength(0);
    expect(result.markdown).toContain('console.log("hello");');
    expect(result.markdown).toContain('print("hello")');
  });

  it('computes asset path relative to output file', async () => {
    const source = ['```aura', '<div>Test</div>', '```'].join('\n');
    const filePath = await createFixture('source.md', source);
    const assetsDir = join(tempDir, 'custom', 'assets');
    const outputPath = join(tempDir, 'out', 'README.md');

    const result = await parseSource(filePath, assetsDir, outputPath);

    expect(result.markdown).toContain('../custom/assets/readme-aura-component-0.svg');
  });

  it('handles aura block among mixed code blocks', async () => {
    const source = [
      '```js',
      'const x = 1;',
      '```',
      '',
      '```aura',
      '<div>Component</div>',
      '```',
      '',
      '```bash',
      'echo "hi"',
      '```',
    ].join('\n');
    const filePath = await createFixture('source.md', source);
    const assetsDir = join(tempDir, '.github/assets');

    const result = await parseSource(filePath, assetsDir, join(tempDir, 'README.md'));

    expect(result.blocks).toHaveLength(1);
    expect(result.blocks[0].content).toBe('<div>Component</div>');
    expect(result.markdown).toContain('const x = 1;');
    expect(result.markdown).toContain('echo "hi"');
    expect(result.markdown).toContain('readme-aura-component-0.svg');
  });
});

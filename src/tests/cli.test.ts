import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const { version } = createRequire(import.meta.url)('../../package.json') as { version: string };

describe('CLI', () => {
  it('reports a version that matches package.json', () => {
    const output = execSync('node dist/cli.js --version').toString().trim();
    expect(output).toBe(version);
  });
});

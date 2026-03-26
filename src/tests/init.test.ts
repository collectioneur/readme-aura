import { describe, it, expect, afterEach } from 'vitest';
import { mkdtemp, rm, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execSync } from 'node:child_process';
import { initProject } from '../init.js';

let tempDir: string;

async function setupGitRepo(owner: string, repo: string): Promise<string> {
  tempDir = await mkdtemp(join(tmpdir(), 'readme-aura-init-'));
  execSync('git init', { cwd: tempDir, stdio: 'ignore' });
  execSync('git config user.email "test@test.com"', { cwd: tempDir, stdio: 'ignore' });
  execSync('git config user.name "Test"', { cwd: tempDir, stdio: 'ignore' });
  execSync(`git remote add origin https://github.com/${owner}/${repo}.git`, {
    cwd: tempDir,
    stdio: 'ignore',
  });
  return tempDir;
}

afterEach(async () => {
  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
  }
});

describe('initProject', () => {
  describe('workflow creation', () => {
    it('creates .github/workflows/readme-aura.yml', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await initProject({ cwd: dir });

      const content = await readFile(join(dir, '.github/workflows/readme-aura.yml'), 'utf-8');
      expect(content).toContain('uses: collectioneur/readme-aura@main');
    });

    it('skips workflow if it already exists and force is false', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      const workflowPath = join(dir, '.github/workflows/readme-aura.yml');
      await mkdir(join(dir, '.github/workflows'), { recursive: true });
      await writeFile(workflowPath, 'existing content', 'utf-8');

      const result = await initProject({ cwd: dir });

      const content = await readFile(workflowPath, 'utf-8');
      expect(content).toBe('existing content');
      expect(result.skipped).toContain('.github/workflows/readme-aura.yml');
    });

    it('overwrites workflow when force is true', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      const workflowPath = join(dir, '.github/workflows/readme-aura.yml');
      await mkdir(join(dir, '.github/workflows'), { recursive: true });
      await writeFile(workflowPath, 'existing content', 'utf-8');

      await initProject({ cwd: dir, force: true });

      const content = await readFile(workflowPath, 'utf-8');
      expect(content).toContain('uses: collectioneur/readme-aura@main');
    });
  });

  describe('source template creation', () => {
    it('creates readme.source.md with project template by default', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await initProject({ cwd: dir });

      const content = await readFile(join(dir, 'readme.source.md'), 'utf-8');
      expect(content).toContain('```aura');
      expect(content).toContain('my-repo');
      expect(content).toContain('repo?.name');
      expect(content).toContain('powered by readme-aura');
    });

    it('uses profile template when owner === repo', async () => {
      const dir = await setupGitRepo('alice', 'alice');
      await initProject({ cwd: dir });

      const content = await readFile(join(dir, 'readme.source.md'), 'utf-8');
      expect(content).toContain('powered by readme-aura');
      expect(content).toContain('github?.user');
    });

    it('respects --template override', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await initProject({ cwd: dir, template: 'profile' });

      const content = await readFile(join(dir, 'readme.source.md'), 'utf-8');
      expect(content).toContain('powered by readme-aura');
      expect(content).toContain('github?.user');
    });

    it('skips source if it already exists and force is false', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await writeFile(join(dir, 'readme.source.md'), 'my custom content', 'utf-8');

      const result = await initProject({ cwd: dir });

      const content = await readFile(join(dir, 'readme.source.md'), 'utf-8');
      expect(content).toBe('my custom content');
      expect(result.skipped).toContain('readme.source.md');
    });
  });

  describe('gitignore audit', () => {
    it('adds negation rules for ignored paths', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await writeFile(join(dir, '.gitignore'), '.github/\n', 'utf-8');

      await initProject({ cwd: dir });

      const gitignore = await readFile(join(dir, '.gitignore'), 'utf-8');
      expect(gitignore).toContain('!.github/assets/');
      expect(gitignore).toContain('!.github/workflows/');
    });

    it('does not modify gitignore when paths are not ignored', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      await writeFile(join(dir, '.gitignore'), 'node_modules/\n', 'utf-8');

      await initProject({ cwd: dir });

      const gitignore = await readFile(join(dir, '.gitignore'), 'utf-8');
      expect(gitignore).toBe('node_modules/\n');
    });

    it('works when no .gitignore exists', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');

      const result = await initProject({ cwd: dir });

      expect(result.created).toContain('.github/workflows/readme-aura.yml');
      expect(result.created).toContain('readme.source.md');
    });
  });

  describe('return value', () => {
    it('returns created and skipped file lists', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      const result = await initProject({ cwd: dir });

      expect(result.created).toContain('.github/workflows/readme-aura.yml');
      expect(result.created).toContain('readme.source.md');
      expect(result.skipped).toEqual([]);
    });

    it('returns detected template type', async () => {
      const dir = await setupGitRepo('alice', 'alice');
      const result = await initProject({ cwd: dir });
      expect(result.template).toBe('profile');
    });

    it('returns project template for non-profile repos', async () => {
      const dir = await setupGitRepo('alice', 'my-repo');
      const result = await initProject({ cwd: dir });
      expect(result.template).toBe('project');
    });
  });
});

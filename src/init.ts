import { writeFile, readFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { parseGitHubRemote, type GitHubRemote } from './github.js';
import { generateWorkflow } from './templates/workflow.js';
import { generateSourceProfile } from './templates/source-profile.js';
import { generateSourceProject } from './templates/source-project.js';

export interface InitOptions {
  cwd?: string;
  template?: 'profile' | 'project';
  force?: boolean;
}

export interface InitResult {
  created: string[];
  skipped: string[];
  gitignoreFixed: string[];
  template: 'profile' | 'project';
  remote: GitHubRemote | null;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function isIgnored(filePath: string, cwd: string): boolean {
  try {
    execSync(`git check-ignore -q "${filePath}"`, { cwd, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function detectRemote(cwd: string): GitHubRemote | null {
  try {
    const remote = execSync('git remote get-url origin', {
      cwd,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return parseGitHubRemote(remote);
  } catch {
    return null;
  }
}

function resolveTemplate(
  remote: GitHubRemote | null,
  override?: 'profile' | 'project',
): 'profile' | 'project' {
  if (override) return override;
  if (remote && remote.owner === remote.repo) return 'profile';
  return 'project';
}

async function auditGitignore(cwd: string): Promise<string[]> {
  const checks = [
    { path: '.github/assets/placeholder', rule: '!.github/assets/' },
    { path: '.github/workflows/readme-aura.yml', rule: '!.github/workflows/' },
    { path: 'README.md', rule: '!README.md' },
    { path: 'readme.source.md', rule: '!readme.source.md' },
  ];

  const fixes: string[] = [];

  for (const check of checks) {
    if (isIgnored(check.path, cwd)) {
      fixes.push(check.rule);
    }
  }

  if (fixes.length > 0) {
    const gitignorePath = join(cwd, '.gitignore');
    let content = '';
    try {
      content = await readFile(gitignorePath, 'utf-8');
    } catch {
      /* no .gitignore */
    }

    const suffix =
      '\n# readme-aura: ensure generated files are tracked\n' + fixes.join('\n') + '\n';
    await writeFile(gitignorePath, content + suffix, 'utf-8');
  }

  return fixes;
}

export async function initProject(opts: InitOptions = {}): Promise<InitResult> {
  const cwd = opts.cwd ?? process.cwd();
  const remote = detectRemote(cwd);
  const template = resolveTemplate(remote, opts.template);

  const created: string[] = [];
  const skipped: string[] = [];

  const workflowRelPath = '.github/workflows/readme-aura.yml';
  const workflowPath = join(cwd, workflowRelPath);
  const workflowExists = await fileExists(workflowPath);

  if (!workflowExists || opts.force) {
    await mkdir(join(cwd, '.github/workflows'), { recursive: true });
    await writeFile(workflowPath, generateWorkflow(), 'utf-8');
    created.push(workflowRelPath);
  } else {
    skipped.push(workflowRelPath);
  }

  const sourceRelPath = 'readme.source.md';
  const sourcePath = join(cwd, sourceRelPath);
  const sourceExists = await fileExists(sourcePath);

  if (!sourceExists || opts.force) {
    const ctx = { owner: remote?.owner ?? 'your-username', repo: remote?.repo ?? 'your-repo' };
    const content =
      template === 'profile' ? generateSourceProfile(ctx) : generateSourceProject(ctx);
    await writeFile(sourcePath, content, 'utf-8');
    created.push(sourceRelPath);
  } else {
    skipped.push(sourceRelPath);
  }

  const gitignoreFixed = await auditGitignore(cwd);

  return { created, skipped, gitignoreFixed, template, remote };
}

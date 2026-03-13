import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseGitHubRemote, fetchRepositoryData, createMockRepoData } from '../github.js';

describe('parseGitHubRemote', () => {
  it('parses HTTPS URL with .git suffix', () => {
    expect(parseGitHubRemote('https://github.com/alice/my-repo.git')).toEqual({
      owner: 'alice',
      repo: 'my-repo',
    });
  });

  it('parses HTTPS URL without .git suffix', () => {
    expect(parseGitHubRemote('https://github.com/alice/my-repo')).toEqual({
      owner: 'alice',
      repo: 'my-repo',
    });
  });

  it('parses SSH URL', () => {
    expect(parseGitHubRemote('git@github.com:bob/cool-lib.git')).toEqual({
      owner: 'bob',
      repo: 'cool-lib',
    });
  });

  it('parses SSH URL without .git suffix', () => {
    expect(parseGitHubRemote('git@github.com:bob/cool-lib')).toEqual({
      owner: 'bob',
      repo: 'cool-lib',
    });
  });

  it('detects profile repo (owner === repo)', () => {
    const result = parseGitHubRemote('https://github.com/alice/alice.git');
    expect(result).toEqual({ owner: 'alice', repo: 'alice' });
  });

  it('returns null for non-GitHub URLs', () => {
    expect(parseGitHubRemote('https://gitlab.com/user/repo.git')).toBeNull();
  });

  it('returns null for malformed URLs', () => {
    expect(parseGitHubRemote('not-a-url')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseGitHubRemote('')).toBeNull();
  });
});

describe('createMockRepoData', () => {
  it('returns mock repo data with correct structure', () => {
    const data = createMockRepoData('alice', 'my-repo');
    expect(data).toEqual({
      name: 'my-repo',
      description: 'A great project',
      url: 'https://github.com/alice/my-repo',
      stars: 42,
      forks: 8,
      language: 'TypeScript',
      languageColor: '#3178c6',
      commits: 256,
    });
  });

  it('interpolates owner and repo in URL', () => {
    const data = createMockRepoData('bob', 'cool-lib');
    expect(data.url).toBe('https://github.com/bob/cool-lib');
    expect(data.name).toBe('cool-lib');
  });
});

describe('fetchRepositoryData', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string, init?: RequestInit) => {
        const body = init?.body ? JSON.parse(init.body as string) : {};
        const variables = body.variables ?? {};
        if (variables.owner === 'alice' && variables.name === 'my-repo') {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                data: {
                  repository: {
                    name: 'my-repo',
                    description: 'A great project',
                    url: 'https://github.com/alice/my-repo',
                    stargazerCount: 100,
                    forkCount: 12,
                    primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
                    defaultBranchRef: {
                      target: { history: { totalCount: 500 } },
                    },
                  },
                },
              }),
          } as Response);
        }
        if (variables.owner === 'missing' && variables.name === 'nope') {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                data: { repository: null },
              }),
          } as Response);
        }
        return originalFetch(url, init);
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and transforms repository data', async () => {
    const data = await fetchRepositoryData('alice', 'my-repo', 'fake-token');
    expect(data).toEqual({
      name: 'my-repo',
      description: 'A great project',
      url: 'https://github.com/alice/my-repo',
      stars: 100,
      forks: 12,
      language: 'TypeScript',
      languageColor: '#3178c6',
      commits: 500,
    });
  });

  it('throws when repository not found', async () => {
    await expect(fetchRepositoryData('missing', 'nope', 'fake-token')).rejects.toThrow(
      'Repository "missing/nope" not found',
    );
  });
});

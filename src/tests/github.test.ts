import { describe, it, expect } from 'vitest';
import { parseGitHubRemote } from '../github.js';

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

import { execSync } from 'node:child_process';
import type {
  GitHubData,
  GitHubUser,
  GitHubStats,
  GitHubLanguage,
  GitHubRepo,
  RepositoryData,
} from './types.js';

// ── GraphQL Queries ──────────────────────────────────────────────

const USER_QUERY = `
query ($login: String!) {
  user(login: $login) {
    login
    name
    avatarUrl
    bio
    location
    company
    followers { totalCount }
    following { totalCount }
    createdAt
    repositories(
      first: 100
      ownerAffiliations: OWNER
      orderBy: { field: STARGAZERS, direction: DESC }
      privacy: PUBLIC
    ) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name color }
        defaultBranchRef {
          target {
            ... on Commit {
              history { totalCount }
            }
          }
        }
      }
    }
  }
}
`;

const REPO_QUERY = `
query ($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    description
    url
    stargazerCount
    forkCount
    primaryLanguage { name color }
    defaultBranchRef {
      target {
        ... on Commit {
          history { totalCount }
        }
      }
    }
  }
}
`;

// ── GraphQL Client ───────────────────────────────────────────────

interface GraphQLResponse {
  data?: {
    user: GraphQLUser;
  };
  errors?: Array<{ message: string }>;
}

interface GraphQLUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: { totalCount: number };
  following: { totalCount: number };
  createdAt: string;
  repositories: {
    totalCount: number;
    nodes: GraphQLRepo[];
  };
}

interface GraphQLRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  defaultBranchRef: {
    target: {
      history: { totalCount: number };
    };
  } | null;
}

interface RepoGraphQLResponse {
  data?: {
    repository: GraphQLRepo;
  };
  errors?: Array<{ message: string }>;
}

async function graphql<T>(
  token: string,
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'readme-aura',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API returned ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

// ── Auto-detect owner/repo from git remote ──────────────────────

export interface GitHubRemote {
  owner: string;
  repo: string;
}

export function parseGitHubRemote(url: string): GitHubRemote | null {
  // https://github.com/user/repo.git  or  https://github.com/user/repo
  const httpsMatch = url.match(/github\.com\/([^/]+)\/([^/.]+)/);
  if (httpsMatch) return { owner: httpsMatch[1], repo: httpsMatch[2] };

  // git@github.com:user/repo.git  or  git@github.com:user/repo
  const sshMatch = url.match(/github\.com:([^/]+)\/([^/.]+)/);
  if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };

  return null;
}

export function detectGitHubRemote(): GitHubRemote | null {
  try {
    const remote = execSync('git remote get-url origin', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return parseGitHubRemote(remote);
  } catch {
    return null;
  }
}

export function detectGitHubUser(): string | null {
  return detectGitHubRemote()?.owner ?? null;
}

// ── Data Transformation ──────────────────────────────────────────

function transformUser(raw: GraphQLUser): GitHubUser {
  return {
    login: raw.login,
    name: raw.name,
    avatarUrl: raw.avatarUrl,
    bio: raw.bio,
    location: raw.location,
    company: raw.company,
    followers: raw.followers.totalCount,
    following: raw.following.totalCount,
    createdAt: raw.createdAt,
  };
}

function transformStats(raw: GraphQLUser): GitHubStats {
  const repos = raw.repositories.nodes;
  return {
    totalStars: repos.reduce((sum, r) => sum + r.stargazerCount, 0),
    totalForks: repos.reduce((sum, r) => sum + r.forkCount, 0),
    totalRepos: raw.repositories.totalCount,
    totalCommits: repos.reduce((sum, r) => {
      return sum + (r.defaultBranchRef?.target?.history?.totalCount ?? 0);
    }, 0),
  };
}

function transformLanguages(raw: GraphQLUser): GitHubLanguage[] {
  const counts = new Map<string, { count: number; color: string }>();

  for (const repo of raw.repositories.nodes) {
    if (!repo.primaryLanguage) continue;
    const { name, color } = repo.primaryLanguage;
    const existing = counts.get(name);
    if (existing) {
      existing.count++;
    } else {
      counts.set(name, { count: 1, color });
    }
  }

  const total = [...counts.values()].reduce((s, v) => s + v.count, 0);
  if (total === 0) return [];

  return [...counts.entries()]
    .map(([name, { count, color }]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      color,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);
}

function transformRepos(raw: GraphQLUser): GitHubRepo[] {
  return raw.repositories.nodes.slice(0, 10).map((r) => ({
    name: r.name,
    description: r.description,
    url: r.url,
    stars: r.stargazerCount,
    forks: r.forkCount,
    language: r.primaryLanguage?.name ?? null,
  }));
}

// ── Public API ───────────────────────────────────────────────────

export async function fetchGitHubData(username: string, token: string): Promise<GitHubData> {
  const response = await graphql<GraphQLResponse>(token, USER_QUERY, { login: username });

  if (response.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
  }

  if (!response.data?.user) {
    throw new Error(`GitHub user "${username}" not found.`);
  }

  const raw = response.data.user;

  return {
    user: transformUser(raw),
    stats: transformStats(raw),
    languages: transformLanguages(raw),
    repos: transformRepos(raw),
  };
}

// ── Mock data for testing without token ──────────────────────────

export function createMockGitHubData(username: string): GitHubData {
  return {
    user: {
      login: username,
      name: username,
      avatarUrl: `https://github.com/${username}.png`,
      bio: 'A passionate developer',
      location: null,
      company: null,
      followers: 42,
      following: 10,
      createdAt: '2020-01-01T00:00:00Z',
    },
    stats: {
      totalStars: 128,
      totalForks: 34,
      totalRepos: 25,
      totalCommits: 1547,
    },
    languages: [
      { name: 'TypeScript', percentage: 45, color: '#3178c6' },
      { name: 'JavaScript', percentage: 25, color: '#f1e05a' },
      { name: 'Python', percentage: 15, color: '#3572A5' },
      { name: 'Rust', percentage: 10, color: '#dea584' },
      { name: 'Go', percentage: 5, color: '#00ADD8' },
    ],
    repos: [
      {
        name: 'awesome-project',
        description: 'My best project',
        url: `https://github.com/${username}/awesome-project`,
        stars: 64,
        forks: 12,
        language: 'TypeScript',
      },
      {
        name: 'cool-lib',
        description: 'A cool library',
        url: `https://github.com/${username}/cool-lib`,
        stars: 32,
        forks: 8,
        language: 'JavaScript',
      },
      {
        name: 'rust-tool',
        description: 'Fast CLI tool',
        url: `https://github.com/${username}/rust-tool`,
        stars: 18,
        forks: 5,
        language: 'Rust',
      },
    ],
  };
}

// ── Repository API ───────────────────────────────────────────────

export async function fetchRepositoryData(
  owner: string,
  repo: string,
  token: string,
): Promise<RepositoryData> {
  const response = await graphql<RepoGraphQLResponse>(token, REPO_QUERY, {
    owner,
    name: repo,
  });

  if (response.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${response.errors.map((e) => e.message).join(', ')}`);
  }

  const r = response.data?.repository;
  if (!r) {
    throw new Error(`Repository "${owner}/${repo}" not found.`);
  }

  return {
    name: r.name,
    description: r.description,
    url: r.url,
    stars: r.stargazerCount,
    forks: r.forkCount,
    language: r.primaryLanguage?.name ?? null,
    languageColor: r.primaryLanguage?.color ?? null,
    commits: r.defaultBranchRef?.target?.history?.totalCount ?? 0,
  };
}

export function createMockRepoData(owner: string, repo: string): RepositoryData {
  return {
    name: repo,
    description: 'A great project',
    url: `https://github.com/${owner}/${repo}`,
    stars: 42,
    forks: 8,
    language: 'TypeScript',
    languageColor: '#3178c6',
    commits: 256,
  };
}

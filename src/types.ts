export interface ExtractedBlock {
  index: number;
  content: string;
  meta?: string;
}

export interface BuildOptions {
  source: string;
  output: string;
  assetsDir: string;
}

export interface ParseResult {
  markdown: string;
  blocks: ExtractedBlock[];
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface FontConfig {
  name: string;
  data: ArrayBuffer;
  weight?: FontWeight;
  style?: 'normal' | 'italic';
}

export interface RenderOptions {
  width: number;
  height: number;
}

// ── GitHub API Types ─────────────────────────────────────────────

export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  createdAt: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
}

export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
}

export interface GitHubData {
  user: GitHubUser;
  stats: GitHubStats;
  languages: GitHubLanguage[];
  repos: GitHubRepo[];
}

export interface RepositoryData {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  commits: number;
}

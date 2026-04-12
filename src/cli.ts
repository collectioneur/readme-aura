#!/usr/bin/env node

import { Command } from 'commander';
import { writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { parseSource } from './parser.js';
import { renderBlock, parseMeta, createElement } from './renderer.js';
import { loadDefaultFonts, loadFontsFromDir } from './fonts.js';
import {
  fetchGitHubData,
  fetchRepositoryData,
  detectGitHubUser,
  detectGitHubRemote,
  createMockGitHubData,
  createMockRepoData,
} from './github.js';
import { makeSocialMediaButton } from './components/index.js';
import { initProject } from './init.js';
import type { FontConfig, GitHubData, RepositoryData } from './types.js';

const program = new Command();

program
  .name('readme-aura')
  .description('Next-Gen README generator - render React/JSX components to SVG inside Markdown')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold readme-aura in your project (workflow, source template, gitignore audit)')
  .option('--template <type>', 'Template: profile or project (auto-detected from git remote)')
  .option('--force', 'Overwrite existing files', false)
  .action(async (opts) => {
    console.log('\n  readme-aura init\n');

    const result = await initProject({
      template: opts.template,
      force: opts.force,
    });

    if (result.remote) {
      console.log(`  Detected:  ${result.remote.owner}/${result.remote.repo}`);
    }
    console.log(`  Template:  ${result.template}\n`);

    for (const file of result.created) {
      console.log(`  + Created  ${file}`);
    }
    for (const file of result.skipped) {
      console.log(`  - Skipped  ${file} (already exists, use --force to overwrite)`);
    }
    for (const rule of result.gitignoreFixed) {
      console.log(`  ~ Added to .gitignore: ${rule}`);
    }

    console.log('\n  Next steps:');
    console.log('    1. Edit readme.source.md to customize your README');
    console.log('    2. Test locally:  npx readme-aura build');
    console.log('    3. Push to main — the workflow will auto-generate your README\n');
  });

program
  .command('build')
  .description('Parse source markdown, render JSX to SVG, and generate README')
  .option('-s, --source <path>', 'Source markdown file', 'readme.source.md')
  .option('-o, --output <path>', 'Output markdown file', 'README.md')
  .option('-a, --assets <path>', 'Assets directory for generated images', '.github/assets')
  .option('-f, --fonts-dir <path>', 'Directory with custom font files (.ttf/.otf/.woff)')
  .option(
    '-g, --github-user <username>',
    'GitHub username (auto-detected from git remote if omitted)',
  )
  .option('-t, --github-token <token>', 'GitHub token (defaults to GITHUB_TOKEN env variable)')
  .option('--owner <owner>', 'Repository owner (auto-detected from git remote if omitted)')
  .option('--repo <repo>', 'Repository name (auto-detected from git remote if omitted)')
  .action(async (opts) => {
    const sourcePath = resolve(opts.source);
    const outputPath = resolve(opts.output);
    const assetsDir = opts.assets;

    console.log(`\n  readme-aura v0.1.0\n`);
    console.log(`  Source:  ${sourcePath}`);
    console.log(`  Output:  ${outputPath}`);
    console.log(`  Assets:  ${resolve(assetsDir)}`);

    try {
      const parseResult = await parseSource(sourcePath, assetsDir, outputPath);
      const { blocks, relAssets } = parseResult;
      let { markdown } = parseResult;

      await mkdir(resolve(assetsDir), { recursive: true });

      // ── Resolve GitHub data ──────────────────────────────────
      let github: GitHubData | null = null;
      const githubUser = opts.githubUser ?? detectGitHubUser();
      const githubToken = opts.githubToken ?? process.env.GITHUB_TOKEN;

      if (githubUser) {
        console.log(`\n  GitHub:  @${githubUser}`);
        if (githubToken) {
          try {
            console.log('  Fetching GitHub data...');
            github = await fetchGitHubData(githubUser, githubToken);
            console.log(
              `  Fetched: ${github.stats.totalRepos} repos, ${github.stats.totalStars} stars, ${github.languages.length} languages`,
            );
          } catch (err) {
            console.warn(`  Warning: GitHub API failed: ${(err as Error).message}`);
            console.warn('  Falling back to mock data.\n');
            github = createMockGitHubData(githubUser);
          }
        } else {
          console.log('  No GITHUB_TOKEN found — using mock data for preview.');
          github = createMockGitHubData(githubUser);
        }
      } else {
        console.log('\n  GitHub:  not configured (use --github-user or set git remote)');
      }

      // ── Resolve repository data ────────────────────────────────
      let repoData: RepositoryData | null = null;
      const remote = detectGitHubRemote();
      const owner = opts.owner ?? remote?.owner ?? null;
      const repo = opts.repo ?? remote?.repo ?? null;

      if (owner && repo) {
        if (githubToken) {
          try {
            console.log(`  Fetching repo: ${owner}/${repo}...`);
            repoData = await fetchRepositoryData(owner, repo, githubToken);
            console.log(
              `  Fetched repo: ${owner}/${repo} — ${repoData.stars} stars, ${repoData.forks} forks`,
            );
          } catch (err) {
            console.warn(`  Warning: Repo API failed: ${(err as Error).message}`);
            console.warn('  Falling back to mock repo data.\n');
            repoData = createMockRepoData(owner, repo);
          }
        } else {
          console.log('  No GITHUB_TOKEN — using mock repo data for preview.');
          repoData = createMockRepoData(owner, repo);
        }
      } else {
        console.log('  Repo:  not configured (use --owner/--repo or set git remote)');
      }

      if (blocks.length === 0) {
        console.log('\n  No aura blocks found in source file.');
      } else {
        // Load fonts
        console.log('\n  Loading fonts...');
        let fonts: FontConfig[];
        if (opts.fontsDir) {
          fonts = await loadFontsFromDir(opts.fontsDir);
          console.log(`  Loaded ${fonts.length} font(s) from ${resolve(opts.fontsDir)}`);
        } else {
          fonts = await loadDefaultFonts();
          console.log(`  Loaded ${fonts.length} default font(s)`);
        }

        // Build context that will be injected into JSX (always bind github/repo so optional chaining works in aura blocks)
        const context: Record<string, unknown> = {
          github: github ?? null,
          repo: repoData ?? null,
        };
        // Inject built-in components (available in every aura block)
        context.SocialMediaButton = makeSocialMediaButton(createElement);

        // Render blocks to SVG (filename includes content hash for GitHub cache busting)
        console.log(`\n  Rendering ${blocks.length} block(s)...\n`);
        const svgMap = new Map<number, string>();
        const writtenFiles: string[] = [];
        // Tracks filenames for inline blocks (substituted after the loop)
        const inlineFilesMap = new Map<number, string>();
        for (const block of blocks) {
          try {
            const svg = await renderBlock(block, fonts, context, process.cwd());
            svgMap.set(block.index, svg);
            const hash = createHash('sha256').update(svg).digest('hex').slice(0, 8);
            const filename = `readme-aura-component-${block.index}-${hash}.svg`;
            const svgPath = resolve(assetsDir, filename);
            await writeFile(svgPath, svg, 'utf-8');
            writtenFiles.push(filename);
            const opts = parseMeta(block.meta);
            if (opts.inline) {
              inlineFilesMap.set(block.index, filename);
            } else {
              markdown = markdown.replaceAll(`readme-aura-component-${block.index}.svg`, filename);
            }
            console.log(`    [${block.index}] Rendered -> ${filename}`);
          } catch (err) {
            console.error(`\n  Error in block ${block.index}: ${(err as Error).message}\n`);
            process.exit(1);
          }
        }

        // Replace inline placeholders with actual HTML.
        // Consecutive placeholders were already merged onto one line by the parser,
        // so the regex matches the whole group at once and we can apply align wrapping.
        if (inlineFilesMap.size > 0) {
          markdown = markdown.replace(
            /((?:<!-- __AURA_INLINE_\d+__ -->)+)/g,
            (groupStr) => {
              const indexRegex = /<!-- __AURA_INLINE_(\d+)__ -->/g;
              const indices: number[] = [];
              let m;
              while ((m = indexRegex.exec(groupStr)) !== null) {
                indices.push(parseInt(m[1], 10));
              }

              const htmlParts: string[] = [];
              let groupAlign: string | undefined;

              for (const idx of indices) {
                const block = blocks.find((b) => b.index === idx);
                if (!block) continue;
                const opts = parseMeta(block.meta);
                if (opts.align && !groupAlign) groupAlign = opts.align;

                const filename = inlineFilesMap.get(idx);
                if (!filename) continue;

                const imgTag = `<img src="${relAssets}/${filename}" width="${opts.width}" height="${opts.height}" />`;
                const html = opts.link ? `<a href="${opts.link}">${imgTag}</a>` : imgTag;
                htmlParts.push(html);
              }

              let result = htmlParts.join('');
              if (groupAlign) {
                result = `<p align="${groupAlign}">\n${result}\n</p>`;
              }
              return result;
            },
          );
        }

        // Remove old generated SVGs (not in this build)
        const generatedPattern =
          /^(?:readme-aura-component-\d+(-[\w]+)?\.svg|component-\d+(-[\w]+)?\.svg)$/;
        const existing = await readdir(resolve(assetsDir));
        for (const name of existing) {
          if (generatedPattern.test(name) && !writtenFiles.includes(name)) {
            await unlink(resolve(assetsDir, name));
          }
        }
      }

      await writeFile(outputPath, markdown, 'utf-8');
      console.log(`\n  Generated: ${outputPath}`);
      console.log(`  SVGs saved to: ${resolve(assetsDir)}\n`);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error(`\n  Error: Source file not found: ${sourcePath}\n`);
        process.exit(1);
      }
      throw err;
    }
  });

program.parse();

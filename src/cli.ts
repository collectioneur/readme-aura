#!/usr/bin/env node

import { Command } from "commander";
import { writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { parseSource } from "./parser.js";
import { renderBlock, createElement } from "./renderer.js";
import { loadDefaultFonts, loadFontsFromDir } from "./fonts.js";
import {
  fetchGitHubData,
  detectGitHubUser,
  createMockGitHubData,
} from "./github.js";
import { makeStatsCard, makeMockupPhone } from "./components/index.js";
import type { FontConfig, GitHubData } from "./types.js";

const program = new Command();

program
  .name("readme-aura")
  .description(
    "Next-Gen README generator - render React/JSX components to SVG inside Markdown",
  )
  .version("0.1.0");

program
  .command("build")
  .description("Parse source markdown, render JSX to SVG, and generate README")
  .option("-s, --source <path>", "Source markdown file", "readme.source.md")
  .option("-o, --output <path>", "Output markdown file", "README.md")
  .option(
    "-a, --assets <path>",
    "Assets directory for generated images",
    ".github/assets",
  )
  .option(
    "-f, --fonts-dir <path>",
    "Directory with custom font files (.ttf/.otf/.woff)",
  )
  .option(
    "-g, --github-user <username>",
    "GitHub username (auto-detected from git remote if omitted)",
  )
  .option(
    "-t, --github-token <token>",
    "GitHub token (defaults to GITHUB_TOKEN env variable)",
  )
  .action(async (opts) => {
    const sourcePath = resolve(opts.source);
    const outputPath = resolve(opts.output);
    const assetsDir = opts.assets;

    console.log(`\n  readme-aura v0.1.0\n`);
    console.log(`  Source:  ${sourcePath}`);
    console.log(`  Output:  ${outputPath}`);
    console.log(`  Assets:  ${resolve(assetsDir)}`);

    try {
      let { markdown, blocks } = await parseSource(
        sourcePath,
        assetsDir,
        outputPath,
      );

      await mkdir(resolve(assetsDir), { recursive: true });

      // ── Resolve GitHub data ──────────────────────────────────
      let github: GitHubData | null = null;
      const githubUser = opts.githubUser ?? detectGitHubUser();
      const githubToken = opts.githubToken ?? process.env.GITHUB_TOKEN;

      if (githubUser) {
        console.log(`\n  GitHub:  @${githubUser}`);
        if (githubToken) {
          try {
            console.log("  Fetching GitHub data...");
            github = await fetchGitHubData(githubUser, githubToken);
            console.log(
              `  Fetched: ${github.stats.totalRepos} repos, ${github.stats.totalStars} stars, ${github.languages.length} languages`,
            );
          } catch (err) {
            console.warn(
              `  Warning: GitHub API failed: ${(err as Error).message}`,
            );
            console.warn("  Falling back to mock data.\n");
            github = createMockGitHubData(githubUser);
          }
        } else {
          console.log("  No GITHUB_TOKEN found — using mock data for preview.");
          github = createMockGitHubData(githubUser);
        }
      } else {
        console.log(
          "\n  GitHub:  not configured (use --github-user or set git remote)",
        );
      }

      if (blocks.length === 0) {
        console.log("\n  No aura blocks found in source file.");
      } else {
        // Load fonts
        console.log("\n  Loading fonts...");
        let fonts: FontConfig[];
        if (opts.fontsDir) {
          fonts = await loadFontsFromDir(opts.fontsDir);
          console.log(
            `  Loaded ${fonts.length} font(s) from ${resolve(opts.fontsDir)}`,
          );
        } else {
          fonts = await loadDefaultFonts();
          console.log(`  Loaded ${fonts.length} default font(s)`);
        }

        // Build context that will be injected into JSX
        const context: Record<string, unknown> = {};
        if (github) {
          context.github = github;
        }
        // Inject built-in components (available in every aura block)
        context.StatsCard = makeStatsCard(createElement);
        context.MockupPhone = makeMockupPhone(createElement);

        // Render blocks to SVG (filename includes content hash for GitHub cache busting)
        console.log(`\n  Rendering ${blocks.length} block(s)...\n`);
        const svgMap = new Map<number, string>();
        const writtenFiles: string[] = [];
        for (const block of blocks) {
          try {
            const svg = await renderBlock(block, fonts, context);
            svgMap.set(block.index, svg);
            const hash = createHash("sha256")
              .update(svg)
              .digest("hex")
              .slice(0, 8);
            const filename = `readme-aura-component-${block.index}-${hash}.svg`;
            const svgPath = resolve(assetsDir, filename);
            await writeFile(svgPath, svg, "utf-8");
            writtenFiles.push(filename);
            markdown = markdown.replaceAll(
              `readme-aura-component-${block.index}.svg`,
              filename,
            );
            console.log(`    [${block.index}] Rendered -> ${filename}`);
          } catch (err) {
            console.error(
              `\n  Error in block ${block.index}: ${(err as Error).message}\n`,
            );
            process.exit(1);
          }
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

      const footer =
        '\n\n<br>\n\n<p align="center"><sub>𝔭𝔬𝔴𝔢𝔯𝔢𝔡 𝔟𝔶 <a href="https://github.com/collectioneur/readme-aura">𝔯𝔢𝔞𝔡𝔪𝔢-𝔞𝔲𝔯𝔞</a></sub></p>\n';
      await writeFile(outputPath, markdown + footer, "utf-8");
      console.log(`\n  Generated: ${outputPath}`);
      console.log(`  SVGs saved to: ${resolve(assetsDir)}\n`);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        console.error(`\n  Error: Source file not found: ${sourcePath}\n`);
        process.exit(1);
      }
      throw err;
    }
  });

program.parse();

# Architecture

readme-aura is a CLI tool and GitHub Action that renders JSX components embedded in Markdown
into SVG images, producing enriched README files.

## Pipeline

```
User writes *.source.md
        │
        ▼
┌─────────────────────────────────────────────────┐
│  parser.ts                                      │
│  • Reads source Markdown file                   │
│  • Parses AST via unified + remark-parse        │
│  • Walks tree looking for ```aura code blocks   │
│  • Extracts block content + meta (width/height) │
│  • Replaces blocks with <img> paragraph nodes   │
│  • Serializes back to Markdown via remark-stringify │
│  Output: { markdown: string, blocks: ExtractedBlock[] } │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  renderer.ts                                    │
│  For each ExtractedBlock:                       │
│  1. parseMeta() — extract width/height from     │
│     meta string (e.g. "width=800 height=400")   │
│  2. transpileJsx() — convert JSX string to      │
│     element tree via Sucrase + createElement()  │
│  3. extractStyles() — pull <style> nodes out    │
│     of the tree for injection into final SVG    │
│  4. satori() — render element tree to SVG       │
│  5. Post-process: unpack nested SVGs, inject    │
│     extracted CSS <style> blocks                │
│  Output: SVG string                             │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  cli.ts (orchestrator)                          │
│  • Resolves CLI options (source, output, etc.)  │
│  • Loads fonts via fonts.ts                     │
│  • Fetches GitHub data via github.ts (optional) │
│  • Builds context: { github, StatsCard, ... }   │
│  • Calls renderBlock() for each extracted block │
│  • Hashes SVG content for cache-busting names   │
│  • Writes SVGs to assets dir                    │
│  • Cleans up stale SVGs from previous builds    │
│  • Writes final Markdown + footer               │
└─────────────────────────────────────────────────┘
```

## Module Responsibilities

### cli.ts
Entry point. Defines the Commander CLI with the `build` command.
Orchestrates the full pipeline: parse → resolve context → render → write.
Handles GitHub user detection, font loading, and asset cleanup.

### parser.ts
Pure Markdown processing. Reads a source file, uses unified/remark to parse
the AST, finds `aura`-language code blocks, extracts their content/meta,
and replaces them with image nodes pointing to where SVGs will be written.

### renderer.ts
Core rendering engine. Contains four key functions:
- `parseMeta(meta?)` — parses `width=N height=N` from code block meta strings.
- `createElement(type, props, ...children)` — minimal React-compatible element factory.
- `transpileJsx(jsx, context?)` — converts a JSX string into an element tree using Sucrase for transpilation and `new Function` for evaluation. Context variables are injected as function arguments.
- `renderBlock(block, fonts, context?)` — full pipeline from ExtractedBlock to SVG string.

### fonts.ts
Font loading with fallback chain:
1. `@fontsource/inter` npm package (Inter 400 + 700)
2. Google Fonts CDN (if npm package not found)
3. Custom directory of `.ttf/.otf/.woff` files

### github.ts
GitHub data provider. Fetches user profile, repo stats, and language distribution
via GitHub GraphQL API. Provides mock data fallback for development without a token.
Can auto-detect the GitHub username from the git remote URL.

### types.ts
All shared TypeScript interfaces. Single source of truth for data shapes
used across modules (`ExtractedBlock`, `ParseResult`, `FontConfig`,
`RenderOptions`, `GitHubData` and its sub-types).

### components/
Built-in visual components available in `aura` blocks:
- **StatsCard** — neon/cyberpunk stats card showing stars, commits, repos, forks, and languages.
- **MockupPhone** — phone-frame mockup displaying profile info and top repos.

Components are factory functions that accept a `createElement` reference (`h`)
and return a component function. This decouples them from the rendering engine.

## Data Flow

```
Context injection into JSX:
  github.ts → fetchGitHubData() → GitHubData
  components/index.ts → makeStatsCard(createElement) → StatsCard function
  components/index.ts → makeMockupPhone(createElement) → MockupPhone function
      ↓
  context = { github, StatsCard, MockupPhone }
      ↓
  transpileJsx(block.content, context)
      ↓
  JSX code can reference: {github.stats.totalStars}, <StatsCard github={github} />, etc.
```

## File Naming

Generated SVGs follow the pattern: `readme-aura-component-{index}-{sha256hash8}.svg`

The hash is computed from the SVG content, providing cache-busting when content
changes while keeping filenames stable when content doesn't change.

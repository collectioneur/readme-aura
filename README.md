![component-0](./assets/component-0.svg?v=08ac2ff8)

Write custom **React/JSX components** directly inside your Markdown, and readme-aura will render them into beautiful SVGs that work on GitHub.

GitHub strips all JS and CSS from README files. This tool lets you bypass that limitation by compiling your designs into static SVG images at build time.

## How It Works

1. Write a `readme.source.md` with standard Markdown
2. Add JSX components inside ` ```aura ` code blocks
3. Run `readme-aura build` — JSX gets rendered to SVG via [Vercel Satori](https://github.com/vercel/satori)
4. Get a clean `README.md` with embedded SVG images

![component-1](./assets/component-1.svg?v=7d879013)

## Quick Start

```bash
npx readme-aura build
```

This reads `readme.source.md` from the current directory, renders all ` ```aura ` blocks to SVG, saves them to `./assets/`, and outputs a final `README.md`.

### CLI Options

| Option | Default | Description |
|--------|---------|-------------|
| `-s, --source` | `readme.source.md` | Source markdown file |
| `-o, --output` | `README.md` | Output markdown file |
| `-a, --assets` | `./assets` | Directory for generated SVGs |
| `-f, --fonts-dir` | — | Custom fonts directory |
| `-g, --github-user` | auto-detect | GitHub username for stats |
| `-t, --github-token` | `$GITHUB_TOKEN` | Token for GitHub API |

## GitHub Actions (Auto-Rebuild)

Add this workflow to your repo and your README will regenerate automatically on every push and on a daily schedule (to keep GitHub stats fresh).

**1. Create** `readme.source.md` in your repo root with ` ```aura ` blocks.

**2. Add** `.github/workflows/readme-aura.yml`:

```yaml
name: Generate README
on:
  push:
    branches: [main]
    paths: ['readme.source.md']
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm install -g readme-aura

      - name: Generate README
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          readme-aura build \
            --source readme.source.md \
            --output README.md \
            --assets .github/assets \
            --github-user ${{ github.repository_owner }}

      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add README.md .github/assets
          if git diff --cached --quiet; then
            echo "No changes."
          else
            git commit -m "chore: regenerate README via readme-aura"
            git push
          fi
```

**3. Push to `main`** — the action runs, generates SVGs, and commits the final `README.md`.

> Works for both profile repos (`username/username`) and regular repos.

## Features

![component-2](./assets/component-2.svg?v=0727f556)

* **Write React/JSX** — Use familiar `style={{ }}` syntax with flexbox, gradients, shadows
* **Powered by Satori** — Vercel's engine converts JSX to SVG without a browser
* **Custom Fonts** — Inter bundled by default, bring your own via `--fonts-dir`
* **Meta Syntax** — Control dimensions: ` ```aura width=800 height=400 `
* **GitHub-Compatible** — Output is pure Markdown + SVG, works everywhere

## Tech Stack

![component-3](./assets/component-3.svg?v=10b25974)

## License

MIT


<br>

<p align="center"><sub>𝔭𝔬𝔴𝔢𝔯𝔢𝔡 𝔟𝔶 <a href="https://github.com/collectioneur/readme-aura">𝔯𝔢𝔞𝔡𝔪𝔢-𝔞𝔲𝔯𝔞</a></sub></p>

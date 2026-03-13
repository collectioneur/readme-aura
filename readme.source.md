```aura width=800 height=180
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', borderRadius: 20, padding: 30, fontFamily: 'Inter, sans-serif' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 28, color: 'white' }}>A</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: 'white', margin: 0 }}>readme-aura</span>
      <span style={{ fontSize: 16, color: '#a0a0b8', marginTop: 4 }}>Next-Gen README generator for GitHub</span>
    </div>
  </div>
  <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
    <span style={{ padding: '4px 12px', background: '#667eea', color: 'white', borderRadius: 12, fontSize: 12 }}>React/JSX</span>
    <span style={{ padding: '4px 12px', background: '#764ba2', color: 'white', borderRadius: 12, fontSize: 12 }}>SVG Rendering</span>
    <span style={{ padding: '4px 12px', background: '#302b63', color: '#a0a0ff', borderRadius: 12, fontSize: 12, border: '1px solid #667eea' }}>GitHub Actions</span>
  </div>
</div>
```

Write custom **React/JSX components** directly inside your Markdown, and readme-aura will render them into beautiful SVGs that work on GitHub.

GitHub strips all JS and CSS from README files. This tool lets you bypass that limitation by compiling your designs into static SVG images at build time.

## How It Works

1. Run `npx readme-aura init` in your repo — creates workflow, source template, and audits `.gitignore`
2. Edit `readme.source.md` — add JSX components inside `` ```aura `` code blocks
3. Preview locally with `npx readme-aura build` — JSX gets rendered to SVG via [Vercel Satori](https://github.com/vercel/satori)
4. Push to `main` — the GitHub Action auto-generates your `README.md`

```aura width=800 height=220
<div style={{ display: 'flex', width: '100%', height: '100%', background: '#0d1117', borderRadius: 16, padding: 24, gap: 16, fontFamily: 'Inter, sans-serif' }}>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 12, padding: 20, border: '1px solid #30363d' }}>
    <span style={{ fontSize: 11, color: '#8b949e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 1</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#c9d1d9', marginBottom: 8 }}>Write JSX</span>
    <span style={{ fontSize: 12, color: '#58a6ff', fontFamily: 'monospace' }}>{'```aura'}</span>
    <span style={{ fontSize: 12, color: '#8b949e', fontFamily: 'monospace' }}>{'<Card />'}</span>
    <span style={{ fontSize: 12, color: '#58a6ff', fontFamily: 'monospace' }}>{'```'}</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 12, padding: 20, border: '1px solid #30363d' }}>
    <span style={{ fontSize: 11, color: '#8b949e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 2</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#c9d1d9', marginBottom: 8 }}>Build</span>
    <span style={{ fontSize: 13, color: '#7ee787', fontFamily: 'monospace' }}>$ readme-aura build</span>
    <span style={{ fontSize: 12, color: '#8b949e', marginTop: 8 }}>Satori renders JSX to SVG</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 12, padding: 20, border: '1px solid #30363d' }}>
    <span style={{ fontSize: 11, color: '#8b949e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 3</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#c9d1d9', marginBottom: 8 }}>Deploy</span>
    <span style={{ fontSize: 13, color: '#c9d1d9' }}>README.md with images</span>
    <span style={{ fontSize: 12, color: '#8b949e', marginTop: 8 }}>Works on any GitHub repo</span>
  </div>
</div>
```

## Quick Start

Run one command in your repo — it creates the GitHub Actions workflow, a starter `readme.source.md`, and ensures `.gitignore` won't block generated files:

```bash
npx readme-aura init
```

Then preview locally:

```bash
npx readme-aura build
```

That's it. Push to `main` and the workflow will auto-generate your `README.md` on every push.

> `init` auto-detects profile repos (`username/username`) and picks the right template.

### Commands

| Command | Description |
|---------|-------------|
| `npx readme-aura init` | Scaffold workflow, source template, audit `.gitignore` |
| `npx readme-aura build` | Render `` ```aura `` blocks to SVG and generate `README.md` |

### Build Options

| Option | Default | Description |
|--------|---------|-------------|
| `-s, --source` | `readme.source.md` | Source markdown file |
| `-o, --output` | `README.md` | Output markdown file |
| `-a, --assets` | `.github/assets` | Directory for generated SVGs |
| `-f, --fonts-dir` | — | Custom fonts directory |
| `-g, --github-user` | auto-detect | GitHub username for stats |
| `-t, --github-token` | `$GITHUB_TOKEN` | Token for GitHub API |

### Init Options

| Option | Default | Description |
|--------|---------|-------------|
| `--template` | auto-detect | Template: `profile` or `project` |
| `--force` | `false` | Overwrite existing files |

## What `init` Creates

The `init` command sets up everything you need:

**`.github/workflows/readme-aura.yml`** — GitHub Action that rebuilds your README on every push to `main` and on a daily schedule (to keep GitHub stats fresh):

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

      - name: Generate README
        uses: collectioneur/readme-aura@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

**`readme.source.md`** — Starter template with example `` ```aura `` blocks, customized for your repo type.

**`.gitignore` audit** — Ensures `.github/assets/`, `.github/workflows/`, `README.md`, and `readme.source.md` are not ignored.

## Features

```aura width=800 height=160
<div style={{ display: 'flex', width: '100%', height: '100%', gap: 12, fontFamily: 'Inter, sans-serif' }}>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)', borderRadius: 14, padding: 20, justifyContent: 'center' }}>
    <span style={{ fontSize: 24, marginBottom: 8 }}>JSX</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#e0e0ff' }}>React Components</span>
    <span style={{ fontSize: 12, color: '#8888aa', marginTop: 4 }}>Write real JSX with style objects</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'linear-gradient(180deg, #1a2e1a 0%, #162e16 100%)', borderRadius: 14, padding: 20, justifyContent: 'center' }}>
    <span style={{ fontSize: 24, marginBottom: 8 }}>SVG</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#e0ffe0' }}>Pixel-Perfect Output</span>
    <span style={{ fontSize: 12, color: '#88aa88', marginTop: 4 }}>Gradients, shadows, rounded corners</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'linear-gradient(180deg, #2e1a1a 0%, #2e1616 100%)', borderRadius: 14, padding: 20, justifyContent: 'center' }}>
    <span style={{ fontSize: 24, marginBottom: 8 }}>CI</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#ffe0e0' }}>GitHub Actions</span>
    <span style={{ fontSize: 12, color: '#aa8888', marginTop: 4 }}>Auto-rebuild on push</span>
  </div>
</div>
```

- **Write React/JSX** — Use familiar `style={{ }}` syntax with flexbox, gradients, shadows
- **Powered by Satori** — Vercel's engine converts JSX to SVG without a browser
- **Custom Fonts** — Inter bundled by default, bring your own via `--fonts-dir`
- **Meta Syntax** — Control dimensions: `` ```aura width=800 height=400 ``
- **GitHub-Compatible** — Output is pure Markdown + SVG, works everywhere

## Animations

You can add **CSS-based SVG animations** using the `<style>` injection mechanism. Satori renders a static frame at build time; the browser animates the SVG when it is displayed (e.g. on GitHub).

**How it works:** Add a `<style>` block in your JSX. Define `@keyframes` and apply them to elements by `#id` or `.class`. The renderer extracts and injects the CSS into the final SVG.

**Animatable properties:** `transform` (translate, scale, rotate), `opacity`, `fill`, and `stroke-dasharray`/`stroke-dashoffset`. Layout properties (`width`, `height`, `margin`) are unreliable.

**Targeting:** Use `id` on SVG elements (`<ellipse id="glow">`, `<g id="group">`) and reference them in CSS: `#glow { animation: pulse 2s infinite; }`. Raw SVG elements preserve `id`; Satori-rendered HTML may not always preserve `className`.

```aura width=400 height=120
<div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', background: '#0a0a12', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
  <style>
    {`
      @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      @keyframes float { 0%, 100% { transform: translateX(0) translateY(0); } 50% { transform: translateX(15px) translateY(-10px); } }
      #orb1 { animation: pulse 2s ease-in-out infinite; }
      #orb2 { animation: float 3s ease-in-out infinite; }
    `}
  </style>
  <svg width="400" height="120" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="ag1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(102,126,234,0.8)" />
        <stop offset="70%" stopColor="rgba(102,126,234,0)" />
      </radialGradient>
      <radialGradient id="ag2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(118,75,162,0.6)" />
        <stop offset="70%" stopColor="rgba(118,75,162,0)" />
      </radialGradient>
    </defs>
    <ellipse id="orb1" cx="120" cy="60" rx="70" ry="50" fill="url(#ag1)" />
    <ellipse id="orb2" cx="280" cy="60" rx="60" ry="45" fill="url(#ag2)" />
  </svg>
  <span style={{ fontSize: 15, fontWeight: 700, background: 'linear-gradient(90deg, #ffffff, #ffe4ec, #ffb6c1)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontFamily: 'Inter, sans-serif' }}>CSS @keyframes + SVG</span>
</div>
```

**Limitations:** No JavaScript, no SMIL. GitHub strips scripts but supports CSS animations. Prefer `transform` and `opacity` for best compatibility.

## Tech Stack

```aura width=700 height=60
<div style={{ display: 'flex', gap: 10, padding: '12px 20px', width: '100%', height: '100%', background: '#0d1117', borderRadius: 30, alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
  <span style={{ padding: '4px 14px', background: '#3178c6', color: 'white', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>TypeScript</span>
  <span style={{ padding: '4px 14px', background: '#2b2b2b', color: '#7ee787', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>Node.js</span>
  <span style={{ padding: '4px 14px', background: '#764ba2', color: 'white', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>Satori</span>
  <span style={{ padding: '4px 14px', background: '#1a1a2e', color: '#61dafb', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid #30363d' }}>React JSX</span>
  <span style={{ padding: '4px 14px', background: '#1a1a2e', color: '#f0883e', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid #30363d' }}>Unified/Remark</span>
</div>
```

## If You Use readme-aura

- **Add the topic:** Consider adding the [readme-aura](https://github.com/topics/readme-aura) topic to your repository so others can discover it.
- **Keep the footer:** I would appreciate it if you keep the "powered by readme-aura" footer in your README. It helps others find and try the tool.

## License

MIT

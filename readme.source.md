```aura width=800 height=210 link="https://www.npmjs.com/package/readme-aura"
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#08080c', borderRadius: 20, padding: 30, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden', border: '1px solid rgba(110,80,220,0.18)' }}>
  <style>
    {`
      @keyframes bn-drift-r { 0% { transform: translate(0, 0); opacity: 0.8; } 100% { transform: translate(1056px, 0); opacity: 1.05; } }
      @keyframes bn-drift-l { 0% { transform: translate(0, 0); opacity: 0.75; } 100% { transform: translate(-1003px, 0); opacity: 1; } }
      @keyframes bn-drift-u { 0% { transform: translate(0, 0); opacity: 0.85; } 100% { transform: translate(1000px, 0); opacity: 1; } }
      @keyframes bn-pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: translate(-1044px, 0); opacity: 0.5; } }
      #bn-tl1 { animation: bn-drift-r 0.8s infinite; }
      #bn-tl2 { animation: bn-drift-l 1.0s  infinite; }
      #bn-tr1 { animation: bn-drift-l 0.9s infinite 0.3s; }
      #bn-tr2 { animation: bn-drift-r 1.0s  infinite 0.1s; }
      #bn-br1 { animation: bn-drift-r 1.2s infinite 0.5s; }
      #bn-br2 { animation: bn-pulse 1s infinite; }
      #bn-bl1 { animation: bn-drift-l 1.3s infinite 0.2s; }
      #bn-bl2 { animation: bn-drift-u 0.7s infinite 0.4s; }
    `}
  </style>
  <svg width="800" height="180" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="bng1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(110,20,210,0.65)" />
        <stop offset="70%" stopColor="rgba(110,20,210,0)" />
      </radialGradient>
      <radialGradient id="bng2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(40,70,255,0.55)" />
        <stop offset="70%" stopColor="rgba(40,70,255,0)" />
      </radialGradient>
      <radialGradient id="bng3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,50,180,0.5)" />
        <stop offset="70%" stopColor="rgba(255,50,180,0)" />
      </radialGradient>
      <radialGradient id="bng4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(160,30,255,0.5)" />
        <stop offset="70%" stopColor="rgba(160,30,255,0)" />
      </radialGradient>
      <radialGradient id="bng5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,140,255,0.45)" />
        <stop offset="70%" stopColor="rgba(0,140,255,0)" />
      </radialGradient>
      <radialGradient id="bng6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(200,30,200,0.45)" />
        <stop offset="70%" stopColor="rgba(200,30,200,0)" />
      </radialGradient>
      <radialGradient id="bng7" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(100,25,205,0.42)" />
        <stop offset="70%" stopColor="rgba(100,25,205,0)" />
      </radialGradient>
      <radialGradient id="bng8" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(60,80,255,0.38)" />
        <stop offset="70%" stopColor="rgba(60,80,255,0)" />
      </radialGradient>
    </defs>
    <ellipse id="bn-tl1" cx="-100" cy="60" rx="140" ry="10" fill="url(#bng1)" />
    <ellipse id="bn-tl2" cx="840" cy="50" rx="120" ry="20" fill="url(#bng2)" />
    <ellipse id="bn-tr1" cx="720" cy="55" rx="130" ry="25" fill="url(#bng3)" />
    <ellipse id="bn-tr2" cx="660" cy="65" rx="110" ry="15" fill="url(#bng4)" />
    <ellipse id="bn-br1" cx="700" cy="130" rx="140" ry="10" fill="url(#bng5)" />
    <ellipse id="bn-br2" cx="740" cy="140" rx="100" ry="10" fill="url(#bng6)" />
    <ellipse id="bn-bl1" cx="100" cy="125" rx="130" ry="15" fill="url(#bng7)" />
    <ellipse id="bn-bl2" cx="60" cy="135" rx="110" ry="15" fill="url(#bng8)" />
    <ellipse id="bn-tl1" cx="-50" cy="60" rx="140" ry="10" fill="url(#bng1)" />
    <ellipse id="bn-tl2" cx="800" cy="50" rx="120" ry="10" fill="url(#bng2)" />
    <ellipse id="bn-tr1" cx="230" cy="55" rx="130" ry="25" fill="url(#bng3)" />
    <ellipse id="bn-tr2" cx="400" cy="65" rx="110" ry="15" fill="url(#bng4)" />
    <ellipse id="bn-br1" cx="500" cy="130" rx="140" ry="20" fill="url(#bng5)" />
    <ellipse id="bn-br2" cx="40" cy="140" rx="100" ry="10" fill="url(#bng6)" />
    <ellipse id="bn-bl1" cx="100" cy="125" rx="130" ry="15" fill="url(#bng7)" />
    <ellipse id="bn-bl2" cx="240" cy="135" rx="110" ry="15" fill="url(#bng8)" />
  </svg>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 60}}>
      <img src="assets/readme-aura-logo.png" width={120} height={120} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: 'white', margin: 0 }}>readme-aura</span>
      <span style={{ fontSize: 16, color: '#a0a0b8', marginTop: 4 }}>Next-Gen README generator for GitHub</span>
    </div>
  </div>
  <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
    <span style={{ padding: '4px 12px', background: 'rgba(12,10,20,0.6)', color: '#7eb8ff', borderRadius: 12, fontSize: 12, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>React/JSX</span>
    <span style={{ padding: '4px 12px', background: 'rgba(12,10,20,0.6)', color: '#e8c8ff', borderRadius: 12, fontSize: 12, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>SVG Rendering</span>
    <span style={{ padding: '4px 12px', background: 'rgba(12,10,20,0.6)', color: '#a0a0ff', borderRadius: 12, fontSize: 12, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>GitHub Actions</span>
  </div>
  {repo && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 16, zIndex: 10, lineHeight: 1 }}>
      <span style={{ fontSize: 13, fontWeight: 300, color: '#b8860b' }}>{repo.stars} stars</span>
      <span style={{ fontSize: 12, color: '#3d3d5c', fontWeight: 500 }}> | </span>
      <span style={{ fontSize: 13, fontWeight: 300, color: '#8b7ec8' }}>{repo.forks} forks</span>
      <span style={{ fontSize: 12, color: '#3d3d5c', fontWeight: 500 }}> | </span>
      <span style={{ fontSize: 13, fontWeight: 300, color: '#5a9ca8' }}>{repo.commits} commits</span>
      <span style={{ fontSize: 12, color: '#3d3d5c', fontWeight: 500 }}> | </span>
      {repo.language && (
        <>
          <span style={{ fontSize: 13, fontWeight: 300, color: '#9ca3af', padding: '3px 10px', background: 'rgba(12,10,20,0.5)', borderRadius: 6, border: '1px solid rgba(100,80,180,0.15)' }}>{repo.language}</span>
        </>
      )}
    </div>
  )}
</div>
```

```aura width=160 height=44 link="https://github.com/sponsors/collectioneur" inline align=center
<div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #0d0008, #1a0012)', borderRadius: 14, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
  <svg width="160" height="44" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <filter id="spf" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
      </filter>
    </defs>
    <rect x="0.5" y="0.5" width="159" height="43" rx="13.5" ry="13.5" fill="none" stroke="rgba(220,60,120,0.4)" strokeWidth="1" />
    <path d="M 111 22 Q 135 22 111 44 L 151 44 A 9 10 0 0 1 171 34 L 171 10 A 9 10 0 0 1 151 0 Z" fill="rgba(220,60,130,0.6)" filter="url(#spf)" />
    <ellipse cx="30" cy="22" rx="18" ry="15" fill="rgba(255,80,150,0.35)" filter="url(#spf)" />
    <g transform="translate(30, 22)">
      <g>
        <g transform="scale(0.874) translate(-12, -11.93)">
          <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75z" fill="none" stroke="rgba(255,80,150,0.7)" strokeWidth="1.5" />
        </g>
        <animateTransform attributeName="transform" type="scale" values="1;2.0" dur="2s" repeatCount="indefinite" calcMode="linear" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" />
      </g>
    </g>
    <g transform="translate(30, 22)">
      <g>
        <g transform="scale(0.874) translate(-12, -11.93)">
          <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75z" fill="none" stroke="rgba(255,80,150,0.7)" strokeWidth="1.5" />
        </g>
        <animateTransform attributeName="transform" type="scale" values="1;2.0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="0.67s" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="0.67s" />
      </g>
    </g>
    <g transform="translate(30, 22)">
      <g>
        <g transform="scale(0.874) translate(-12, -11.93)">
          <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75z" fill="none" stroke="rgba(255,80,150,0.7)" strokeWidth="1.5" />
        </g>
        <animateTransform attributeName="transform" type="scale" values="1;2.0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="1.33s" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="1.33s" />
      </g>
    </g>
    <g transform="translate(30, 22)">
      <g>
        <g transform="scale(0.874) translate(-12, -11.93)">
          <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75z" fill="none" stroke="rgba(255,80,150,1)" strokeWidth="1.5" />
        </g>
        <animateTransform attributeName="transform" type="scale" values="0.85;1.0;0.85" dur="1.2s" repeatCount="indefinite" />
      </g>
    </g>
  </svg>
  <div style={{ width: 52, flexShrink: 0 }} />
  <span style={{ fontSize: 14, fontWeight: 700, color: '#fafafa' }}>Sponsor me</span>
</div>
```

Write custom **React/JSX components** directly inside your Markdown, and readme-aura will render them into beautiful SVGs that work on GitHub.

GitHub strips all JS and CSS from README files. This tool lets you bypass that limitation by compiling your designs into static SVG images at build time.

## How It Works

1. Run `npx readme-aura init` in your repo – creates workflow, source template, and audits `.gitignore`
2. Edit `readme.source.md` – add JSX components inside `` ```aura `` code blocks
3. Preview locally with `npx readme-aura build` – JSX gets rendered to SVG via [Vercel Satori](https://github.com/vercel/satori)
4. Push to `main` – the GitHub Action auto-generates your `README.md`

```aura width=800 height=220 link="https://www.npmjs.com/package/readme-aura"
<div style={{ display: 'flex', width: '100%', height: '100%', gap: 12, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden', background: '#08080c', borderRadius: 16, padding: 24, border: '1px solid rgba(110,80,220,0.18)' }}>
  <style>
    {`
      @keyframes hiw-drift-r { 0%, 100% { transform: translate(0, 0); opacity: 0.8; } 50% { transform: translate(30px, -15px); opacity: 1.05; } }
      @keyframes hiw-drift-l { 0%, 100% { transform: translate(0, 0); opacity: 0.75; } 50% { transform: translate(-22px, 12px); opacity: 1; } }
      @keyframes hiw-drift-u { 0%, 100% { transform: translate(0, 0); opacity: 0.85; } 50% { transform: translate(18px, -18px); opacity: 1; } }
      @keyframes hiw-pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.18); opacity: 0.5; } }
      #hiw-g1 { animation: hiw-drift-r 6.7s ease-in-out infinite; }
      #hiw-g2 { animation: hiw-drift-l 8.3s ease-in-out infinite; }
      #hiw-g3 { animation: hiw-drift-r 7.5s ease-in-out infinite 0.3s; }
      #hiw-g4 { animation: hiw-drift-u 9.2s ease-in-out infinite 0.1s; }
      #hiw-g5 { animation: hiw-drift-l 5.8s ease-in-out infinite 0.5s; }
      #hiw-g6 { animation: hiw-pulse 5s ease-in-out infinite; }
      #hiw-g7 { animation: hiw-drift-r 8.3s ease-in-out infinite 0.2s; }
      #hiw-g8 { animation: hiw-drift-l 6.7s ease-in-out infinite 0.4s; }
    `}
  </style>
  <svg width="800" height="220" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="hiwg1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,180,200,0.6)" />
        <stop offset="70%" stopColor="rgba(0,180,200,0)" />
      </radialGradient>
      <radialGradient id="hiwg2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(40,120,220,0.55)" />
        <stop offset="70%" stopColor="rgba(40,120,220,0)" />
      </radialGradient>
      <radialGradient id="hiwg3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,200,180,0.45)" />
        <stop offset="70%" stopColor="rgba(0,200,180,0)" />
      </radialGradient>
      <radialGradient id="hiwg4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(100,200,255,0.5)" />
        <stop offset="70%" stopColor="rgba(100,200,255,0)" />
      </radialGradient>
      <radialGradient id="hiwg5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,180,100,0.4)" />
        <stop offset="70%" stopColor="rgba(255,180,100,0)" />
      </radialGradient>
      <radialGradient id="hiwg6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(180,140,255,0.45)" />
        <stop offset="70%" stopColor="rgba(180,140,255,0)" />
      </radialGradient>
      <radialGradient id="hiwg7" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(80,220,200,0.4)" />
        <stop offset="70%" stopColor="rgba(80,220,200,0)" />
      </radialGradient>
      <radialGradient id="hiwg8" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,150,120,0.35)" />
        <stop offset="70%" stopColor="rgba(255,150,120,0)" />
      </radialGradient>
    </defs>
    <ellipse id="hiw-g1" cx="120" cy="180" rx="160" ry="120" fill="url(#hiwg1)" />
    <ellipse id="hiw-g2" cx="180" cy="200" rx="140" ry="110" fill="url(#hiwg2)" />
    <ellipse id="hiw-g3" cx="90" cy="160" rx="150" ry="100" fill="url(#hiwg3)" />
    <ellipse id="hiw-g4" cx="150" cy="170" rx="110" ry="90" fill="url(#hiwg4)" />
    <ellipse id="hiw-g5" cx="70" cy="190" rx="100" ry="80" fill="url(#hiwg5)" />
    <ellipse id="hiw-g6" cx="200" cy="185" rx="80" ry="70" fill="url(#hiwg6)" />
    <ellipse id="hiw-g7" cx="130" cy="210" rx="90" ry="75" fill="url(#hiwg7)" />
    <ellipse id="hiw-g8" cx="160" cy="150" rx="70" ry="60" fill="url(#hiwg8)" />
  </svg>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10, justifyContent: 'center' }}>
    <span style={{ fontSize: 11, color: 'rgba(220,210,255,0.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 1</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Write JSX</span>
    <span style={{ fontSize: 12, color: '#7ee7ff', fontFamily: 'monospace' }}>{'```aura'}</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', fontFamily: 'monospace' }}>{'<Card />'}</span>
    <span style={{ fontSize: 12, color: '#7ee7ff', fontFamily: 'monospace' }}>{'```'}</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10, justifyContent: 'center' }}>
    <span style={{ fontSize: 11, color: 'rgba(220,210,255,0.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 2</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Build</span>
    <span style={{ fontSize: 13, color: '#9ee79e', fontFamily: 'monospace' }}>$ readme-aura build</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', marginTop: 8 }}>Satori renders JSX to SVG</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10, justifyContent: 'center' }}>
    <span style={{ fontSize: 11, color: 'rgba(220,210,255,0.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Step 3</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Deploy</span>
    <span style={{ fontSize: 13, color: '#ffffff' }}>README.md with images</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', marginTop: 8 }}>Works on any GitHub repo</span>
  </div>
</div>
```

## Quick Start

Run one command in your repo – it creates the GitHub Actions workflow, a starter `readme.source.md`, and ensures `.gitignore` won't block generated files:

```bash
npx readme-aura init
```

Then preview locally:

```bash
npx readme-aura build
```

That's it. Push to `main` and the workflow will auto-generate your `README.md` on every push.

> `init` auto-detects profile repos (`username/username`) and picks the right default template.

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
| `-f, --fonts-dir` | – | Custom fonts directory |
| `-g, --github-user` | auto-detect | GitHub username for stats |
| `-t, --github-token` | `$GITHUB_TOKEN` | Token for GitHub API |

### Init Options

| Option | Default | Description |
|--------|---------|-------------|
| `--template` | auto-detect | `profile`, `project`, or any example name (e.g. `DarkOrbs`) |
| `--force` | `false` | Overwrite existing files |

### Example Templates

Pass any template name from the [`examples/custom-templates/`](https://github.com/collectioneur/readme-aura/tree/main/examples/custom-templates) folder as `--template` and `init` will fetch its `readme.source.md` directly from GitHub and write it to your project:

```bash
npx readme-aura init --template DarkOrbs
npx readme-aura init --template PurpleGlow
npx readme-aura init --template LightOrbs
```

No extra downloads, no local files needed - the template is pulled on the fly and placed in `readme.source.md`, ready to build. Run `npx readme-aura build` right after and you get a working README.
<br/><br/><br/>

```aura width=260 height=60 link="https://github.com/collectioneur/readme-aura/blob/main/CONTRIBUTING.md"
<div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #120000, #200808)', borderRadius: 14, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
  <svg width="260" height="60" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <filter id="rbf" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
      </filter>
    </defs>
    <rect x="0.5" y="0.5" width="259" height="59" rx="13.5" ry="13.5" fill="none" stroke="rgba(200,40,40,0.4)" strokeWidth="1" />
    <path d="M 180 30 Q 220 30 180 60 L 246 60 A 14 14 0 0 1 278 46 L 278 34 A 14 34 0 0 1 246 0 Z" fill="rgba(200,40,40,0.6)" filter="url(#rbf)" />
    <circle cx="36" cy="30" r="4" fill="none" stroke="rgba(255,60,60,0.7)" strokeWidth="3">
      <animate attributeName="r" values="4;28" dur="2s" repeatCount="indefinite" calcMode="linear" />
      <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" />
    </circle>
    <circle cx="36" cy="30" r="4" fill="none" stroke="rgba(255,60,60,0.7)" strokeWidth="3">
      <animate attributeName="r" values="4;28" dur="2s" repeatCount="indefinite" calcMode="linear" begin="0.67s" />
      <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="0.67s" />
    </circle>
    <circle cx="36" cy="30" r="4" fill="none" stroke="rgba(255,60,60,0.7)" strokeWidth="3">
      <animate attributeName="r" values="4;28" dur="2s" repeatCount="indefinite" calcMode="linear" begin="1.33s" />
      <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" calcMode="linear" begin="1.33s" />
    </circle>
    <circle cx="36" cy="30" r="4" fill="rgba(255,60,60,1)">
      <animate attributeName="r" values="2.5;4;2.5" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle cx="36" cy="30" r="3" fill="rgba(255,100,100,1)" />
  </svg>
  <div style={{ width: 60, flexShrink: 0 }} />
  <span style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', letterSpacing: '0.3px', zIndex: 10 }}>Built something cool? Contribute your template.</span>
</div>
```

Made your profile unique with readme-aura? Drop your `readme.source.md` into [`examples/custom-templates/`](https://github.com/collectioneur/readme-aura/tree/main/examples/custom-templates) and anyone will be able to install your design with a single command. See the [contributing guide](https://github.com/collectioneur/readme-aura/blob/main/CONTRIBUTING.md) for details.

## What `init` Creates

The `init` command sets up everything you need:

**`.github/workflows/readme-aura.yml`** – GitHub Action that rebuilds your README on every push to `main` and on a daily schedule (to keep GitHub stats fresh):

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

**`readme.source.md`** – Starter template with example `` ```aura `` blocks, customized for your repo type.

**`.gitignore` audit** – Ensures `.github/assets/`, `.github/workflows/`, `README.md`, and `readme.source.md` are not ignored.

## Features

```aura width=800 height=160 link="https://www.npmjs.com/package/readme-aura"
<div style={{ display: 'flex', width: '100%', height: '100%', gap: 12, fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden', background: '#08080c', borderRadius: 16, padding: 20, border: '1px solid rgba(110,80,220,0.18)' }}>
  <style>
    {`
      @keyframes br-drift-right { 0%, 100% { transform: translate(0, 0); opacity: 0.8; } 50% { transform: translate(37px, -18px); opacity: 1.1; } }
      @keyframes br-drift-left { 0%, 100% { transform: translate(0, 0); opacity: 0.75; } 50% { transform: translate(-30px, 15px); opacity: 1.05; } }
      @keyframes br-drift-up { 0%, 100% { transform: translate(0, 0); opacity: 0.85; } 50% { transform: translate(22px, -22px); opacity: 1; } }
      @keyframes br-pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.27); opacity: 0.5; } }
      #feat-glow-1 { animation: br-drift-right 6.7s ease-in-out infinite; }
      #feat-glow-2 { animation: br-drift-left 8.3s ease-in-out infinite; }
      #feat-glow-3 { animation: br-drift-right 7.5s ease-in-out infinite 0.3s; }
      #feat-glow-4 { animation: br-drift-up 9.2s ease-in-out infinite 0.1s; }
      #feat-glow-5 { animation: br-drift-left 5.8s ease-in-out infinite 0.5s; }
      #feat-glow-6 { animation: br-pulse 5s ease-in-out infinite; }
      #feat-glow-7 { animation: br-drift-right 8.3s ease-in-out infinite 0.2s; }
      #feat-glow-8 { animation: br-drift-left 6.7s ease-in-out infinite 0.4s; }
      #feat-glow-9 { animation: br-drift-up 7.5s ease-in-out infinite 0.15s; }
      #feat-glow-10 { animation: br-pulse 5.8s ease-in-out infinite 0.35s; }
    `}
  </style>
  <svg width="800" height="160" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="fg1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(110,20,210,0.65)" />
        <stop offset="45%" stopColor="rgba(80,15,170,0.28)" />
        <stop offset="70%" stopColor="rgba(80,15,170,0)" />
      </radialGradient>
      <radialGradient id="fg2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(40,70,255,0.55)" />
        <stop offset="45%" stopColor="rgba(20,50,200,0.22)" />
        <stop offset="70%" stopColor="rgba(20,50,200,0)" />
      </radialGradient>
      <radialGradient id="fg3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,140,255,0.42)" />
        <stop offset="70%" stopColor="rgba(0,140,255,0)" />
      </radialGradient>
      <radialGradient id="fg4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,190,230,0.35)" />
        <stop offset="70%" stopColor="rgba(0,190,230,0)" />
      </radialGradient>
      <radialGradient id="fg5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(160,30,255,0.5)" />
        <stop offset="70%" stopColor="rgba(160,30,255,0)" />
      </radialGradient>
      <radialGradient id="fg6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,50,180,0.5)" />
        <stop offset="45%" stopColor="rgba(200,30,200,0.25)" />
        <stop offset="70%" stopColor="rgba(200,30,200,0)" />
      </radialGradient>
      <radialGradient id="fg7" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(200,30,200,0.45)" />
        <stop offset="70%" stopColor="rgba(200,30,200,0)" />
      </radialGradient>
      <radialGradient id="fg8" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,60,200,0.35)" />
        <stop offset="70%" stopColor="rgba(255,60,200,0)" />
      </radialGradient>
      <radialGradient id="fg9" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(100,25,205,0.42)" />
        <stop offset="70%" stopColor="rgba(100,25,205,0)" />
      </radialGradient>
      <radialGradient id="fg10" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(60,80,255,0.38)" />
        <stop offset="70%" stopColor="rgba(60,80,255,0)" />
      </radialGradient>
    </defs>
    <ellipse id="feat-glow-1" cx="620" cy="160" rx="180" ry="120" fill="url(#fg1)" />
    <ellipse id="feat-glow-2" cx="720" cy="170" rx="160" ry="110" fill="url(#fg2)" />
    <ellipse id="feat-glow-3" cx="580" cy="150" rx="170" ry="115" fill="url(#fg3)" />
    <ellipse id="feat-glow-4" cx="650" cy="140" rx="120" ry="90" fill="url(#fg4)" />
    <ellipse id="feat-glow-5" cx="750" cy="155" rx="100" ry="80" fill="url(#fg5)" />
    <ellipse id="feat-glow-6" cx="680" cy="165" rx="80" ry="70" fill="url(#fg6)" />
    <ellipse id="feat-glow-7" cx="600" cy="135" rx="90" ry="75" fill="url(#fg7)" />
    <ellipse id="feat-glow-8" cx="690" cy="145" rx="110" ry="85" fill="url(#fg8)" />
    <ellipse id="feat-glow-9" cx="640" cy="170" rx="70" ry="60" fill="url(#fg9)" />
    <ellipse id="feat-glow-10" cx="730" cy="130" rx="75" ry="65" fill="url(#fg10)" />
  </svg>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, justifyContent: 'center', border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>
    <span style={{ fontSize: 24, marginBottom: 8, color: '#ffffff' }}>JSX</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>React Components</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', marginTop: 4 }}>Write real JSX with style objects</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, justifyContent: 'center', border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>
    <span style={{ fontSize: 24, marginBottom: 8, color: '#ffffff' }}>SVG</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>Pixel-Perfect Output</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', marginTop: 4 }}>Gradients, shadows, rounded corners</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(12,10,20,0.6)', borderRadius: 14, padding: 20, justifyContent: 'center', border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>
    <span style={{ fontSize: 24, marginBottom: 8, color: '#ffffff' }}>CI</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>GitHub Actions</span>
    <span style={{ fontSize: 12, color: 'rgba(220,210,255,0.85)', marginTop: 4 }}>Auto-rebuild on push</span>
  </div>
</div>
```

- **Write React/JSX** – Use familiar `style={{ }}` syntax with flexbox, gradients, shadows
- **Powered by Satori** – Vercel's engine converts JSX to SVG without a browser
- **Custom Fonts** – Inter bundled by default, bring your own via `--fonts-dir`
- **Meta Syntax** – Control dimensions: `` ```aura width=800 height=400 ``
- **Clickable Images** – Add a link: `` ```aura link="https://example.com" `` – clicking the image opens the URL
- **Inline Blocks** – Add `inline` to render as `<img>` instead of a block. Consecutive inline blocks are automatically joined on one line. Add `align=center` to center-align the whole group inside `<p align="center">`
- **GitHub-Compatible** – Output is pure Markdown + SVG, works everywhere

### Block Parameters

All parameters are written directly on the opening fence line of an `` ```aura `` block:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number | `800` | Width of the rendered SVG in pixels |
| `height` | number | `400` | Height of the rendered SVG in pixels |
| `link` | string | – | URL – wraps the image in a clickable `<a>` tag |
| `inline` | flag | – | Render as an inline `<img>` instead of a block paragraph. Consecutive inline blocks are automatically joined on one line |
| `align` | `center` \| `left` \| `right` | – | Wrap a group of consecutive inline blocks in `<p align="...">`. Only meaningful when `inline` is set |

**Example – centered row of social buttons:**

```markdown
```aura width=120 height=44 link="https://github.com/you" inline align=center
<SocialMediaButton ... />
` `` `
```aura width=138 height=44 link="https://x.com/you" inline align=center
<SocialMediaButton ... />
` `` `
```

Output in README.md:
```html
<p align="center">
<a href="https://github.com/you"><img src="./assets/component-0.svg" width="120" height="44" /></a><a href="https://x.com/you"><img src="./assets/component-1.svg" width="138" height="44" /></a>
</p>
```

> The `align` value is read from the first block in the group that declares it. Blocks without `align` still join the same group – only the wrapper is controlled by the flag.

## Components

readme-aura ships with ready-to-use components you can drop into any `` ```aura `` block - no imports needed. They are automatically available in the JSX context.


### SocialMediaButton

<table style="width: 100%; table-layout: fixed; border-collapse: collapse;">
  <colgroup>
    <col style="width: 38%;" />
    <col style="width: 62%;" />
  </colgroup>
  <thead>
    <tr>
      <th style="text-align: left;">Code</th>
      <th style="text-align: left;">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top; padding-right: 12px;">
        <pre style="font-size: 9px; line-height: 1.3; margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word;"><code>&lt;SocialMediaButton
  icon="***image URI***"
  text="readme-aura"
  backgroundColor="#111111"
  width={150}
  height={44}
  gradientStops={[
    { offset: '0%', color: '#ffffff' },
    { offset: '10%', color: '#111111' },
    { offset: '50%', color: '#eeeeee' },
    { offset: '60%', color: '#1af4ff' },
    { offset: '80%', color: '#111111' },
    { offset: '100%', color: '#555555' },
  ]}
  iconSize="30"
/&gt;</code></pre>
      </td>
      <td style="vertical-align: middle; text-align: center;">
        <a href="https://collectioneur.github.io/readme-aura/"><img src="assets/readme-aura-button.svg" alt="SocialMediaButton" width="150" /></a>
      </td>
    </tr>
  </tbody>
</table>

| Prop | Default | Description |
|------|---------|-------------|
| `icon` | – | Icon image path or URL |
| `text` | – | Button label |
| `backgroundColor` | `#111111` | Fill color |
| `textColor` | `#f5f5f5` | Label color |
| `fontSize` | `13` | Label font size |
| `width` / `height` | `150` / `40` | Button dimensions |
| `iconSize` | `18` | Icon dimensions |
| `borderColor` | `#AAAAAA` | Outer border color |
| `gradientStops` | holographic | Animated gradient colors |
| `gradientStrokeWidth` | `2` | Gradient border thickness |

## Animations

You can add **CSS-based SVG animations** using the `<style>` injection mechanism, or **SMIL animations** (`<animate>`, `<animateTransform>`, `<animateMotion>`) directly on SVG elements. Satori renders a static frame at build time; the browser animates the SVG when it is displayed (e.g. on GitHub).

**How it works:** Add a `<style>` block in your JSX. Define `@keyframes` and apply them to elements by `#id` or `.class`. The renderer extracts and injects the CSS into the final SVG.

**Animatable properties:** `transform` (translate, scale, rotate), `opacity`, `fill`, and `stroke-dasharray`/`stroke-dashoffset`. Layout properties (`width`, `height`, `margin`) are unreliable.

**Targeting:** Use `id` on SVG elements (`<ellipse id="glow">`, `<g id="group">`) and reference them in CSS: `#glow { animation: pulse 2s infinite; }`. Raw SVG elements preserve `id`; Satori-rendered HTML may not always preserve `className`.

```aura width=400 height=140 link="https://www.npmjs.com/package/readme-aura"
<div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', background: '#0a0a12', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
  <style>
    {`
      @keyframes a-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
      @keyframes a-float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(22px, -15px); } }
      @keyframes a-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes a-dash { 0% { stroke-dashoffset: 240; } 100% { stroke-dashoffset: 0; } }
      @keyframes a-float2 { 0%, 100% { transform: translate(-18px, 12px); } 50% { transform: translate(0, 0); } }
      @keyframes a-scale { 0%, 100% { opacity: 0.5; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.2); } }
      #a-orb1 { animation: a-pulse 1.7s ease-in-out infinite; }
      #a-orb2 { animation: a-float 2.5s ease-in-out infinite; }
      #a-rect { animation: a-rotate 4s linear infinite; }
      #a-path { animation: a-dash 1.5s ease-in-out infinite; }
      #a-poly { animation: a-float2 3s ease-in-out infinite 0.5s; }
      #a-rect2 { animation: a-scale 2.2s ease-in-out infinite 0.3s; }
    `}
  </style>
  <svg width="400" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="ag1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(102,126,234,0.8)" />
        <stop offset="70%" stopColor="rgba(102,126,234,0)" />
      </radialGradient>
      <radialGradient id="ag2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(118,75,162,0.6)" />
        <stop offset="70%" stopColor="rgba(118,75,162,0)" />
      </radialGradient>
      <linearGradient id="ag3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(102,126,234,0.5)" />
        <stop offset="100%" stopColor="rgba(118,75,162,0.5)" />
      </linearGradient>
    </defs>
    <ellipse id="a-orb1" cx="100" cy="70" rx="55" ry="40" fill="url(#ag1)" />
    <ellipse id="a-orb2" cx="300" cy="70" rx="50" ry="38" fill="url(#ag2)" />
    <rect id="a-rect" x="185" y="45" width="30" height="30" rx="6" fill="url(#ag3)" transform="rotate(0 200 60)" transformOrigin="200px 60px" />
    <path id="a-path" d="M 60 110 Q 200 30 340 110" fill="none" stroke="rgba(150,100,255,0.6)" strokeWidth="2" strokeDasharray="120 120" strokeLinecap="round" />
    <polygon id="a-poly" points="50,90 70,70 90,90 70,110" fill="rgba(255,180,220,0.4)" />
    <rect id="a-rect2" x="320" y="95" width="24" height="24" rx="8" fill="rgba(100,200,255,0.5)" />
  </svg>
  <span style={{ fontSize: 15, fontWeight: 700, background: 'linear-gradient(90deg, #ffffff, #ffe4ec, #ffb6c1)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontFamily: 'Inter, sans-serif' }}>CSS @keyframes + SVG</span>
</div>
```

**Limitations:** No JavaScript. GitHub strips scripts but supports both CSS animations and SMIL. Prefer `transform` and `opacity` for best CSS compatibility.

## Tech Stack

```aura width=700 height=60 link="https://www.npmjs.com/package/readme-aura"
<div style={{ display: 'flex', gap: 10, padding: '12px 20px', width: '100%', height: '100%', background: '#08080c', borderRadius: 30, alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden', border: '1px solid rgba(110,80,220,0.18)' }}>
  <style>
    {`
      @keyframes ts-drift-right { 0%, 100% { transform: translate(0, 0); opacity: 0.8; } 50% { transform: translate(27px, -9px); opacity: 1.1; } }
      @keyframes ts-drift-left { 0%, 100% { transform: translate(0, 0); opacity: 0.75; } 50% { transform: translate(-22px, 12px); opacity: 1; } }
      @keyframes ts-pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.18); opacity: 0.5; } }
      #ts-glow-1 { animation: ts-drift-right 7.5s ease-in-out infinite; }
      #ts-glow-2 { animation: ts-drift-left 8.3s ease-in-out infinite; }
      #ts-glow-3 { animation: ts-pulse 5.8s ease-in-out infinite; }
      #ts-glow-4 { animation: ts-drift-right 6.7s ease-in-out infinite 0.2s; }
      #ts-glow-5 { animation: ts-drift-left 9.2s ease-in-out infinite 0.3s; }
      #ts-glow-6 { animation: ts-pulse 5s ease-in-out infinite 0.4s; }
    `}
  </style>
  <svg width="700" height="60" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="tsg1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(110,20,210,0.6)" />
        <stop offset="70%" stopColor="rgba(110,20,210,0)" />
      </radialGradient>
      <radialGradient id="tsg2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(40,70,255,0.5)" />
        <stop offset="70%" stopColor="rgba(40,70,255,0)" />
      </radialGradient>
      <radialGradient id="tsg3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,50,180,0.45)" />
        <stop offset="70%" stopColor="rgba(255,50,180,0)" />
      </radialGradient>
      <radialGradient id="tsg4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,150,255,0.4)" />
        <stop offset="70%" stopColor="rgba(0,150,255,0)" />
      </radialGradient>
      <radialGradient id="tsg5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(160,30,255,0.45)" />
        <stop offset="70%" stopColor="rgba(160,30,255,0)" />
      </radialGradient>
      <radialGradient id="tsg6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(200,30,200,0.4)" />
        <stop offset="70%" stopColor="rgba(200,30,200,0)" />
      </radialGradient>
    </defs>
    <ellipse id="ts-glow-1" cx="450" cy="80" rx="140" ry="70" fill="url(#tsg1)" />
    <ellipse id="ts-glow-2" cx="550" cy="75" rx="130" ry="65" fill="url(#tsg2)" />
    <ellipse id="ts-glow-3" cx="620" cy="85" rx="120" ry="60" fill="url(#tsg3)" />
    <ellipse id="ts-glow-4" cx="480" cy="65" rx="80" ry="50" fill="url(#tsg4)" />
    <ellipse id="ts-glow-5" cx="590" cy="95" rx="90" ry="55" fill="url(#tsg5)" />
    <ellipse id="ts-glow-6" cx="530" cy="70" rx="70" ry="45" fill="url(#tsg6)" />
  </svg>
  <span style={{ padding: '4px 14px', background: 'rgba(12,10,20,0.6)', color: '#7eb8ff', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>TypeScript</span>
  <span style={{ padding: '4px 14px', background: 'rgba(12,10,20,0.6)', color: '#9ee79e', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>Node.js</span>
  <span style={{ padding: '4px 14px', background: 'rgba(12,10,20,0.6)', color: '#e8c8ff', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>Satori</span>
  <span style={{ padding: '4px 14px', background: 'rgba(12,10,20,0.6)', color: '#7ee7ff', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>React JSX</span>
  <span style={{ padding: '4px 14px', background: 'rgba(12,10,20,0.6)', color: '#ffb088', borderRadius: 16, fontSize: 13, fontWeight: 600, border: '1px solid rgba(120,80,220,0.2)', zIndex: 10 }}>Unified/Remark</span>
</div>
```

## If You Use readme-aura

- **Add the topic:** Consider adding the [readme-aura](https://github.com/topics/readme-aura) topic to your repository so others can discover it.
- **Found a bug?** Open an [issue](https://github.com/collectioneur/readme-aura/issues) - even a one-liner helps.
- **Built something cool?** Drop your template into [`examples/custom-templates/`](https://github.com/collectioneur/readme-aura/tree/main/examples/custom-templates) so anyone can install it with a single command. See the [contributing guide](https://github.com/collectioneur/readme-aura/blob/main/CONTRIBUTING.md) for details.

## License

MIT

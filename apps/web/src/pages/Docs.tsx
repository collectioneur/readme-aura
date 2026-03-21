import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlurGlassTitle from '../components/BlurGlassTitle'

const sections = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'commands', label: 'Commands' },
  { id: 'build-options', label: 'Build Options' },
  { id: 'init-options', label: 'Init Options' },
  { id: 'what-init-creates', label: 'What init Creates' },
  { id: 'features', label: 'Features' },
  { id: 'animations', label: 'Animations' },
  { id: 'tech-stack', label: 'Tech Stack' },
]

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(children.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative group my-5">
      <div className="bg-surface-highest rounded-xl p-5 font-mono text-sm text-ink-bright overflow-x-auto leading-relaxed">
        <pre className="whitespace-pre-wrap break-words">{children.trim()}</pre>
      </div>
      <button
        onClick={copy}
        className="absolute top-3 right-3 px-2.5 py-1 bg-surface-high rounded-lg text-xs font-grotesk text-ink-muted opacity-0 group-hover:opacity-100 hover:text-ink-bright transition-all duration-150"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-highest">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-grotesk text-teal-300 font-500 text-xs uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-surface-low' : 'bg-surface'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-secondary">
                  <code className="font-mono text-teal-300 text-xs">{cell.startsWith('`') ? cell.slice(1, -1) : cell}</code>
                  {!cell.startsWith('`') && j > 0 && (
                    <span className="font-sans text-ink-secondary">{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Docs() {
  const [active, setActive] = useState('how-it-works')

  useEffect(() => {
    const onScroll = () => {
      // If near the bottom of the page, activate last section
      const scrollBottom = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      if (pageHeight - scrollBottom < 80) {
        setActive(sections[sections.length - 1].id)
        return
      }

      // Find the section whose top is closest to 30% from the top of the viewport
      const threshold = window.innerHeight * 0.3
      let best: string | null = null
      let bestDist = Infinity
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= threshold) {
          const dist = threshold - top
          if (dist < bestDist) {
            bestDist = dist
            best = id
          }
        }
      }
      if (best) setActive(best)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-surface-base">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-20 pt-6">
            <p className="font-grotesk text-xs tracking-widest uppercase text-ink-muted mb-4">On this page</p>
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActive(id)}
                  className={`block text-sm py-1.5 px-3 rounded-lg transition-colors font-grotesk ${
                    active === id
                      ? 'text-teal-300 bg-surface-high'
                      : 'text-ink-muted hover:text-ink-secondary'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 pt-6">
          {/* Page title */}
          <div className="mb-12">
            <p className="font-grotesk text-xs tracking-[0.2em] uppercase text-teal-400 mb-3">Documentation</p>
            <h1 className="font-sans font-black text-5xl md:text-6xl tracking-tight mb-4">
              <BlurGlassTitle>readme-aura</BlurGlassTitle>
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed max-w-xl">
              Write custom React/JSX components directly inside your Markdown, and readme-aura will render them into beautiful SVGs that work on GitHub.
            </p>
            <p className="text-ink-muted text-sm mt-3 leading-relaxed">
              GitHub strips all JS and CSS from README files. This tool lets you bypass that limitation by compiling your designs into static SVG images at build time.
            </p>
          </div>

          {/* How It Works */}
          <section id="how-it-works" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-6">How It Works</h2>
            <ol className="space-y-4">
              {[
                ['Run init', 'Run npx readme-aura init in your repo - creates workflow, source template, and audits .gitignore'],
                ['Edit source', 'Edit readme.source.md - add JSX components inside ```aura code blocks'],
                ['Preview locally', 'Preview locally with npx readme-aura build - JSX gets rendered to SVG via Vercel Satori'],
                ['Push to main', 'Push to main - the GitHub Action auto-generates your README.md'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-highest flex items-center justify-center font-grotesk text-xs text-teal-300 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-ink-bright font-medium text-sm mb-0.5">{title}</p>
                    <p className="text-ink-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">Quick Start</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-4">
              Run one command in your repo - it creates the GitHub Actions workflow, a starter{' '}
              <code className="font-mono text-teal-300 text-xs">readme.source.md</code>, and ensures{' '}
              <code className="font-mono text-teal-300 text-xs">.gitignore</code> won't block generated files:
            </p>
            <CodeBlock>npx readme-aura init</CodeBlock>
            <p className="text-ink-secondary text-sm leading-relaxed mb-4">Then preview locally:</p>
            <CodeBlock>npx readme-aura build</CodeBlock>
            <p className="text-ink-secondary text-sm leading-relaxed">
              That's it. Push to <code className="font-mono text-teal-300 text-xs">main</code> and the workflow will auto-generate your{' '}
              <code className="font-mono text-teal-300 text-xs">README.md</code> on every push.
            </p>
            <div className="mt-4 px-4 py-3 bg-surface-high rounded-xl border-l-2 border-teal-500">
              <p className="text-ink-secondary text-sm">
                <code className="font-mono text-teal-300 text-xs">init</code> auto-detects profile repos (<code className="font-mono text-teal-300 text-xs">username/username</code>) and picks the right template.
              </p>
            </div>
          </section>

          {/* Commands */}
          <section id="commands" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">Commands</h2>
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-highest">
                    <th className="text-left px-4 py-3 font-grotesk text-teal-300 font-500 text-xs uppercase tracking-wider">Command</th>
                    <th className="text-left px-4 py-3 font-grotesk text-teal-300 font-500 text-xs uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-surface-low">
                    <td className="px-4 py-3 font-mono text-teal-300 text-xs">npx readme-aura init</td>
                    <td className="px-4 py-3 text-ink-secondary text-sm">Scaffold workflow, source template, audit .gitignore</td>
                  </tr>
                  <tr className="bg-surface">
                    <td className="px-4 py-3 font-mono text-teal-300 text-xs">npx readme-aura build</td>
                    <td className="px-4 py-3 text-ink-secondary text-sm">Render ```aura blocks to SVG and generate README.md</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Build Options */}
          <section id="build-options" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">Build Options</h2>
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-highest">
                    {['Option', 'Default', 'Description'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-grotesk text-teal-300 font-500 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['-s, --source', 'readme.source.md', 'Source markdown file'],
                    ['-o, --output', 'README.md', 'Output markdown file'],
                    ['-a, --assets', '.github/assets', 'Directory for generated SVGs'],
                    ['-f, --fonts-dir', '-', 'Custom fonts directory'],
                    ['-g, --github-user', 'auto-detect', 'GitHub username for stats'],
                    ['-t, --github-token', '$GITHUB_TOKEN', 'Token for GitHub API'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-surface-low' : 'bg-surface'}>
                      <td className="px-4 py-3 font-mono text-teal-300 text-xs whitespace-nowrap">{row[0]}</td>
                      <td className="px-4 py-3 font-mono text-ink-secondary text-xs">{row[1]}</td>
                      <td className="px-4 py-3 text-ink-secondary text-sm">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Init Options */}
          <section id="init-options" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">Init Options</h2>
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-highest">
                    {['Option', 'Default', 'Description'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-grotesk text-teal-300 font-500 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['--template', 'auto-detect', 'Template: profile or project'],
                    ['--force', 'false', 'Overwrite existing files'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-surface-low' : 'bg-surface'}>
                      <td className="px-4 py-3 font-mono text-teal-300 text-xs">{row[0]}</td>
                      <td className="px-4 py-3 font-mono text-ink-secondary text-xs">{row[1]}</td>
                      <td className="px-4 py-3 text-ink-secondary text-sm">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What init creates */}
          <section id="what-init-creates" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">What <code className="text-teal-400 not-italic text-2xl">init</code> Creates</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-6">The init command sets up everything you need:</p>

            <div className="space-y-6">
              <div>
                <p className="font-grotesk text-xs text-teal-300 mb-2 font-mono">.github/workflows/readme-aura.yml</p>
                <p className="text-ink-secondary text-sm leading-relaxed mb-3">
                  GitHub Action that rebuilds your README on every push to <code className="font-mono text-teal-300 text-xs">main</code> and on a daily schedule (to keep GitHub stats fresh):
                </p>
                <CodeBlock>{`name: Generate README
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
          github_token: \${{ secrets.GITHUB_TOKEN }}`}</CodeBlock>
              </div>

              <div>
                <p className="font-grotesk text-xs text-teal-300 mb-2 font-mono">readme.source.md</p>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  Starter template with example <code className="font-mono text-teal-300 text-xs">```aura</code> blocks, customized for your repo type.
                </p>
              </div>

              <div>
                <p className="font-grotesk text-xs text-teal-300 mb-2">.gitignore audit</p>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  Ensures <code className="font-mono text-teal-300 text-xs">.github/assets/</code>, <code className="font-mono text-teal-300 text-xs">.github/workflows/</code>, <code className="font-mono text-teal-300 text-xs">README.md</code>, and <code className="font-mono text-teal-300 text-xs">readme.source.md</code> are not ignored.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-6">Features</h2>
            <ul className="space-y-4">
              {[
                ['Write React/JSX', 'Use familiar style={{ }} syntax with flexbox, gradients, shadows'],
                ['Powered by Satori', "Vercel's engine converts JSX to SVG without a browser"],
                ['Custom Fonts', 'Inter bundled by default, bring your own via --fonts-dir'],
                ['Meta Syntax', 'Control dimensions: ```aura width=800 height=400'],
                ['GitHub-Compatible', 'Output is pure Markdown + SVG, works everywhere'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-teal-400 mt-0.5 flex-shrink-0">✦</span>
                  <div>
                    <span className="text-ink-bright text-sm font-medium">{title}</span>
                    <span className="text-ink-muted text-sm"> - {desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Animations */}
          <section id="animations" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-4">Animations</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-4">
              You can add <strong className="text-ink-bright">CSS-based SVG animations</strong> using the <code className="font-mono text-teal-300 text-xs">&lt;style&gt;</code> injection mechanism. Satori renders a static frame at build time; the browser animates the SVG when it is displayed on GitHub.
            </p>

            <div className="space-y-5">
              <div>
                <p className="font-grotesk text-xs tracking-widest uppercase text-teal-400 mb-2">How it works</p>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  Add a <code className="font-mono text-teal-300 text-xs">&lt;style&gt;</code> block in your JSX. Define <code className="font-mono text-teal-300 text-xs">@keyframes</code> and apply them to elements by <code className="font-mono text-teal-300 text-xs">#id</code> or <code className="font-mono text-teal-300 text-xs">.class</code>. The renderer extracts and injects the CSS into the final SVG.
                </p>
              </div>

              <div>
                <p className="font-grotesk text-xs tracking-widest uppercase text-teal-400 mb-2">Animatable properties</p>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  <code className="font-mono text-teal-300 text-xs">transform</code> (translate, scale, rotate), <code className="font-mono text-teal-300 text-xs">opacity</code>, <code className="font-mono text-teal-300 text-xs">fill</code>, and <code className="font-mono text-teal-300 text-xs">stroke-dasharray</code>/<code className="font-mono text-teal-300 text-xs">stroke-dashoffset</code>. Layout properties (<code className="font-mono text-teal-300 text-xs">width</code>, <code className="font-mono text-teal-300 text-xs">height</code>, <code className="font-mono text-teal-300 text-xs">margin</code>) are unreliable.
                </p>
              </div>

              <div>
                <p className="font-grotesk text-xs tracking-widest uppercase text-teal-400 mb-2">Targeting</p>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  Use <code className="font-mono text-teal-300 text-xs">id</code> on SVG elements (<code className="font-mono text-teal-300 text-xs">&lt;ellipse id="glow"&gt;</code>) and reference them in CSS: <code className="font-mono text-teal-300 text-xs">#glow {'{'} animation: pulse 2s infinite; {'}'}</code>.
                </p>
              </div>

              <div className="px-4 py-3 bg-surface-high rounded-xl border-l-2 border-teal-500">
                <p className="text-ink-secondary text-sm">
                  <strong className="text-ink-bright">Limitations:</strong> No JavaScript, no SMIL. GitHub strips scripts but supports CSS animations. Prefer <code className="font-mono text-teal-300 text-xs">transform</code> and <code className="font-mono text-teal-300 text-xs">opacity</code> for best compatibility.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack" className="mb-14 scroll-mt-20">
            <h2 className="font-sans font-bold text-3xl text-gradient-bright tracking-tight mb-6">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'React', desc: 'Component model' },
                { name: 'TypeScript', desc: 'Type safety' },
                { name: 'Satori', desc: 'JSX → SVG' },
                { name: 'PostCSS', desc: 'Style processing' },
              ].map((tech) => (
                <div key={tech.name} className="bg-surface-high rounded-xl p-4 text-center">
                  <p className="text-ink-bright font-medium text-sm mb-1">{tech.name}</p>
                  <p className="text-ink-muted text-xs">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Back to home */}
          <div className="border-t border-surface-high pt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-grotesk text-ink-muted hover:text-teal-300 transition-colors">
              ← Back to home
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

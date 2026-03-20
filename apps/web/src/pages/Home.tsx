import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Sparkle = ({ className = '' }: { className?: string }) => (
  <span className={`text-violet-400 select-none ${className}`} aria-hidden>✦</span>
)

const features = [
  {
    icon: '⬡',
    label: 'JSX in Markdown',
    title: 'Write React / JSX',
    desc: 'Use familiar style={{ }} syntax with flexbox, gradients, and shadows — right inside your README.',
  },
  {
    icon: '◈',
    label: 'No Browser Needed',
    title: 'Powered by Satori',
    desc: "Vercel's JSX-to-SVG engine renders your components at build time without spinning up a browser.",
  },
  {
    icon: '✺',
    label: 'Typography',
    title: 'Custom Fonts',
    desc: 'Inter is bundled by default. Bring your own typefaces via --fonts-dir for full editorial control.',
  },
  {
    icon: '◎',
    label: 'Zero Runtime',
    title: 'GitHub-Compatible',
    desc: 'Output is pure Markdown + SVG. No scripts, no iframes — works anywhere Markdown renders.',
  },
  {
    icon: '⟳',
    label: 'Motion',
    title: 'CSS Animations',
    desc: 'Add @keyframes via <style> injection. Satori renders a static frame; browsers animate the SVG on GitHub.',
  },
  {
    icon: '⬚',
    label: 'Dimensions',
    title: 'Meta Syntax',
    desc: 'Control width and height per component block: ```aura width=800 height=400.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 bg-violet-glow pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

        {/* Floating sparkles */}
        <Sparkle className="absolute top-28 left-[12%] text-3xl opacity-60 animate-pulse" />
        <Sparkle className="absolute top-44 right-[8%] text-5xl opacity-40" />
        <Sparkle className="absolute bottom-32 left-[6%] text-xl opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="font-grotesk text-xs tracking-[0.25em] uppercase text-violet-400 mb-8">
            Elevate your documentation
          </p>

          {/* Main heading */}
          <h1 className="font-serif italic font-black text-[clamp(4rem,14vw,10rem)] leading-[0.9] mb-8 text-gradient-bright">
            readme-aura
          </h1>

          {/* Subtitle */}
          <p className="text-ink-secondary text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            A celestial documentation framework for the modern developer. Where code meets editorial elegance.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/docs"
              className="px-7 py-3 bg-violet-500 hover:bg-violet-400 text-white font-grotesk font-500 text-sm rounded-full transition-all duration-200 glow-violet"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/collectioneur/readme-aura"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-surface-high hover:bg-surface-highest text-ink-bright font-grotesk font-500 text-sm rounded-full transition-all duration-200"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Code block */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface-high rounded-2xl p-6 font-mono text-sm leading-7">
            <div className="flex gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
            </div>
            <div className="space-y-1">
              <div>
                <span className="text-ink-muted select-none">$ </span>
                <span className="text-violet-300">npx</span>
                <span className="text-ink-bright"> readme-aura </span>
                <span className="text-violet-400">init</span>
              </div>
              <div className="text-ink-muted text-xs pl-4">
                ✓ Created .github/workflows/readme-aura.yml
              </div>
              <div className="text-ink-muted text-xs pl-4">
                ✓ Created readme.source.md
              </div>
              <div className="mt-3">
                <span className="text-ink-muted select-none">$ </span>
                <span className="text-violet-300">npx</span>
                <span className="text-ink-bright"> readme-aura </span>
                <span className="text-violet-400">build</span>
              </div>
              <div className="text-ink-muted text-xs pl-4">
                ✓ Rendered 3 components → .github/assets/
              </div>
              <div className="text-ink-muted text-xs pl-4">
                ✓ Generated README.md
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-grotesk text-xs tracking-[0.2em] uppercase text-violet-400 mb-3">Foundation</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-ink-bright mb-6">How It Works</h2>
          <p className="text-ink-secondary mb-10 text-base leading-relaxed max-w-lg">
            GitHub strips all JS and CSS from README files. readme-aura bypasses that by compiling your designs into static SVG images at build time.
          </p>
          <ol className="space-y-5">
            {[
              ['Run init', 'npx readme-aura init — creates the GitHub Actions workflow, source template, and audits .gitignore'],
              ['Write JSX', 'Edit readme.source.md — add React components inside ```aura code blocks'],
              ['Preview locally', 'npx readme-aura build — JSX gets rendered to SVG via Vercel Satori'],
              ['Push & automate', 'Push to main — the GitHub Action auto-generates your README.md on every push'],
            ].map(([step, desc], i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-surface-highest flex items-center justify-center font-grotesk text-xs text-violet-300 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-ink-bright font-medium mb-0.5">{step}</p>
                  <p className="text-ink-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-grotesk text-xs tracking-[0.2em] uppercase text-violet-400 mb-3">Capabilities</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-ink-bright">
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-surface-low rounded-2xl p-6 hover:bg-surface transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-violet-400 text-lg mb-5 group-hover:bg-violet-500/10 transition-colors">
                  {f.icon}
                </div>
                <p className="font-grotesk text-xs tracking-widest uppercase text-violet-400 mb-2">{f.label}</p>
                <h3 className="font-serif italic text-xl text-ink-bright mb-2">{f.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24">
        <div className="absolute inset-0 bg-violet-glow-center pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <Sparkle className="text-4xl mb-6 block opacity-60" />
          <h2 className="font-serif italic font-black text-[clamp(3rem,10vw,7rem)] leading-[0.95] text-gradient-bright mb-6">
            Ready to evolve?
          </h2>
          <p className="font-grotesk text-xs tracking-[0.2em] uppercase text-violet-400 mb-10">
            Step into the neon scriptorium
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/readme-aura"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-violet-500 hover:bg-violet-400 text-white font-grotesk text-sm rounded-full transition-all duration-200 glow-violet"
            >
              Install via npm
            </a>
            <Link
              to="/docs"
              className="px-7 py-3 bg-surface-high hover:bg-surface-highest text-ink-bright font-grotesk text-sm rounded-full transition-all duration-200"
            >
              Read the Archive
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

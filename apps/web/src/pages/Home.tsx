import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MorphingCrystal } from '../components/MorphingCrystal';

const features = [
  {
    icon: '⬡',
    label: 'JSX',
    title: 'React Components',
    desc: 'Write real JSX with style objects - flexbox, gradients, shadows - right inside your README.',
  },
  {
    icon: '◈',
    label: 'SVG',
    title: 'Pixel-Perfect Output',
    desc: "Vercel's Satori renders JSX to crisp SVG at build time. Gradients, shadows, rounded corners.",
  },
  {
    icon: '✺',
    label: 'Fonts',
    title: 'Custom Typography',
    desc: 'Inter is bundled by default. Bring your own typefaces via --fonts-dir for full editorial control.',
  },
  {
    icon: '◎',
    label: 'Zero Runtime',
    title: 'GitHub-Compatible',
    desc: 'Output is pure Markdown + SVG. No scripts, no iframes - works anywhere Markdown renders.',
  },
  {
    icon: '⟳',
    label: 'Motion',
    title: 'CSS Animations',
    desc: 'Add @keyframes via <style> injection. Satori renders a static frame; browsers animate the SVG.',
  },
  {
    icon: '◼',
    label: 'CI',
    title: 'GitHub Actions',
    desc: 'Auto-rebuild on push. The included workflow regenerates your README.md on every commit.',
  },
];

export default function Home() {
  const [wide500, setWide500] = useState(window.innerWidth > 500);
  const [wide776, setWide776] = useState(window.innerWidth > 776);

  useEffect(() => {
    const onResize = () => {
      setWide500(window.innerWidth > 500);
      setWide776(window.innerWidth > 776);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="min-h-screen bg-surface-base overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-32 px-6">
        {/* Background orbs */}
        <div className="absolute inset-0 bg-teal-glow pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-teal-500/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-[20%] w-[300px] h-[300px] rounded-full bg-teal-400/[0.06] blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="font-grotesk text-xs tracking-[0.28em] uppercase text-teal-400 mb-8">
            Elevate your documentation
          </p>

          {/* Main heading — Inter, liquid glass */}
          <div className="mb-8 flex-wrap justify-center">
            <MorphingCrystal
              text="readme-"
              font={{
                family: 'Inter',
                size: wide776 ? 150 : 80,
                weight: 900,
              }}
              cloudDensity={0.7}
              cloudSpeed={0.2}
              cloudContrast={1.5}
              dynamicity={1.5}
              turbulence={2.0}
              thickness={0.1}
              edgeSoftness={3.0}
              parallaxIntensity={0.1}
              distortionStrength={2.0}
              noiseScale={1.0}
              padding={{
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
              }}
            />
            <MorphingCrystal
              text="aura"
              font={{
                family: 'Inter',
                size: wide776 ? 150 : 80,
                weight: 900,
              }}
              cloudDensity={0.7}
              cloudSpeed={0.2}
              cloudContrast={1.5}
              dynamicity={1.5}
              turbulence={2.0}
              thickness={0.1}
              edgeSoftness={3.0}
              parallaxIntensity={0.1}
              distortionStrength={4.0}
              noiseScale={1.0}
              padding={{
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
              }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-ink-secondary text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Write JSX, compile to SVG, ship beautiful README files - with a single CLI command.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/docs"
              className="px-7 py-3 bg-teal-500 hover:bg-teal-400 text-white font-grotesk font-medium text-sm rounded-full transition-all duration-200 glow-teal"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/collectioneur/readme-aura"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-surface-high hover:bg-surface-highest text-ink-bright font-grotesk font-medium text-sm rounded-full transition-all duration-200 border border-white/[0.08]"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Code block */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="card-glass rounded-2xl p-6 font-mono text-sm leading-7">
            <div className="flex gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
              <span className="w-3 h-3 rounded-full bg-surface-highest" />
            </div>
            <div className="space-y-1">
              <div>
                <span className="text-ink-muted select-none">$ </span>
                <span className="text-teal-300">npx</span>
                <span className="text-ink-bright"> readme-aura </span>
                <span className="text-emerald-400">init</span>
              </div>
              <div className="text-ink-muted text-xs pl-4">
                <span className="text-emerald-400">✓</span> Created
                .github/workflows/readme-aura.yml
              </div>
              <div className="text-ink-muted text-xs pl-4">
                <span className="text-emerald-400">✓</span> Created readme.source.md
              </div>
              <div className="mt-3">
                <span className="text-ink-muted select-none">$ </span>
                <span className="text-teal-300">npx</span>
                <span className="text-ink-bright"> readme-aura </span>
                <span className="text-emerald-400">build</span>
              </div>
              <div className="text-ink-muted text-xs pl-4">
                <span className="text-emerald-400">✓</span> Rendered 3 components → .github/assets/
              </div>
              <div className="text-ink-muted text-xs pl-4">
                <span className="text-emerald-400">✓</span> Generated README.md
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="font-grotesk text-xs tracking-[0.22em] uppercase text-teal-400 mb-3">
              How It Works
            </p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-gradient-bright tracking-tight mb-5">
              Three steps to ship
            </h2>
            <p className="text-ink-secondary text-base leading-relaxed max-w-lg">
              GitHub strips all JS and CSS from README files. readme-aura bypasses that by compiling
              designs into static SVGs at build time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: 'STEP 1',
                title: 'Write JSX',
                desc: 'Edit readme.source.md - add React components inside ```aura code blocks with style objects',
                code: '```aura\n<Card />\n```',
              },
              {
                step: 'STEP 2',
                title: 'Build',
                code: '$ readme-aura build',
                desc: 'Satori renders JSX to SVG',
              },
              {
                step: 'STEP 3',
                title: 'Deploy',
                desc: 'README.md with images - works on any GitHub repo',
                extra: 'Works on any GitHub repo',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-white/[0.12] transition-all duration-200"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/[0.05] rounded-full blur-2xl pointer-events-none" />
                <p className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-teal-400/70 mb-3">
                  {item.step}
                </p>
                <h3 className="font-sans font-bold text-xl text-ink-bright mb-3 tracking-tight">
                  {item.title}
                </h3>
                {item.code && (
                  <p className="font-mono text-xs text-emerald-400 mb-3 bg-surface-base/60 rounded-lg px-3 py-2 inline-block">
                    {item.code}
                  </p>
                )}
                <p className="text-ink-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="px-6 pb-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-grotesk text-xs tracking-[0.22em] uppercase text-teal-400 mb-3">
              Capabilities
            </p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-gradient-bright tracking-tight pb-1">
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="card-glass rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/[0.04] rounded-full blur-xl pointer-events-none group-hover:bg-teal-500/[0.08] transition-all duration-300" />
                <p className="font-grotesk text-xs tracking-widest uppercase text-teal-400 mb-2">
                  {f.label}
                </p>
                <h3 className="font-sans font-bold text-lg text-ink-bright mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-28">
        <div className="absolute inset-0 bg-teal-glow-center pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="mb-8 flex-wrap justify-center">
            <MorphingCrystal
              text="Ready "
              font={{
                family: 'Inter',
                size: wide500 ? 100 : 76,
                weight: 900,
              }}
              cloudDensity={0.7}
              cloudSpeed={0.2}
              cloudContrast={1.5}
              dynamicity={1.5}
              turbulence={2.0}
              thickness={0.1}
              edgeSoftness={3.0}
              parallaxIntensity={0.1}
              distortionStrength={2.0}
              padding={{
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 10,
              }}
              noiseScale={1.0}
            />
            <MorphingCrystal
              text="to build?"
              font={{
                family: 'Inter',
                size: wide500 ? 100 : 76,
                weight: 900,
              }}
              cloudDensity={0.7}
              cloudSpeed={0.2}
              cloudContrast={1.5}
              dynamicity={1.5}
              turbulence={2.0}
              thickness={0.1}
              edgeSoftness={3.0}
              parallaxIntensity={0.1}
              distortionStrength={2.0}
              padding={{
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 10,
              }}
              noiseScale={1.0}
            />
          </div>
          <p className="font-grotesk text-xs tracking-[0.22em] uppercase text-teal-400 mb-10">
            Ship beautiful READMEs in minutes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/readme-aura"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-teal-500 hover:bg-teal-400 text-white font-grotesk text-sm rounded-full transition-all duration-200 glow-teal"
            >
              Install via npm
            </a>
            <Link
              to="/docs"
              className="px-7 py-3 bg-surface-high hover:bg-surface-highest text-ink-bright font-grotesk text-sm rounded-full transition-all duration-200 border border-white/[0.08]"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

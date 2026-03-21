import { Link, useLocation } from 'react-router-dom'
import logoSrc from '../assets/readme-aura-logo.png'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 surface-glass border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logoSrc}
            alt="readme-aura"
            className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
          />
          <span className="font-sans font-semibold text-ink-bright tracking-tight text-sm hidden sm:block">
            readme-aura
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/docs"
            className={`text-sm font-grotesk tracking-widest uppercase transition-colors ${
              location.pathname === '/docs' ? 'text-teal-300' : 'text-ink-secondary hover:text-ink-bright'
            }`}
          >
            Docs
          </Link>
          <a
            href="#features"
            className="text-sm font-grotesk tracking-widest uppercase text-ink-secondary hover:text-ink-bright transition-colors"
          >
            Features
          </a>
          <a
            href="https://github.com/collectioneur/readme-aura"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-grotesk tracking-widest uppercase text-ink-secondary hover:text-ink-bright transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

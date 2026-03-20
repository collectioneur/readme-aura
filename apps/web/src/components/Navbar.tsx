import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 surface-glass border-b border-surface-high">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-grotesk font-600 text-ink-bright tracking-tight text-sm">
          readme-aura
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/docs"
            className={`text-sm font-grotesk tracking-widest uppercase transition-colors ${
              location.pathname === '/docs' ? 'text-violet-300' : 'text-ink-secondary hover:text-ink-bright'
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

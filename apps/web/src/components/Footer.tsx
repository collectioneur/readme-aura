import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-grotesk text-ink-muted text-sm tracking-tight">readme-aura</span>

          <div className="flex items-center gap-8 text-sm font-grotesk text-ink-muted">
            <Link to="/docs" className="hover:text-teal-300 transition-colors">Docs</Link>
            <a
              href="https://github.com/collectioneur/readme-aura"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/collectioneur/readme-aura/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              MIT License
            </a>
          </div>

          <span className="font-grotesk text-ink-muted text-sm">
            © {new Date().getFullYear()} readme-aura
          </span>
        </div>
      </div>
    </footer>
  )
}

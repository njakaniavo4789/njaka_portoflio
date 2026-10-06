import { profile, sections } from '../data/profile'

const YEAR = new Date().getFullYear()

export default function Footer() {

  return (
    <footer className="border-t border-[rgba(244,238,229,.12)]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-12 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <img
              src={profile.logo}
              alt={profile.logoText}
              width="2000"
              height="2000"
              className="h-20 w-20 rounded-full object-cover ring-1 ring-[rgba(244,238,229,.2)] md:h-24 md:w-24"
            />

            <div className="mt-5 text-[11px] track text-cream">
              {profile.logoText}
            </div>

            <div className="mt-2 text-[9px] track-sm text-[rgba(244,238,229,.35)]">
              © {YEAR} — TOUS DROITS RÉSERVÉS
            </div>
          </div>

          <nav className="flex flex-wrap gap-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-[9px] track-sm text-[rgba(244,238,229,.45)] transition-colors duration-300 hover:text-cream"
              >
                {section.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex cursor-pointer items-center gap-2 text-[9px] track-sm text-[rgba(244,238,229,.45)] transition-colors duration-300 hover:text-cream"
          >
            <span className="text-ember">↑</span> HAUT DE PAGE
          </button>
        </div>
      </div>
    </footer>
  )
}

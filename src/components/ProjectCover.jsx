/* =========================================================
   PROJECT COVER
   → affiche la capture d'écran si `cover` est renseigné,
     sinon un faux cadre de navigateur avec le domaine
========================================================= */

export default function ProjectCover({ project, children, className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {project.cover ? (
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full flex-col bg-[radial-gradient(ellipse_at_50%_0%,#1d1a15_0%,#0e0c0a_70%)]">
          {/* Browser chrome */}
          <div className="flex shrink-0 items-center gap-1.5 border-b border-[rgba(244,238,229,.12)] bg-[rgba(0,0,0,.35)] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(244,238,229,.2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(244,238,229,.2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />

            <span className="ml-2 truncate text-[8px] tracking-[.05em] text-[rgba(244,238,229,.4)]">
              {project.domain}
            </span>
          </div>

          {/* Monogram */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-14 w-14 rotate-45 items-center justify-center border border-ember/50 max-md:h-10 max-md:w-10">
              <span className="-rotate-45 text-[16px] font-light tracking-[-.05em] text-cream max-md:text-[12px]">
                {project.title.charAt(0)}
              </span>
            </span>

            <span className="text-[11px] tracking-[.18em] text-[rgba(244,238,229,.5)]">
              {project.domain}
            </span>

            <span className="text-[8px] tracking-[.25em] text-ember/80">
              EN LIGNE
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}

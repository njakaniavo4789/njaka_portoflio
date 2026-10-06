import ProjectCover from './ProjectCover'
import { profile } from '../data/profile'

export default function ProjectModal({ project, index, onClose }) {
  if (!project) return null

  const number = String(index + 1).padStart(3, '0')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="animate-modal-in fixed inset-0 z-[500] overflow-auto bg-ink"
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-[25px] right-[35px] z-20 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#0b0907]/60 text-[20px] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
      >
        &times;
      </button>

      <div className="mx-auto w-[min(1250px,90%)] py-[100px]">
        <div className="text-[8px] track text-[rgba(244,238,229,.48)]">
          PROJET {number}
        </div>

        <h1 className="mb-[70px] text-[clamp(50px,9vw,130px)] leading-[.78] font-light tracking-[-.08em]">
          {project.title}
        </h1>

        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden border border-[rgba(244,238,229,.15)]">
          <ProjectCover project={project} />
        </div>

        <div className="mt-[70px] grid grid-cols-1 gap-[50px] md:grid-cols-[1fr_2fr] md:gap-[100px]">
          <div className="flex flex-col gap-[25px]">
            {[
              ['ANNÉE', project.year],
              ['TYPE', project.category],
              ['HÉBERGEMENT', project.domain],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-t border-[rgba(244,238,229,.18)] pt-[10px]"
              >
                <small className="mb-2 block text-[8px] track-sm text-[rgba(244,238,229,.48)]">
                  {label}
                </small>
                <span className="break-words text-[12px]">{value}</span>
              </div>
            ))}

            {project.stack.length > 0 && (
              <div className="border-t border-[rgba(244,238,229,.18)] pt-[10px]">
                <small className="mb-3 block text-[8px] track-sm text-[rgba(244,238,229,.48)]">
                  TECHNOLOGIES
                </small>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[rgba(244,238,229,.2)] px-2 py-1 text-[9px] text-[rgba(244,238,229,.65)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 w-fit cursor-pointer border border-cream bg-cream px-6 py-4 text-[9px] track-sm text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream"
            >
              VISITER LE SITE ↗
            </a>
          </div>

          <div>
            <p className="text-[18px] leading-[1.9] text-white/65">
              {project.description}
            </p>

            <div className="mt-10 text-[9px] track-sm text-[rgba(244,238,229,.4)]">
              RÉALISÉ PAR {profile.name.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

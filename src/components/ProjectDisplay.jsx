export default function ProjectDisplay({ project }) {
  const meta = [project.year, project.subtitle, project.category].filter(
    Boolean,
  )

  return (
    <div className="pointer-events-none absolute bottom-[78px] left-1/2 z-50 w-[560px] max-w-[86%] -translate-x-1/2 text-center">
      <div className="mb-[15px] text-[8px] track text-[rgba(244,238,229,.45)]">
        PROJET ACTUEL
      </div>

      <div className="text-[clamp(30px,4.5vw,64px)] leading-[.85] font-light tracking-[-.07em]">
        {project.title}
      </div>

      <div className="mt-[18px] flex flex-wrap justify-center gap-x-[26px] gap-y-2 text-[8px] track-sm text-[rgba(244,238,229,.45)]">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-7 inline-flex cursor-pointer items-center gap-2 border border-[rgba(244,238,229,.3)] px-6 py-3 text-[9px] track-sm text-cream transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-ink"
      >
        VOIR LE SITE <span>&#8599;</span>
      </a>
    </div>
  )
}

import ProjectCover from './ProjectCover'

export default function Frame({
  project,
  index,
  isActive,
  onSelect,
  onOpen,
  frameRef,
}) {
  const number = String(index + 1).padStart(3, '0')

  return (
    <article
      ref={frameRef}
      onClick={() => (isActive ? onOpen(index) : onSelect(index))}
      className={`group relative h-[230px] w-[340px] shrink-0 cursor-pointer border-[3px] border-[#17130f] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,.6)] transition-[transform,opacity] duration-500 ease-out md:h-[270px] md:w-[400px] ${
        isActive ? 'z-20 scale-[1.18] -translate-y-3' : 'opacity-100'
      }`}
      style={{ marginLeft: 20, marginRight: 20 }}
    >
      {/* Sprocket holes */}
      <span
        aria-hidden="true"
        className="holes pointer-events-none absolute left-1/2 z-[5] h-[22px] w-[calc(100%+20px)] -translate-x-1/2"
        style={{ top: -31 }}
      />
      <span
        aria-hidden="true"
        className="holes pointer-events-none absolute left-1/2 z-[5] h-[22px] w-[calc(100%+20px)] -translate-x-1/2"
        style={{ bottom: -31 }}
      />

      {/* Cover */}
      <ProjectCover
        project={project}
        className={`transition-[transform,filter] duration-1000 ease-out group-hover:scale-[1.04] ${
          isActive ? 'brightness-110' : ''
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,.9))',
          }}
        />
      </ProjectCover>

      {/* Info */}
      <div className="absolute right-5 bottom-[18px] left-5 z-10">
        <div className="mb-[7px] text-[8px] track text-white/55">
          PROJET {number}
        </div>

        <div className="text-[25px] tracking-[-.05em] text-cream">
          {project.title}
        </div>

        <div className="mt-1.5 text-[8px] track-sm text-white/50">
          {project.category}
        </div>
      </div>

      {/* Direct link */}
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Ouvrir ${project.title} (nouvel onglet)`}
        title={project.domain}
        className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center border border-white/30 bg-[#0b0907]/60 text-[13px] text-cream opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-ember hover:bg-ember hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
      >
        &#8599;
      </a>
    </article>
  )
}

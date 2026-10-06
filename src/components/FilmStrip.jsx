import Frame from './Frame'
import { projects } from '../data/projects'

export default function FilmStrip({
  activeIndex,
  onSelect,
  onOpen,
  firstFrameRef,
}) {
  return (
    <>
      {/* Film edge band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[410px] w-[400vw] -translate-x-1/2 -translate-y-1/2 border-y-2 border-[#29231b] bg-[#15120e]"
      />

      {/* Frames */}
      <div
        id="film-track"
        className="absolute top-1/2 left-1/2 flex h-[230px] items-center md:h-[410px]"
      >
        {projects.map((project, index) => (
          <Frame
            key={project.title}
            frameRef={index === 0 ? firstFrameRef : undefined}
            project={project}
            index={index}
            isActive={index === activeIndex}
            onSelect={onSelect}
            onOpen={onOpen}
          />
        ))}
      </div>
    </>
  )
}

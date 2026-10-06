import { useCallback, useEffect, useRef, useState } from 'react'

import SectionHeader from '../components/SectionHeader'
import FilmStrip from '../components/FilmStrip'
import Counter from '../components/Counter'
import { CenterMarker, Instructions, Perforations } from '../components/Decor'
import ProjectDisplay from '../components/ProjectDisplay'
import BottomHud from '../components/BottomHud'
import ProjectModal from '../components/ProjectModal'

import { projects } from '../data/projects'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [inView, setInView] = useState(false)

  const sectionRef = useRef(null)
  const reelRef = useRef(null)
  const firstFrameRef = useRef(null)

  const position = useRef(0)
  const target = useRef(0)

  const dragStart = useRef(0)
  const dragOrigin = useRef(0)
  const moved = useRef(false)
  const isDraggingRef = useRef(false)

  /* =========================================================
     FRAME STEP
  ========================================================= */

  const frameStep = useCallback(() => {
    const frame = firstFrameRef.current
    if (!frame) return 440

    return frame.offsetWidth + 40
  }, [])

  /* =========================================================
     ANIMATION LOOP
  ========================================================= */

  useEffect(() => {
    let raf

    const loop = () => {
      position.current += (target.current - position.current) * 0.09

      const film = document.getElementById('film-track')

      if (film) {
        film.style.transform = `translate(calc(-50% + ${position.current}px), -50%)`
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(raf)
  }, [])

  /* =========================================================
     SELECT FRAME
  ========================================================= */

  const selectFrame = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, index))

      setActiveIndex(clamped)
      target.current = -clamped * frameStep()
    },
    [frameStep],
  )

  /* Re-align when the responsive frame size changes */
  useEffect(() => {
    const onResize = () => {
      target.current = -activeIndex * frameStep()
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [activeIndex, frameStep])

  /* =========================================================
     IN VIEW (gates scroll capture + keyboard)
  ========================================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nextFrame = useCallback(() => {
    if (activeIndex < projects.length - 1) selectFrame(activeIndex + 1)
  }, [activeIndex, selectFrame])

  const previousFrame = useCallback(() => {
    if (activeIndex > 0) selectFrame(activeIndex - 1)
  }, [activeIndex, selectFrame])

  /* =========================================================
     WHEEL — captured on the reel only, so the page
     still scrolls normally everywhere else
  ========================================================= */

  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return

    const onWheel = (event) => {
      if (openIndex !== null) return

      event.preventDefault()

      if (Math.abs(event.deltaY) < 2) return

      if (event.deltaY > 0) nextFrame()
      else previousFrame()
    }

    reel.addEventListener('wheel', onWheel, { passive: false })

    return () => reel.removeEventListener('wheel', onWheel)
  }, [openIndex, nextFrame, previousFrame])

  /* =========================================================
     KEYBOARD — only while the reel is on screen
  ========================================================= */

  useEffect(() => {
    const onKeyDown = (event) => {
      if (openIndex !== null) {
        if (event.key === 'Escape') setOpenIndex(null)
        return
      }

      if (!inView) return

      if (event.key === 'ArrowRight') nextFrame()
      if (event.key === 'ArrowLeft') previousFrame()
      if (event.key === 'Enter') setOpenIndex(activeIndex)
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex, inView, activeIndex, nextFrame, previousFrame])

  /* =========================================================
     DRAG / SWIPE
  ========================================================= */

  const onPointerDown = (event) => {
    isDraggingRef.current = true
    setIsDragging(true)
    moved.current = false
    dragStart.current = event.clientX
    dragOrigin.current = target.current
  }

  const onPointerMove = (event) => {
    if (!isDraggingRef.current) return

    const difference = event.clientX - dragStart.current

    if (Math.abs(difference) > 4) moved.current = true

    target.current = dragOrigin.current + difference

    const closest = Math.max(
      0,
      Math.min(
        projects.length - 1,
        Math.round(-target.current / frameStep()),
      ),
    )

    setActiveIndex(closest)
  }

  const endDrag = () => {
    if (!isDraggingRef.current) return

    isDraggingRef.current = false
    setIsDragging(false)
    selectFrame(activeIndex)
  }

  /* =========================================================
     CLICK FRAME
  ========================================================= */

  const handleFrameOpen = useCallback(
    (index) => {
      /* Ignore the click generated at the end of a drag */
      if (moved.current) {
        moved.current = false
        return
      }

      if (index === activeIndex) setOpenIndex(index)
      else selectFrame(index)
    },
    [activeIndex, selectFrame],
  )

  const project = projects[activeIndex]

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="relative border-t border-[rgba(244,238,229,.12)] py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="02"
          label="PROJETS"
          title="RÉALISATIONS"
          intro="Trois applications en ligne. Faites défiler la pellicule ou utilisez les flèches du clavier, puis cliquez sur un projet pour le détail."
        />

        {/* Reel stage */}
        <div
          className="relative isolate h-[520px] w-full overflow-hidden md:h-[600px]"
          style={{
            background:
              'radial-gradient(ellipse at center, #262019 0%, #120e0a 42%, #070605 100%)',
          }}
        >
          <Counter current={activeIndex} total={projects.length} />

          <Instructions />

          <div
            ref={reelRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`absolute top-1/2 left-1/2 h-[460px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-3 max-md:scale-70 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            <FilmStrip
              activeIndex={activeIndex}
              onSelect={selectFrame}
              onOpen={handleFrameOpen}
              firstFrameRef={firstFrameRef}
            />

            <div className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 text-[8px] tracking-[.4em] text-white/25 md:block">
                <span className="absolute left-[-180px]">VÉRITÉS EN LIGNE</span>
                <span className="absolute right-[-180px]">DÉJÀ DÉPLOYÉES</span>
            </div>
          </div>

          <Perforations />

          <CenterMarker />

          <ProjectDisplay project={project} />

          {/* Prev / next */}
          <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
            <button
              onClick={previousFrame}
              disabled={activeIndex === 0}
              aria-label="Film précédent"
              className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[rgba(244,238,229,.25)] text-[13px] text-cream transition-colors hover:border-cream disabled:cursor-not-allowed disabled:opacity-25"
            >
              &#8592;
            </button>

            <div className="flex gap-1.5">
              {projects.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => selectFrame(index)}
                  aria-label={`Aller à ${item.title}`}
                  className={`h-1 cursor-pointer transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 bg-ember'
                      : 'w-1.5 bg-[rgba(244,238,229,.3)] hover:bg-cream'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextFrame}
              disabled={activeIndex === projects.length - 1}
              aria-label="Film suivant"
              className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[rgba(244,238,229,.25)] text-[13px] text-cream transition-colors hover:border-cream disabled:cursor-not-allowed disabled:opacity-25"
            >
              &#8594;
            </button>
          </div>

          <BottomHud index={activeIndex} total={projects.length} />
        </div>
      </div>

      <ProjectModal
        project={openIndex !== null ? projects[openIndex] : null}
        index={openIndex ?? 0}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}

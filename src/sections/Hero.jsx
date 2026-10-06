import { useEffect, useState } from 'react'

import { profile } from '../data/profile'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))

    return () => cancelAnimationFrame(id)
  }, [])

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[.22]"
        style={{
          backgroundImage: `url('${profile.portrait}')`,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0b0907 0%, rgba(11,9,7,.72) 45%, #0b0907 100%)',
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full px-5 pt-32 pb-24 md:px-10 ${
          visible ? 'animate-rise' : 'opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Eyebrow */}
          <div
            className={`mb-8 text-[9px] track-lg text-[rgba(244,238,229,.48)] ${
              visible ? 'animate-rise' : 'opacity-0'
            }`}
            style={{ animationDelay: '.1s' }}
          >
            <span className="text-ember">●</span> {profile.role}
          </div>

          {/* Name */}
          <h1
            className={`text-[clamp(60px,13vw,210px)] leading-[.82] font-light tracking-[-.07em] ${
              visible ? 'animate-rise' : 'opacity-0'
            }`}
            style={{ animationDelay: '.18s' }}
          >
            {profile.name}
          </h1>

          {/* Rule */}
          <div
            className={`mt-10 h-px w-full max-w-[520px] bg-[rgba(244,238,229,.25)] ${
              visible ? 'animate-line' : ''
            }`}
            style={{ animationDelay: '.3s' }}
          />

          <div className="mt-10 grid max-w-[1100px] gap-12 md:grid-cols-[1.4fr_1fr]">
            <p
              className={`text-[clamp(16px,2vw,26px)] leading-[1.5] font-light text-[rgba(244,238,229,.8)] ${
                visible ? 'animate-rise' : 'opacity-0'
              }`}
              style={{ animationDelay: '.38s' }}
            >
              {profile.tagline}
            </p>

            <div
              className={`flex flex-col gap-6 ${
                visible ? 'animate-rise' : 'opacity-0'
              }`}
              style={{ animationDelay: '.46s' }}
            >
              <p className="text-[14px] leading-[1.9] text-[rgba(244,238,229,.55)]">
                {profile.intro}
              </p>

              <div className="text-[9px] track-sm text-[rgba(244,238,229,.4)]">
                {profile.location}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div
            className={`mt-14 flex flex-wrap items-center gap-4 ${
              visible ? 'animate-rise' : 'opacity-0'
            }`}
            style={{ animationDelay: '.54s' }}
          >
            <button
              onClick={() => go('projets')}
              className="cursor-pointer border border-cream bg-cream px-8 py-4 text-[10px] track-sm text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream"
            >
              VOIR LES PROJETS
            </button>

            <button
              onClick={() => go('contact')}
              className="cursor-pointer border border-[rgba(244,238,229,.3)] px-8 py-4 text-[10px] track-sm text-cream transition-colors duration-300 hover:border-cream"
            >
              ME CONTACTER
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 ${
          visible ? 'animate-rise' : 'opacity-0'
        }`}
        style={{ animationDelay: '.7s' }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] track text-[rgba(244,238,229,.35)]">
            SCROLL
          </span>

          <span className="relative block h-10 w-px overflow-hidden bg-[rgba(244,238,229,.2)]">
            <span className="absolute inset-x-0 top-0 h-4 animate-[lineGrow_1.8s_ease-in-out_infinite] bg-ember" />
          </span>
        </div>
      </div>
    </section>
  )
}

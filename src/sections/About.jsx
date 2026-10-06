import { useEffect, useRef, useState } from 'react'

import SectionHeader from '../components/SectionHeader'
import { AboutDeco } from '../components/Decor'
import { profile } from '../data/profile'

/* Education entry on a vertical timeline */
function Education({ period, degree, school, schoolShort, visible, delay }) {
  return (
    <div
      className="relative grid grid-cols-[92px_1fr] gap-x-5 md:grid-cols-[130px_1fr] md:gap-x-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition:
          'opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Period */}
      <div className="pb-8 text-[10px] track-sm text-ember">{period}</div>

      {/* Marker on the timeline */}
      <span className="absolute top-[5px] left-[100px] h-[7px] w-[7px] -translate-x-1/2 rotate-45 border border-ember bg-ink md:left-[138px]" />

      {/* Content */}
      <div className="border-t border-[rgba(244,238,229,.15)] pb-8 pl-6 md:pl-8">
        <div className="pt-5 text-[15px] leading-[1.5] text-[rgba(244,238,229,.9)]">
          {degree}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] track-sm text-[rgba(244,238,229,.45)]">
          <span className="border border-[rgba(244,238,229,.2)] px-2 py-1">
            {schoolShort}
          </span>

          <span>{school}</span>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const { about } = profile

  return (
    <section
      id="a-propos"
      ref={sectionRef}
      className="relative border-t border-[rgba(244,238,229,.12)] py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="01"
          label="À PROPOS"
          title="MOI"
          intro={about.paragraphs[0]}
        />

        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          {/* Portrait */}
          <div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#15120e]">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  loading="lazy"
                  width="3264"
                  height="2448"
                  className="h-full w-full object-cover"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 55%, rgba(0,0,0,.75))',
                  }}
                />
              </div>

              <span className="pointer-events-none absolute -top-px -left-px h-6 w-6 border-t border-l border-ember" />
              <span className="pointer-events-none absolute -right-px -bottom-px h-6 w-6 border-r border-b border-ember" />
            </div>

            <AboutDeco />
          </div>

          {/* Text + education */}
          <div>
            {about.paragraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="mb-6 text-[16px] leading-[2] text-[rgba(244,238,229,.65)] last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-14">
              <div className="mb-8 text-[8px] track text-[rgba(244,238,229,.4)]">
                ÉDUCATION
              </div>

              <div className="relative">
                {/* Timeline rail */}
                <span className="absolute top-0 left-[100px] h-[calc(100%-24px)] w-px -translate-x-1/2 bg-[rgba(244,238,229,.15)] md:left-[138px]" />

                {about.education.map((entry, index) => (
                  <Education
                    key={entry.period}
                    {...entry}
                    visible={visible}
                    delay={index * 140}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

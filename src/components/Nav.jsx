import { useEffect, useState } from 'react'

import { profile, sections } from '../data/profile'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(sections[0].id)
  const [open, setOpen] = useState(false)

  /* Background after the hero */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Highlight the section in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-[200] w-full transition-colors duration-500 ${
        scrolled
          ? 'border-b border-[rgba(244,238,229,.12)] bg-[#0b0907]/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <button
          onClick={() => go('accueil')}
          aria-label={profile.logoText}
          className="group cursor-pointer rounded-full"
        >
          <img
            src={profile.logo}
            alt={profile.logoText}
            width="2000"
            height="2000"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-[rgba(244,238,229,.2)] transition-all duration-500 group-hover:scale-105 group-hover:ring-ember md:h-12 md:w-12"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-[35px] text-[9px] track-sm text-[rgba(244,238,229,.48)] md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => go(section.id)}
              className={`cursor-pointer transition-colors duration-300 hover:text-cream ${
                active === section.id ? 'text-cream' : ''
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-5 bg-cream transition-transform duration-300 ${
              open ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-cream transition-transform duration-300 ${
              open ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-[rgba(244,238,229,.12)] transition-all duration-500 md:hidden ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="flex flex-col gap-5 px-5 py-6">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => go(section.id)}
              className={`cursor-pointer text-left text-[11px] track-sm transition-colors ${
                active === section.id
                  ? 'text-cream'
                  : 'text-[rgba(244,238,229,.48)]'
              }`}
            >
              <span className="mr-3 text-ember">
                {String(index + 1).padStart(2, '0')}
              </span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

/* Compact ornament, sits under the portrait in the About section */
export function AboutDeco() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-6 h-24 w-full overflow-hidden border border-[rgba(244,238,229,.12)] bg-[#0d0b09] md:h-28"
    >
      {/* Diagonal wash */}
      <span
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 45%, rgba(217,139,69,.16) 50%, transparent 55%)',
        }}
      />

      {/* Centre lozenge */}
      <span className="absolute top-1/2 left-1/2 block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-ember/50" />
      <span className="absolute top-1/2 left-1/2 block h-px w-20 -translate-x-1/2 -translate-y-1/2 bg-ember/35" />

      {/* Frame hairlines */}
      <span className="absolute top-[26px] right-0 left-0 h-px bg-[rgba(244,238,229,.12)]" />
      <span className="absolute right-0 bottom-[26px] left-0 h-px bg-[rgba(244,238,229,.12)]" />

      {/* Perforation runs */}
      <span className="holes-soft absolute top-0 left-0 h-[14px] w-full opacity-45" />
      <span className="holes-soft absolute bottom-0 left-0 h-[14px] w-full opacity-45" />

      {/* Corner brackets */}
      <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-[rgba(244,238,229,.35)]" />
      <span className="absolute top-2 right-2 h-3 w-3 border-t border-r border-[rgba(244,238,229,.35)]" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[rgba(244,238,229,.35)]" />
      <span className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-[rgba(244,238,229,.35)]" />
    </div>
  )
}

export function CenterMarker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 z-30 h-[100px] w-px -translate-x-1/2 -translate-y-1/2"
      style={{
        background: 'linear-gradient(transparent, #d98b45, transparent)',
      }}
    >
      <span
        className="absolute top-1/2 left-1/2 block h-[9px] w-[9px] border border-[#d98b45]"
        style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
      />
    </div>
  )
}

export function Perforations() {
  return (
    <>
      <div
        aria-hidden="true"
        className="holes-soft pointer-events-none absolute left-0 z-30 h-[22px] w-full opacity-90 max-md:hidden"
        style={{ top: 'calc(50% - 235px)' }}
      />
      <div
        aria-hidden="true"
        className="holes-soft pointer-events-none absolute left-0 z-30 h-[22px] w-full opacity-90 max-md:hidden"
        style={{ top: 'calc(50% + 213px)' }}
      />
    </>
  )
}

export function Instructions() {
  return (
    <div className="pointer-events-none absolute top-6 left-1/2 z-50 -translate-x-1/2 text-[8px] track whitespace-nowrap text-white/30 max-sm:hidden">
      DRAG / SCROLL TO EXPLORE THE REEL
    </div>
  )
}

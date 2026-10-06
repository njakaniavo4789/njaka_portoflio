export default function Counter({ current, total, label = 'PROJETS' }) {
  return (
    <div className="absolute top-[22%] left-5 z-50 -translate-y-1/2 md:top-1/2 md:left-8">
      <div className="text-[45px] leading-[.8] font-light tracking-[-.08em] md:text-[64px]">
        {String(current + 1).padStart(2, '0')}
      </div>

      <div className="mt-4 text-[9px] track text-[rgba(244,238,229,.45)]">
        / {String(total).padStart(2, '0')} {label}
      </div>
    </div>
  )
}

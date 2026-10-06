export default function SectionHeader({ index, label, title, intro }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4 text-[9px] track">
        <span className="text-ember">{index}</span>

        <span className="h-px w-10 bg-[rgba(244,238,229,.3)]" />

        <span className="text-[rgba(244,238,229,.55)]">{label}</span>
      </div>

      <h2 className="text-[clamp(40px,8vw,110px)] leading-[.85] font-light tracking-[-.07em]">
        {title}
      </h2>

      {intro && (
        <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.9] text-[rgba(244,238,229,.55)]">
          {intro}
        </p>
      )}
    </div>
  )
}

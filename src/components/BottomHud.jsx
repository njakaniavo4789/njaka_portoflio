export default function BottomHud({ index, total }) {
  const percentage = total > 1 ? (index / (total - 1)) * 100 : 0

  return (
    <div className="pointer-events-none absolute right-5 bottom-6 left-5 z-40 flex items-end justify-between md:right-8 md:left-8">
      <div className="text-[8px] track-sm text-[rgba(244,238,229,.4)]">
        <div>REEL / {String(index + 1).padStart(3, '0')}</div>

        <div className="mt-2 h-px w-[110px] bg-white/15 md:w-[180px]">
          <div
            className="h-full bg-cream transition-[width] duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="text-[8px] track-sm text-[rgba(244,238,229,.4)] max-sm:hidden">
        CLICK A FRAME TO ENTER
      </div>
    </div>
  )
}

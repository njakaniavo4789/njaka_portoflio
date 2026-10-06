import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let value = 0

    const interval = setInterval(() => {
      value += Math.random() * 12

      if (value >= 100) {
        value = 100
        clearInterval(interval)

        setTimeout(() => setHidden(true), 400)
      }

      setProgress(value)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-[18px] bg-[#080604] transition-opacity duration-1000 ${
        progress >= 100 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-[10px] track-lg">LOADING FILM</div>

      <div className="h-px w-[220px] bg-white/15">
        <div
          className="h-full bg-cream transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

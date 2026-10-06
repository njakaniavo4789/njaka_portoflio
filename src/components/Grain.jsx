export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="animate-grain pointer-events-none fixed -inset-1/2 z-[100] h-[200%] w-[200%] opacity-[.07]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

export function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80]"
      style={{
        background:
          'radial-gradient(ellipse, transparent 40%, rgba(0,0,0,.75) 100%)',
      }}
    />
  )
}

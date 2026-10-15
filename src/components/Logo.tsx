const NAVY = '#1d3461'

// Contorno con text-shadow (funciona en todos los navegadores): anillos de color alrededor de la letra
function ring(color: string, r: number, steps = 16) {
  return Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2
    return `${(Math.cos(a) * r).toFixed(1)}px ${(Math.sin(a) * r).toFixed(1)}px 0 ${color}`
  })
}
const outline = (inner?: string) =>
  [...(inner ? ring(inner, 2) : []), ...ring(NAVY, inner ? 4 : 3), `0 5px 0 ${NAVY}`].join(', ')

const KIDS = [
  { ch: 'K', color: '#fdb92e' },
  { ch: 'i', color: '#f7891e' },
  { ch: 'd', color: '#7dc243' },
  { ch: 's', color: '#ee4b7a' },
]

/** Logo "ELT for Kids" con los colores de la marca. */
export default function Logo() {
  return (
    <h1
      className="relative inline-flex items-center gap-1.5 rounded-2xl px-3 pb-2 pt-1 font-display text-[34px] font-extrabold leading-none sm:text-[42px]"
      style={{ background: '#45b6e8', boxShadow: `0 4px 0 ${NAVY}22` }}
      aria-label="ELT for Kids"
    >
      <span className="absolute -left-1 -top-2 text-lg" aria-hidden>✨</span>
      <span className="text-white" style={{ textShadow: outline() }} aria-hidden>
        ELT
      </span>
      <span
        className="relative mx-0.5 rounded-full px-1.5 py-1 font-body text-[13px] font-extrabold text-white sm:text-base"
        style={{ background: NAVY }}
        aria-hidden
      >
        for
        <span className="absolute -bottom-1 left-1.5 h-2.5 w-2.5 rotate-45" style={{ background: NAVY }} />
      </span>
      <span aria-hidden>
        {KIDS.map(({ ch, color }) => (
          <span key={ch} style={{ color, textShadow: outline('#fff') }}>
            {ch}
          </span>
        ))}
      </span>
    </h1>
  )
}

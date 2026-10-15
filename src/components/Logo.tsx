const NAVY = '#1d3461'

// Contorno con text-shadow (funciona en todos los navegadores): anillos de color alrededor de la letra
function ring(color: string, r: number, steps = 16) {
  return Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2
    return `${(Math.cos(a) * r).toFixed(1)}px ${(Math.sin(a) * r).toFixed(1)}px 0 ${color}`
  })
}
const outline = (k: number, inner?: string) =>
  [...(inner ? ring(inner, 1.6 * k) : []), ...ring(NAVY, (inner ? 3.2 : 2.6) * k), `0 ${2.5 * k}px 0 ${NAVY}`].join(', ')

const KIDS = [
  { ch: 'K', color: '#fdb92e' },
  { ch: 'i', color: '#f7891e' },
  { ch: 'd', color: '#7dc243' },
  { ch: 's', color: '#ee4b7a' },
]

/** Logo "ELT for Kids" con los colores de la marca. */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const k = size === 'sm' ? 0.75 : 1
  return (
    <span
      className={`relative inline-flex items-center rounded-2xl font-display font-extrabold ${
        size === 'sm' ? 'gap-1 px-2 py-1 text-[22px] sm:text-[26px]' : 'gap-1.5 px-3 py-1.5 text-[34px] sm:text-[42px]'
      }`}
      style={{ background: '#45b6e8', lineHeight: 1 }}
      role="img"
      aria-label="ELT for Kids"
    >
      {/* translate-y compensa el borde inferior del texto para que se vea centrado */}
      <span className="-translate-y-[1px] text-white" style={{ textShadow: outline(k) }} aria-hidden>
        ELT
      </span>
      <span
        className={`relative rounded-full font-body font-extrabold leading-none text-white ${size === 'sm' ? 'px-1 py-0.5 text-[10px] sm:text-[11px]' : 'mx-0.5 px-1.5 py-1 text-[13px] sm:text-base'}`}
        style={{ background: NAVY }}
        aria-hidden
      >
        for
        <span className="absolute -bottom-0.5 left-1 h-2 w-2 rotate-45" style={{ background: NAVY }} />
      </span>
      <span className="-translate-y-[1px]" aria-hidden>
        {KIDS.map(({ ch, color }) => (
          <span key={ch} style={{ color, textShadow: outline(k, '#fff') }}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  )
}

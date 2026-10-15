import type { Character } from '../content/types'

const COLORS: Record<Character['color'], [string, string]> = {
  green: ['#3f7d5a', '#2c5c41'],
  purple: ['#6d4bb3', '#4f3389'],
  orange: ['#f08a3c', '#c96a22'],
  blue: ['#5fa7b4', '#3f8290'],
  yellow: ['#f5b82e', '#d1951a'],
  brown: ['#8b5a2b', '#6b4220'],
  black: ['#333', '#111'],
  blond: ['#f2d06b', '#d4ae3f'],
  red: ['#e05555', '#b33a3a'],
  pink: ['#f08ab8', '#cc6995'],
}

/** Persona con traje de superhéroe: el pelo tiene el color del personaje. */
function Person({ c }: { c: Character }) {
  const [hair, hairDark] = COLORS[c.color]
  // tall = cuerpo largo; short = cuerpo corto
  const bodyH = c.size === 'big' ? 40 : 22
  const top = 96 - bodyH - 34
  const hx = 50
  const hy = top + 16
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {/* pelo de atrás */}
      <ellipse cx={hx} cy={hy - 2} rx="17" ry="17" fill={hair} />
      {/* cuerpo (traje rojo) */}
      <rect x="36" y={top + 30} width="28" height={bodyH} rx="9" fill="#e23b3b" />
      <circle cx="50" cy={top + 30 + Math.min(12, bodyH / 2)} r="5" fill="#f9c74f" />
      {/* cara */}
      <circle cx={hx} cy={hy + 2} r="13" fill="#f6c7a1" />
      {/* flequillo */}
      <path d={`M${hx - 14} ${hy - 2} Q${hx} ${hy - 22} ${hx + 14} ${hy - 2} Q${hx} ${hy - 8} ${hx - 14} ${hy - 2}`} fill={hairDark} />
      {/* antifaz */}
      <rect x={hx - 12} y={hy - 1} width="24" height="7" rx="3.5" fill="#1e1b2e" />
      <circle cx={hx - 5} cy={hy + 2.5} r="2" fill="#fff" />
      <circle cx={hx + 5} cy={hy + 2.5} r="2" fill="#fff" />
      {c.old && <path d={`M${hx - 6} ${hy + 10} Q${hx} ${hy + 7} ${hx + 6} ${hy + 10}`} stroke={hairDark} strokeWidth="2.5" fill="none" />}
      {c.cute && (
        <>
          <ellipse cx={hx - 8} cy={hy + 9} rx="3" ry="2" fill="#ff9aa2" />
          <ellipse cx={hx + 8} cy={hy + 9} rx="3" ry="2" fill="#ff9aa2" />
        </>
      )}
      <path d={`M${hx - 4} ${hy + 11} Q${hx} ${hy + 14} ${hx + 4} ${hy + 11}`} stroke="#1e1b2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Monstruo simple dibujado en SVG, según color, tamaño y edad. */
export default function Monster({ c }: { c: Character }) {
  if (c.person) return <Person c={c} />
  const [fill, dark] = COLORS[c.color]
  const scale = c.size === 'big' ? 1 : c.size === 'small' ? 0.72 : 0.86
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      <g transform={`translate(50 ${100 - 100 * scale * 0.5}) scale(${scale}) translate(-50 -50)`}>
        {/* pelo / cuernos */}
        <path d="M30 22 Q28 6 38 12 M50 18 Q50 2 58 10 M68 22 Q74 6 80 16" stroke={dark} strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* cuerpo */}
        <path d="M18 60 Q16 18 50 16 Q84 18 82 60 L82 86 Q74 80 66 88 Q58 80 50 88 Q42 80 34 88 Q26 80 18 86 Z" fill={fill} />
        {/* ojos */}
        <circle cx="38" cy="46" r="9" fill="#fff" />
        <circle cx="62" cy="46" r="9" fill="#fff" />
        <circle cx="39" cy="47" r="4.5" fill="#1e1b2e" />
        <circle cx="63" cy="47" r="4.5" fill="#1e1b2e" />
        {c.old && (
          <g stroke="#1e1b2e" strokeWidth="2.5" fill="none">
            <circle cx="38" cy="46" r="11" />
            <circle cx="62" cy="46" r="11" />
            <path d="M49 46 L51 46" />
          </g>
        )}
        {c.cute && (
          <>
            <ellipse cx="28" cy="60" rx="5" ry="3" fill="#ff9aa2" opacity="0.8" />
            <ellipse cx="72" cy="60" rx="5" ry="3" fill="#ff9aa2" opacity="0.8" />
          </>
        )}
        {/* boca */}
        <path d="M40 64 Q50 74 60 64" stroke="#1e1b2e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

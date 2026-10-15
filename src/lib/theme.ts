import type { ThemeColor } from '../content/types'

// Clases completas (Tailwind necesita verlas literales)
export const themes: Record<ThemeColor, { grad: string; soft: string; text: string; btn: string; ring: string }> = {
  violet: { grad: 'from-violet-400 to-purple-600', soft: 'bg-violet-50', text: 'text-violet-700', btn: 'bg-violet-500 hover:bg-violet-600', ring: 'ring-violet-300' },
  pink: { grad: 'from-pink-400 to-rose-500', soft: 'bg-pink-50', text: 'text-pink-700', btn: 'bg-pink-500 hover:bg-pink-600', ring: 'ring-pink-300' },
  orange: { grad: 'from-orange-400 to-red-500', soft: 'bg-orange-50', text: 'text-orange-700', btn: 'bg-orange-500 hover:bg-orange-600', ring: 'ring-orange-300' },
  sky: { grad: 'from-sky-400 to-blue-600', soft: 'bg-sky-50', text: 'text-sky-700', btn: 'bg-sky-500 hover:bg-sky-600', ring: 'ring-sky-300' },
  emerald: { grad: 'from-emerald-400 to-teal-600', soft: 'bg-emerald-50', text: 'text-emerald-700', btn: 'bg-emerald-500 hover:bg-emerald-600', ring: 'ring-emerald-300' },
  amber: { grad: 'from-amber-300 to-orange-500', soft: 'bg-amber-50', text: 'text-amber-700', btn: 'bg-amber-500 hover:bg-amber-600', ring: 'ring-amber-300' },
  rose: { grad: 'from-rose-400 to-pink-600', soft: 'bg-rose-50', text: 'text-rose-700', btn: 'bg-rose-500 hover:bg-rose-600', ring: 'ring-rose-300' },
  indigo: { grad: 'from-indigo-400 to-blue-700', soft: 'bg-indigo-50', text: 'text-indigo-700', btn: 'bg-indigo-500 hover:bg-indigo-600', ring: 'ring-indigo-300' },
}

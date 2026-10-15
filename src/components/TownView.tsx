import { useState } from 'react'
import type { TownPlace } from '../lib/steps'

export default function TownView({ town }: { town: TownPlace[] }) {
  const [names, setNames] = useState(false)
  return (
    <div className="rounded-3xl bg-gradient-to-b from-sky-200 to-emerald-200 p-3 shadow-[0_6px_0_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="font-display text-lg font-extrabold text-sky-900">🗺️ My Town</span>
        <button onClick={() => setNames((n) => !n)} className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-sky-800">
          {names ? 'Ocultar nombres' : 'Ver nombres'}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {town.map((p) => (
          <div key={p.word.en} className="flex flex-col items-center justify-center rounded-2xl bg-white/85 p-2 text-center">
            <span className="text-3xl leading-tight">{p.word.emoji.repeat(p.count)}</span>
            {names && <span className="mt-1 text-xs font-bold leading-tight text-slate-600">{p.word.en}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

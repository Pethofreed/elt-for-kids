import { useMemo, useState } from 'react'
import type { BuildStep } from '../../lib/steps'
import { sfx } from '../../lib/sounds'
import { shuffle, tokens } from '../../lib/util'
import type { Answer } from '../StepRunner'

type Props = { step: BuildStep; onAnswer: (a: Answer) => void; locked: boolean }
type Tok = { id: number; text: string }

export default function BuildView({ step, onAnswer, locked }: Props) {
  // Separamos la puntuación final para no regalar la última palabra
  const { words, end } = useMemo(() => {
    const m = step.en.match(/^(.*?)([.?!]?)$/)!
    return { words: tokens(m[1]), end: m[2] }
  }, [step.en])

  const initial = useMemo(() => {
    const toks = words.map((text, id) => ({ id, text }))
    let s = shuffle(toks)
    for (let i = 0; i < 5 && s.map((t) => t.text).join(' ') === words.join(' '); i++) s = shuffle(toks)
    return s
  }, [words])

  const [placed, setPlaced] = useState<Tok[]>([])
  const [dragId, setDragId] = useState<number | null>(null)
  const bank = initial.filter((t) => !placed.some((p) => p.id === t.id))

  const add = (t: Tok, before?: number) => {
    if (locked) return
    sfx.tap()
    setPlaced((p) => {
      const rest = p.filter((x) => x.id !== t.id)
      if (before === undefined) return [...rest, t]
      const i = rest.findIndex((x) => x.id === before)
      return [...rest.slice(0, i), t, ...rest.slice(i)]
    })
  }
  const remove = (t: Tok) => {
    if (locked) return
    sfx.tap()
    setPlaced((p) => p.filter((x) => x.id !== t.id))
  }

  const check = () => {
    const ok = placed.map((t) => t.text).join(' ') === words.join(' ')
    onAnswer({ correct: ok, answer: step.en })
  }

  const findTok = (id: number | null) => initial.find((t) => t.id === id)

  return (
    <div className="space-y-4">
      <div className="card flex items-center gap-4 p-5">
        {step.emoji && <span className="text-5xl">{step.emoji}</span>}
        <div>
          <p className="font-bold text-slate-500">Arma la frase en inglés 🧩</p>
          <p className="font-display text-2xl font-extrabold text-slate-800">{step.es}</p>
        </div>
      </div>

      {/* Zona de respuesta */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const t = findTok(dragId)
          if (t) add(t)
          setDragId(null)
        }}
        className={`flex min-h-[84px] flex-wrap items-center gap-2 rounded-3xl border-4 border-dashed p-3 transition ${
          locked ? 'border-transparent bg-white' : 'border-violet-300 bg-violet-50/70'
        }`}
      >
        {placed.length === 0 && <span className="w-full text-center font-bold text-violet-400">Toca o arrastra las palabras aquí 👇</span>}
        {placed.map((t) => (
          <button
            key={t.id}
            draggable={!locked}
            onDragStart={() => setDragId(t.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const d = findTok(dragId)
              if (d && d.id !== t.id) add(d, t.id)
              setDragId(null)
            }}
            onClick={() => remove(t)}
            className="chip animate-pop border-violet-400 bg-white text-violet-800"
          >
            {t.text}
          </button>
        ))}
        {placed.length > 0 && end && <span className="font-display text-2xl font-extrabold text-violet-700">{end}</span>}
      </div>

      {/* Banco de palabras */}
      <div className="flex min-h-[60px] flex-wrap justify-center gap-2">
        {bank.map((t) => (
          <button
            key={t.id}
            draggable={!locked}
            onDragStart={() => setDragId(t.id)}
            onClick={() => add(t)}
            className="chip border-slate-300 bg-white text-slate-700 hover:border-violet-300"
          >
            {t.text}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button disabled={locked || placed.length === 0} onClick={() => setPlaced([])} className="btn flex-1 bg-slate-400 hover:bg-slate-500">
          ↺ Borrar
        </button>
        <button disabled={locked || bank.length > 0} onClick={check} className="btn flex-[2] bg-violet-500 hover:bg-violet-600">
          Comprobar ✔
        </button>
      </div>
    </div>
  )
}

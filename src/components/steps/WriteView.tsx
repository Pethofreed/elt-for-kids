import { useRef, useState } from 'react'
import type { WriteStep } from '../../lib/steps'
import { normalize } from '../../lib/util'
import type { Answer } from '../StepRunner'

type Props = { step: WriteStep; onAnswer: (a: Answer) => void; locked: boolean }

function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

export default function WriteView({ step, onAnswer, locked }: Props) {
  const [value, setValue] = useState('')
  const [hints, setHints] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const official = step.answers[0]

  // Pista: muestra las primeras letras y guiones para el resto
  const hintText = official
    .split('')
    .map((ch, i) => (i < hints || ch === ' ' || ch === "'" ? ch : '_'))
    .join(' ')

  const check = () => {
    if (locked || !value.trim()) return
    const v = normalize(value)
    const ok = step.answers.some((a) => normalize(a) === v)
    if (ok) return onAnswer({ correct: true, answer: official })
    const close = normalize(official).length >= 5 && distance(v, normalize(official)) <= 1
    if (close) return onAnswer({ correct: true, answer: official, note: `Ojo con la ortografía: se escribe "${official}" ✍️` })
    onAnswer({ correct: false, answer: official })
  }

  return (
    <div className="space-y-4">
      <div className="card flex flex-col items-center p-6 text-center">
        <span className="text-7xl">{step.emoji}</span>
        <p className="mt-2 font-display text-3xl font-extrabold text-slate-800">{step.es}</p>
        <p className="font-bold text-slate-500">Escríbelo en inglés ✍️</p>
        {hints > 0 && <p className="mt-2 font-mono text-2xl font-bold tracking-wider text-violet-600">{hintText}</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          check()
        }}
        className="space-y-3"
      >
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={locked}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          placeholder="Type here…"
          className="w-full rounded-2xl border-4 border-violet-200 bg-white px-5 py-4 text-center font-display text-3xl font-bold text-slate-800 outline-none transition focus:border-violet-400 disabled:bg-slate-50"
        />
        <div className="flex gap-3">
          <button
            type="button"
            disabled={locked || hints >= official.length}
            onClick={() => {
              setHints((h) => h + 1)
              inputRef.current?.focus()
            }}
            className="btn flex-1 bg-amber-400 text-amber-950 hover:bg-amber-500"
          >
            💡 Pista
          </button>
          <button type="submit" disabled={locked || !value.trim()} className="btn flex-[2] bg-violet-500 hover:bg-violet-600">
            Comprobar ✔
          </button>
        </div>
      </form>
    </div>
  )
}

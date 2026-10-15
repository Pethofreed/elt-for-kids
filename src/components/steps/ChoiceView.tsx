import { useEffect, useState } from 'react'
import type { ChoiceStep } from '../../lib/steps'
import { speak } from '../../lib/speech'
import type { Answer } from '../StepRunner'
import { SpeakButton } from '../ui'
import Monster from '../Monster'
import TownView from '../TownView'
import ClockFace from '../ClockFace'

// Opciones largas (frases) van en una columna; las cortas, lado a lado
function gridCols(options: string[]) {
  const long = options.some((o) => o.length > 16)
  if (options.length === 4) return long ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'
  if (long) return 'grid-cols-1'
  return options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
}

type Props = { step: ChoiceStep; onAnswer: (a: Answer) => void; locked: boolean }

export default function ChoiceView({ step, onAnswer, locked }: Props) {
  const [chosen, setChosen] = useState<string | null>(null)

  useEffect(() => {
    if ((step.listen || step.chat) && step.speak) {
      const t = setTimeout(() => speak(step.speak!), 300)
      return () => clearTimeout(t)
    }
  }, [step])

  const choose = (o: string) => {
    if (locked) return
    setChosen(o)
    onAnswer({ correct: o === step.answer, answer: step.answer, tip: step.tip })
  }

  const optionClass = (o: string) => {
    if (!locked) return 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50'
    if (o === step.answer) return 'border-emerald-500 bg-emerald-100 text-emerald-800'
    if (o === chosen) return 'border-rose-400 bg-rose-100 text-rose-700 animate-shake'
    return 'border-slate-200 bg-white text-slate-400 opacity-60'
  }

  return (
    <div className="space-y-4">
      {step.town && <TownView town={step.town} />}
      {step.clock && <ClockFace hour={step.clock} />}

      {step.chat ? (
        <div className="flex items-end gap-3">
          <span className="text-6xl">👩‍🏫</span>
          <div className="relative flex flex-1 items-center gap-3 rounded-3xl rounded-bl-md bg-white p-5 shadow-[0_6px_0_rgba(0,0,0,0.08)] ring-1 ring-black/5">
            <p className="flex-1 font-display text-2xl font-extrabold text-slate-800 sm:text-3xl">{step.prompt}</p>
            {step.speak && <SpeakButton text={step.speak} />}
          </div>
        </div>
      ) : step.listen ? (
        <div className="card flex flex-col items-center gap-2 p-6">
          <button
            onClick={() => speak(step.speak!)}
            className="flex h-28 w-28 items-center justify-center rounded-full bg-yellow-300 text-6xl shadow-[0_6px_0_rgba(0,0,0,0.15)] transition hover:scale-105 active:translate-y-1 active:shadow-none"
            aria-label="Escuchar otra vez"
          >
            🔊
          </button>
          <p className="font-bold text-slate-500">Toca para escuchar otra vez · <button className="underline" onClick={() => speak(step.speak!, 0.6)}>🐢 lento</button></p>
        </div>
      ) : (
        <div className="card flex items-center gap-4 p-5">
          {step.emoji && !step.town && <span className="text-6xl">{step.emoji}</span>}
          <p className="flex-1 font-display text-2xl font-extrabold leading-snug text-slate-800 sm:text-3xl">{step.prompt}</p>
          {step.speak && <SpeakButton text={step.speak} />}
        </div>
      )}

      {step.chars ? (
        <div className="grid grid-cols-3 gap-3">
          {step.chars.map((c) => (
            <button key={c.name} onClick={() => choose(c.name)} className={`chip flex flex-col items-center gap-1 p-2 ${optionClass(c.name)}`}>
              <Monster c={c} />
              <span className="text-sm leading-tight sm:text-base">{c.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={`grid gap-3 ${gridCols(step.options)}`}>
          {step.options.map((o) => (
            <button key={o} onClick={() => choose(o)} className={`chip min-h-[64px] text-xl ${optionClass(o)}`}>
              {step.labels?.[o] ?? o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

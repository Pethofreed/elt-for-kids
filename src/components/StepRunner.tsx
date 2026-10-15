import { useState } from 'react'
import type { Step } from '../lib/steps'
import { saveStars, starsFromScore } from '../lib/progress'
import { sfx } from '../lib/sounds'
import { speak } from '../lib/speech'
import { addCorrect, getRewards, isFull, POINTS_PER_CORRECT } from '../lib/rewards'
import ChoiceView from './steps/ChoiceView'
import WriteView from './steps/WriteView'
import BuildView from './steps/BuildView'
import Results from './Results'
import { BackButton, Page, ProgressBar } from './ui'

export type Answer = { correct: boolean; answer: string; tip?: string; note?: string; points?: boolean }

type Props = {
  title: string
  emoji: string
  makeSteps: () => Step[]
  saveKey: [string, string]
  backTo: string
}

const PRAISE = ['Great job! 🎉', 'Excellent! 🌟', 'Awesome! 🚀', 'Super! 💪', 'Well done! 👏', 'Perfect! 🏆', 'Amazing! ✨']
const TRY = ['¡Casi! 💪', '¡Sigue intentando! 🙂', '¡Tú puedes! ⭐']

export default function StepRunner({ title, emoji, makeSteps, saveKey, backTo }: Props) {
  const [steps, setSteps] = useState(makeSteps)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState<Answer | null>(null)
  const [done, setDone] = useState(false)
  const [praise, setPraise] = useState('')

  const step = steps[idx]

  const onAnswer = (a: Answer) => {
    if (result) return
    const points = a.correct && !isFull(getRewards())
    setResult({ ...a, points })
    if (a.correct) {
      setScore((s) => s + 1)
      addCorrect()
      sfx.correct()
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)])
    } else {
      sfx.wrong()
      setPraise(TRY[Math.floor(Math.random() * TRY.length)])
    }
    // Leer la respuesta correcta (si está en inglés) para reforzar
    setTimeout(() => speak(a.answer), 350)
  }

  const next = () => {
    if (idx + 1 >= steps.length) {
      saveStars(saveKey[0], saveKey[1], starsFromScore(score, steps.length))
      setDone(true)
    } else {
      setIdx(idx + 1)
      setResult(null)
    }
  }

  const retry = () => {
    setSteps(makeSteps())
    setIdx(0)
    setScore(0)
    setResult(null)
    setDone(false)
  }

  if (done) return <Results correct={score} total={steps.length} onRetry={retry} backTo={backTo} />

  return (
    <Page>
      <div className="flex items-center gap-3">
        <BackButton to={backTo} />
        <div className="flex-1">
          <ProgressBar value={idx + (result ? 1 : 0)} max={steps.length} />
        </div>
        <span className="font-display text-lg font-extrabold text-amber-500">⭐ {score}</span>
      </div>
      <h1 className="mt-3 text-center text-2xl font-extrabold text-slate-700">
        {emoji} {title}{' '}
        <span className="text-base font-bold text-slate-400">
          {idx + 1}/{steps.length}
        </span>
      </h1>

      <div className="mt-4" key={idx}>
        {step.kind === 'choice' && <ChoiceView step={step} onAnswer={onAnswer} locked={!!result} />}
        {step.kind === 'write' && <WriteView step={step} onAnswer={onAnswer} locked={!!result} />}
        {step.kind === 'build' && <BuildView step={step} onAnswer={onAnswer} locked={!!result} />}
      </div>

      {result && (
        <div className="fixed inset-x-0 bottom-0 z-20 animate-pop">
          <div
            className={`mx-auto max-w-3xl rounded-t-3xl px-5 pb-6 pt-4 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] ${result.correct ? 'bg-emerald-100' : 'bg-rose-100'}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className={`font-display text-2xl font-extrabold ${result.correct ? 'text-emerald-700' : 'text-rose-600'}`}>{praise}</p>
                {result.points && <p className="font-display text-lg font-extrabold text-violet-600">+{POINTS_PER_CORRECT} puntos 🎮</p>}
                {result.note && <p className="font-bold text-emerald-800">{result.note}</p>}
                {!result.correct && (
                  <p className="font-bold text-slate-700">
                    Respuesta: <span className="text-emerald-700">{result.answer}</span>
                  </p>
                )}
                {!result.correct && result.tip && <p className="text-sm font-bold text-slate-600">💡 {result.tip}</p>}
              </div>
              <button autoFocus onClick={next} className={`btn ${result.correct ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}`}>
                {idx + 1 >= steps.length ? 'Ver resultado 🏁' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      )}
      {result && <div className="h-36" />}
    </Page>
  )
}

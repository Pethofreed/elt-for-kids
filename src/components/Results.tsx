import { useEffect } from 'react'
import { starsFromScore } from '../lib/progress'
import { celebrate, sfx } from '../lib/sounds'
import { Page, Stars } from './ui'

type Props = { correct: number; total: number; onRetry: () => void; backTo: string }

export default function Results({ correct, total, onRetry, backTo }: Props) {
  const stars = starsFromScore(correct, total)

  useEffect(() => {
    if (stars >= 2) {
      sfx.win()
      celebrate(stars === 3)
    }
  }, [stars])

  const msg =
    stars === 3
      ? { t: 'PERFECT!', s: '¡Eres un campeón! 🏆', e: '🤩' }
      : stars === 2
        ? { t: 'Great job!', s: '¡Muy bien! Un poquito más y llegas a 3 estrellas.', e: '😄' }
        : stars === 1
          ? { t: 'Good try!', s: 'Repasa las tarjetas y vuelve a intentarlo 💪', e: '🙂' }
          : { t: "Let's practice!", s: 'Mira primero las tarjetas de "Learn" y vuelve 💡', e: '🤗' }

  return (
    <Page>
      <div className="card mx-auto mt-8 max-w-md animate-pop p-8 text-center">
        <div className="text-7xl">{msg.e}</div>
        <h1 className="mt-2 text-4xl font-extrabold text-violet-700">{msg.t}</h1>
        <div className="my-3">
          <Stars n={stars} size="text-5xl" />
        </div>
        <p className="font-display text-2xl font-extrabold text-slate-700">
          {correct} / {total}
        </p>
        <p className="mt-1 font-bold text-slate-600">{msg.s}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn bg-violet-500 hover:bg-violet-600" onClick={onRetry}>
            🔄 Otra vez
          </button>
          <a className="btn bg-slate-500 hover:bg-slate-600" href={`#/${backTo}`}>
            ← Volver
          </a>
        </div>
      </div>
    </Page>
  )
}

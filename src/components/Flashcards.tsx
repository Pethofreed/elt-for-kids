import { useState } from 'react'
import type { Topic } from '../content/types'
import { saveStars } from '../lib/progress'
import { celebrate, sfx } from '../lib/sounds'
import { speak } from '../lib/speech'
import { themes } from '../lib/theme'
import { go } from '../App'
import { BackButton, Page, ProgressBar, SpeakButton } from './ui'

type Card = { en: string; es: string; emoji?: string }

export default function Flashcards({ topic }: { topic: Topic }) {
  const [mode, setMode] = useState<'words' | 'sentences'>('words')
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const th = themes[topic.color]
  const cards: Card[] = mode === 'words' ? topic.words : topic.sentences
  const card = cards[i]

  const flip = () => {
    sfx.tap()
    if (!flipped) speak(card.en)
    setFlipped(!flipped)
  }
  const move = (d: number) => {
    setFlipped(false)
    setI((x) => Math.min(cards.length - 1, Math.max(0, x + d)))
  }
  const switchMode = (m: typeof mode) => {
    setMode(m)
    setI(0)
    setFlipped(false)
  }
  const finish = () => {
    saveStars(topic.id, 'learn', 3)
    sfx.win()
    celebrate(true)
    setTimeout(() => go(`topic/${topic.id}`), 1200)
  }

  const last = i === cards.length - 1

  return (
    <Page>
      <BackButton to={`topic/${topic.id}`} />
      <h1 className="mt-3 text-center text-2xl font-extrabold text-slate-700">🃏 Learn — {topic.title}</h1>

      <div className="mx-auto mt-3 flex w-fit rounded-full bg-white p-1 shadow ring-1 ring-black/5">
        {(['words', 'sentences'] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-full px-5 py-2 font-display text-lg font-bold transition ${mode === m ? `${th.btn} text-white` : 'text-slate-500'}`}
          >
            {m === 'words' ? '🔤 Words' : '💬 Sentences'}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ProgressBar value={i + 1} max={cards.length} className="bg-violet-400" />
      </div>

      <div className="mt-4 [perspective:1000px]">
        <button
          onClick={flip}
          className="relative h-72 w-full transition-transform duration-500 [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
          aria-label="Voltear tarjeta"
        >
          {/* Frente: español */}
          <div className="card absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
            {card.emoji && <span className="text-8xl">{card.emoji}</span>}
            <span className="mt-3 font-display text-3xl font-extrabold text-slate-700">{card.es}</span>
            <span className="mt-2 text-sm font-bold text-slate-400">Toca para ver en inglés 👆</span>
          </div>
          {/* Reverso: inglés */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${th.grad} p-6 text-white shadow-[0_6px_0_rgba(0,0,0,0.15)] [backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            {card.emoji && <span className="text-6xl">{card.emoji}</span>}
            <span className="mt-2 font-display text-4xl font-extrabold leading-tight">{card.en}</span>
            <SpeakButton text={card.en} size="lg" className="mt-4" />
          </div>
        </button>
      </div>

      <div className="mt-5 flex gap-3">
        <button disabled={i === 0} onClick={() => move(-1)} className="btn flex-1 bg-slate-400 hover:bg-slate-500">
          ← Atrás
        </button>
        {last ? (
          <button onClick={finish} className="btn flex-[2] bg-emerald-500 hover:bg-emerald-600">
            ¡Terminé! ⭐
          </button>
        ) : (
          <button onClick={() => move(1)} className={`btn flex-[2] ${th.btn}`}>
            Siguiente →
          </button>
        )}
      </div>
      <p className="mt-3 text-center font-bold text-slate-500">
        {i + 1} / {cards.length}
      </p>
    </Page>
  )
}

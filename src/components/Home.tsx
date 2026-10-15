import { useState } from 'react'
import { topics } from '../content'
import type { Topic } from '../content/types'
import { activitiesFor } from '../lib/activities'
import { loadProgress, resetProgress, starsFor, totalStars, type Progress } from '../lib/progress'
import { themes } from '../lib/theme'
import { Page } from './ui'

function TopicCard({ t, progress }: { t: Topic; progress: Progress }) {
  const th = themes[t.color]
  const acts = activitiesFor(t)
  const got = acts.reduce((a, act) => a + starsFor(progress, t.id, act), 0)
  const max = acts.length * 3
  return (
    <a
      href={`#/topic/${t.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${th.grad} p-3 text-white shadow-[0_5px_0_rgba(0,0,0,0.15)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-none sm:p-4`}
    >
      {t.extra && <span className="absolute right-2 top-2 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">EXTRA</span>}
      <span className="text-4xl drop-shadow transition group-hover:scale-110 sm:text-5xl">{t.emoji}</span>
      <h3 className="mt-1 text-lg font-extrabold leading-tight sm:text-xl">{t.title}</h3>
      <p className="line-clamp-1 text-xs font-bold text-white/85 sm:text-sm">{t.subtitle}</p>
      <div className="mt-auto flex items-center gap-2 pt-2">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/35">
          <div className="h-full rounded-full bg-yellow-300 transition-all" style={{ width: `${(got / max) * 100}%` }} />
        </div>
        <span className="shrink-0 text-xs font-extrabold">⭐{got}</span>
      </div>
    </a>
  )
}

export default function Home() {
  const [progress, setProgress] = useState(loadProgress)
  const talk = topics.filter((t) => t.section !== 'vocab')
  const vocab = topics.filter((t) => t.section === 'vocab')
  const examStars = starsFor(progress, 'exam', 'exam')

  return (
    <Page>
      <header className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-violet-700 sm:text-3xl">Hello, Matt! 👋</h1>
        <div className="rounded-full bg-white px-4 py-1.5 font-display text-xl font-extrabold text-amber-500 shadow ring-1 ring-black/5">⭐ {totalStars(progress)}</div>
      </header>

      <a
        href="#/exam"
        className="mb-5 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 p-4 text-amber-950 shadow-[0_5px_0_rgba(0,0,0,0.15)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-none"
      >
        <span className="text-5xl">🏆</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-extrabold leading-tight">Final Exam</h2>
          <p className="text-sm font-bold">Preguntas de todos los temas</p>
        </div>
        <span className="font-display text-lg font-extrabold">{examStars ? '⭐'.repeat(examStars) : 'GO! →'}</span>
      </a>

      <h2 className="mb-2 text-xl font-extrabold text-slate-700">💬 Frases y temas</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {talk.map((t) => (
          <TopicCard key={t.id} t={t} progress={progress} />
        ))}
      </div>

      <h2 className="mb-2 mt-6 text-xl font-extrabold text-slate-700">🧩 Vocabulario</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {vocab.map((t) => (
          <TopicCard key={t.id} t={t} progress={progress} />
        ))}
      </div>

      <footer className="mt-10 text-center text-sm text-slate-500">
        <button
          className="underline decoration-dotted hover:text-slate-700"
          onClick={() => {
            if (confirm('¿Borrar todas las estrellas y empezar de cero?')) {
              resetProgress()
              setProgress(loadProgress())
            }
          }}
        >
          Reiniciar estrellas
        </button>
      </footer>
    </Page>
  )
}

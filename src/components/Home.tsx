import { useState } from 'react'
import { topics } from '../content'
import { activitiesFor } from '../lib/activities'
import { loadProgress, resetProgress, starsFor, totalStars } from '../lib/progress'
import { themes } from '../lib/theme'
import { Page, ProgressBar } from './ui'

export default function Home() {
  const [progress, setProgress] = useState(loadProgress)
  const total = totalStars(progress)

  return (
    <Page>
      <header className="mb-6 text-center">
        <div className="mb-1 animate-float text-6xl">🚀</div>
        <h1 className="text-4xl font-extrabold leading-tight text-violet-700 sm:text-5xl">Matt's English Adventure</h1>
        <p className="mt-1 text-lg font-bold text-slate-600">¡Elige un tema y gana estrellas! ⭐</p>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-display text-2xl font-extrabold text-amber-500 shadow ring-1 ring-black/5">
          ⭐ {total}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {topics.map((t) => {
          const th = themes[t.color]
          const acts = activitiesFor(t)
          const got = acts.reduce((a, act) => a + starsFor(progress, t.id, act), 0)
          const max = acts.length * 3
          return (
            <a
              key={t.id}
              href={`#/topic/${t.id}`}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${th.grad} p-5 text-white shadow-[0_6px_0_rgba(0,0,0,0.15)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-none`}
            >
              {t.extra && (
                <span className="absolute right-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-xs font-bold">EXTRA</span>
              )}
              <div className="flex items-center gap-4">
                <span className="text-6xl drop-shadow transition group-hover:scale-110">{t.emoji}</span>
                <div className="min-w-0">
                  <h2 className="text-2xl font-extrabold leading-tight">{t.title}</h2>
                  <p className="font-bold text-white/90">{t.subtitle}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={got} max={max} className="bg-yellow-300" />
                <span className="shrink-0 font-display font-bold">
                  ⭐ {got}/{max}
                </span>
              </div>
            </a>
          )
        })}
      </div>

      <a
        href="#/exam"
        className="mt-5 flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 p-5 text-amber-950 shadow-[0_6px_0_rgba(0,0,0,0.15)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-none"
      >
        <div className="flex items-center gap-4">
          <span className="text-6xl">🏆</span>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">Final Exam</h2>
            <p className="font-bold">Practica con preguntas de todos los temas</p>
          </div>
        </div>
        <span className="hidden text-2xl font-extrabold sm:block">{starsFor(progress, 'exam', 'exam') ? '⭐'.repeat(starsFor(progress, 'exam', 'exam')) : 'GO! →'}</span>
      </a>

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

import type { Topic } from '../content/types'
import { ACTIVITIES, activitiesFor } from '../lib/activities'
import { loadProgress, starsFor } from '../lib/progress'
import { themes } from '../lib/theme'
import { BackButton, Page, SpeakButton, Stars } from './ui'

export default function TopicPage({ topic }: { topic: Topic }) {
  const th = themes[topic.color]
  const progress = loadProgress()

  return (
    <Page>
      <BackButton to="" label="Temas" />

      <header className={`mt-4 rounded-3xl bg-gradient-to-br ${th.grad} p-6 text-white shadow-[0_6px_0_rgba(0,0,0,0.15)]`}>
        <div className="flex items-center gap-4">
          <span className="text-7xl drop-shadow">{topic.emoji}</span>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">{topic.title}</h1>
            <p className="text-lg font-bold text-white/90">{topic.subtitle}</p>
          </div>
        </div>
      </header>

      <h2 className="mb-3 mt-6 text-2xl font-extrabold text-slate-700">💡 Remember!</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {topic.grammar.map((g) => (
          <div key={g.title} className="card p-4">
            <h3 className={`text-xl font-extrabold ${th.text}`}>{g.title}</h3>
            <ul className="mt-2 space-y-1">
              {g.lines.map((l) => (
                <li key={l} className="font-bold text-slate-700">
                  • {l}
                </li>
              ))}
            </ul>
            {(g.good || g.bad) && (
              <div className="mt-3 space-y-1">
                {g.good && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700">
                    ✅ {g.good}
                    <SpeakButton text={g.good} size="sm" className="ml-auto" />
                  </div>
                )}
                {g.bad && <div className="rounded-xl bg-rose-50 px-3 py-1.5 font-bold text-rose-600 line-through decoration-2">❌ {g.bad}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-2xl font-extrabold text-slate-700">🎮 Games</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {activitiesFor(topic).map((a) => {
          const info = ACTIVITIES[a]
          return (
            <a
              key={a}
              href={`#/topic/${topic.id}/${a}`}
              className={`card flex flex-col items-center p-4 text-center transition hover:-translate-y-1 hover:ring-4 ${th.ring} active:translate-y-0.5`}
            >
              <span className="text-5xl">{info.emoji}</span>
              <span className={`mt-1 font-display text-xl font-extrabold ${th.text}`}>{info.title}</span>
              <span className="text-sm font-bold text-slate-500">{info.desc}</span>
              <Stars n={starsFor(progress, topic.id, a)} size="text-base" />
            </a>
          )
        })}
      </div>
    </Page>
  )
}

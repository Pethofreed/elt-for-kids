import { useMemo, useState } from 'react'
import type { Topic, Word } from '../content/types'
import { saveStars, starsFromScore } from '../lib/progress'
import { celebrate, sfx } from '../lib/sounds'
import { speak } from '../lib/speech'
import { addCorrect } from '../lib/rewards'
import { shuffle } from '../lib/util'
import Results from './Results'
import { BackButton, Page } from './ui'

const PER_ROUND = 6

function makeRounds(words: Word[]): Word[][] {
  const s = shuffle(words).slice(0, PER_ROUND * 2)
  if (s.length <= PER_ROUND + 2) return [s.slice(0, Math.min(s.length, PER_ROUND))]
  return [s.slice(0, PER_ROUND), s.slice(PER_ROUND)]
}

export default function MatchGame({ topic }: { topic: Topic }) {
  const [seed, setSeed] = useState(0)
  const rounds = useMemo(() => makeRounds(topic.words), [topic, seed])
  const [round, setRound] = useState(0)
  const [matched, setMatched] = useState<string[]>([])
  const [left, setLeft] = useState<string | null>(null)
  const [right, setRight] = useState<string | null>(null)
  const [wrong, setWrong] = useState<[string, string] | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const [done, setDone] = useState(false)

  const words = rounds[round]
  const lefts = useMemo(() => shuffle(words), [words])
  const rights = useMemo(() => shuffle(words), [words])
  const totalPairs = rounds.reduce((a, r) => a + r.length, 0)

  const tryPair = (l: string | null, r: string | null) => {
    if (!l || !r) return
    if (l === r) {
      sfx.correct()
      addCorrect()
      const m = [...matched, l]
      setMatched(m)
      setLeft(null)
      setRight(null)
      if (m.length === words.length) {
        celebrate()
        setTimeout(() => {
          if (round + 1 < rounds.length) {
            setRound(round + 1)
            setMatched([])
          } else {
            saveStars(topic.id, 'match', starsFromScore(totalPairs, totalPairs + mistakes))
            setDone(true)
          }
        }, 900)
      }
    } else {
      sfx.wrong()
      setMistakes((x) => x + 1)
      setWrong([l, r])
      setTimeout(() => {
        setWrong(null)
        setLeft(null)
        setRight(null)
      }, 600)
    }
  }

  if (done)
    return (
      <Results
        correct={totalPairs}
        total={totalPairs + mistakes}
        backTo={`topic/${topic.id}`}
        onRetry={() => {
          setSeed((s) => s + 1)
          setRound(0)
          setMatched([])
          setMistakes(0)
          setDone(false)
        }}
      />
    )

  const cls = (side: 'l' | 'r', en: string) => {
    const sel = side === 'l' ? left === en : right === en
    const isWrong = wrong && (side === 'l' ? wrong[0] === en : wrong[1] === en)
    if (matched.includes(en)) return 'border-emerald-300 bg-emerald-100 text-emerald-700 opacity-60 scale-95'
    if (isWrong) return 'border-rose-400 bg-rose-100 text-rose-700 animate-shake'
    if (sel) return 'border-violet-500 bg-violet-100 text-violet-800 -translate-y-0.5'
    return 'border-slate-200 bg-white text-slate-700 hover:border-violet-300'
  }

  return (
    <Page>
      <div className="flex items-center justify-between">
        <BackButton to={`topic/${topic.id}`} />
        <span className="font-display font-bold text-slate-500">
          Ronda {round + 1}/{rounds.length} · ❌ {mistakes}
        </span>
      </div>
      <h1 className="mt-3 text-center text-2xl font-extrabold text-slate-700">🔗 Match — Une las parejas</h1>
      <p className="text-center font-bold text-slate-500">Toca una palabra en inglés y luego su significado</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {lefts.map((w) => (
            <button
              key={w.en}
              disabled={matched.includes(w.en)}
              onClick={() => {
                sfx.tap()
                speak(w.en)
                setLeft(w.en)
                tryPair(w.en, right)
              }}
              className={`chip w-full min-h-[60px] text-lg leading-tight ${cls('l', w.en)}`}
            >
              {w.en}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((w) => (
            <button
              key={w.en}
              disabled={matched.includes(w.en)}
              onClick={() => {
                sfx.tap()
                setRight(w.en)
                tryPair(left, w.en)
              }}
              className={`chip flex w-full min-h-[60px] items-center gap-2 text-left text-base leading-tight ${cls('r', w.en)}`}
            >
              <span className="text-2xl">{w.emoji}</span>
              <span>{w.es}</span>
            </button>
          ))}
        </div>
      </div>
    </Page>
  )
}

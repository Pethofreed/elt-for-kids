import { useEffect, useRef, useState, type ReactNode } from 'react'
import { barColor, GOAL_OPTIONS, isFull, POINTS_PER_CORRECT, resetBar, setGoal, useRewards } from '../lib/rewards'
import { celebrate, sfx } from '../lib/sounds'

/** Barra de recompensa fija arriba en todas las pantallas. */
export default function RewardBar() {
  const r = useRewards()
  const [config, setConfig] = useState(false)
  const [won, setWon] = useState(false)
  const [bump, setBump] = useState(false)
  const prev = useRef(r.points)

  const ratio = r.goal ? r.points / r.goal : 0
  const full = isFull(r)

  // Animación al sumar puntos y celebración al llenarse
  useEffect(() => {
    if (r.points > prev.current) {
      setBump(true)
      const t = setTimeout(() => setBump(false), 450)
      if (full) {
        setTimeout(() => {
          sfx.win()
          celebrate(true)
          setWon(true)
        }, 900)
      }
      prev.current = r.points
      return () => clearTimeout(t)
    }
    prev.current = r.points
  }, [r.points, full])

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-black/5 bg-[#fef6e4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2">
          <span className={`text-3xl transition ${bump ? 'scale-125' : ''} ${full ? 'animate-float' : ''}`} aria-hidden>
            🎮
          </span>
          <button
            onClick={() => (full ? setWon(true) : setConfig(true))}
            className="min-w-0 flex-1 text-left"
            aria-label={`Barra de premio: ${r.points} de ${r.goal} puntos`}
          >
            <div className="flex items-baseline justify-between font-display text-sm font-extrabold leading-none text-slate-600">
              <span>{full ? '¡Premio listo! 🎉' : 'Game time'}</span>
              <span className={full ? 'text-green-600' : ''}>
                {r.points} / {r.goal}
              </span>
            </div>
            <div className="mt-1 h-5 w-full overflow-hidden rounded-full bg-white ring-2 ring-black/10">
              <div
                className={`relative h-full rounded-full transition-all duration-700 ease-out ${bump ? 'brightness-125' : ''}`}
                style={{ width: `${Math.max(ratio * 100, ratio > 0 ? 6 : 0)}%`, background: barColor(ratio) }}
              >
                <div className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>
          </button>
          <button
            onClick={() => setConfig(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow ring-1 ring-black/5 transition hover:rotate-45"
            aria-label="Configurar barra"
          >
            ⚙️
          </button>
        </div>
      </div>

      {config && <ConfigModal onClose={() => setConfig(false)} />}
      {won && <WonModal onClose={() => setWon(false)} />}
    </>
  )
}

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="card w-full max-w-sm animate-pop p-5" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        {children}
      </div>
    </div>
  )
}

function ConfigModal({ onClose }: { onClose: () => void }) {
  const r = useRewards()
  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-violet-700">⚙️ Barra de premio</h2>
        <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-600" aria-label="Cerrar">
          ✕
        </button>
      </div>
      <p className="mt-1 text-sm font-bold text-slate-500">
        Cada respuesta correcta suma <b className="text-violet-600">+{POINTS_PER_CORRECT}</b> puntos. ¿Cuántos puntos para ganar el premio?
      </p>

      <fieldset className="mt-4 grid grid-cols-5 gap-2">
        <legend className="sr-only">Puntos para llenar la barra</legend>
        {GOAL_OPTIONS.map((g) => (
          <label
            key={g}
            className={`cursor-pointer rounded-xl border-2 border-b-4 py-2 text-center font-display text-lg font-extrabold transition ${
              r.goal === g ? 'border-violet-500 bg-violet-100 text-violet-800' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
            }`}
          >
            <input type="radio" name="goal" value={g} checked={r.goal === g} onChange={() => setGoal(g)} className="sr-only" />
            {g}
          </label>
        ))}
      </fieldset>
      <p className="mt-2 text-center text-sm font-bold text-slate-500">
        = {Math.ceil(r.goal / POINTS_PER_CORRECT)} respuestas correctas
      </p>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-600">
        Ahora: <b>{r.points}</b> / {r.goal} puntos · 🏆 Premios ganados: <b>{r.earned}</b>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            if (confirm('¿Vaciar la barra y empezar de cero?')) resetBar()
          }}
          className="btn flex-1 bg-slate-400 px-3 text-base hover:bg-slate-500"
        >
          ↺ Vaciar barra
        </button>
        <button onClick={onClose} className="btn flex-1 bg-violet-500 px-3 text-base hover:bg-violet-600">
          Listo ✔
        </button>
      </div>
    </Modal>
  )
}

function WonModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-7xl">🎮</div>
        <h2 className="mt-2 text-3xl font-extrabold text-green-600">¡Barra llena!</h2>
        <p className="mt-1 font-bold text-slate-600">¡Ganaste tu tiempo de juego en el PC! Muéstrale esto a papá 😎</p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => {
              resetBar()
              onClose()
            }}
            className="btn bg-green-500 hover:bg-green-600"
          >
            ✅ Premio cobrado — nueva barra
          </button>
          <button onClick={onClose} className="font-bold text-slate-500 underline decoration-dotted">
            Seguir estudiando
          </button>
        </div>
      </div>
    </Modal>
  )
}

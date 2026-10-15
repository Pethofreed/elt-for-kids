import { useEffect, useRef, useState } from 'react'
import { barColor, GOAL_OPTIONS, isFull, POINTS_PER_CORRECT, resetBar, setGoal, useRewards } from '../lib/rewards'
import { celebrate, sfx } from '../lib/sounds'
import { QuickPicker } from './QuickPlay'
import { Modal } from './ui'

/** Barra de recompensa fija arriba en todas las pantallas. */
export default function RewardBar() {
  const r = useRewards()
  const [config, setConfig] = useState(false)
  const [gate, setGate] = useState(false)
  const [picker, setPicker] = useState(false)
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
          <button
            onClick={() => setPicker(true)}
            className={`flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-1.5 pl-2 pr-3 font-display text-sm font-extrabold leading-tight text-white shadow-[0_3px_0_rgba(0,0,0,0.18)] transition hover:brightness-110 active:translate-y-[2px] active:shadow-none ${bump ? 'scale-110' : ''}`}
          >
            <span className={`text-2xl ${full ? 'animate-float' : ''}`} aria-hidden>
              🎮
            </span>
            <span className="text-left">
              Gana
              <br />
              puntos
            </span>
          </button>
          <button
            onClick={() => (full ? setWon(true) : setPicker(true))}
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
            onClick={() => setGate(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow ring-1 ring-black/5 transition hover:rotate-45"
            aria-label="Configurar barra"
          >
            ⚙️
          </button>
        </div>
      </div>

      {gate && (
        <ParentGate
          onClose={() => setGate(false)}
          onPass={() => {
            setGate(false)
            setConfig(true)
          }}
        />
      )}
      {picker && <QuickPicker onClose={() => setPicker(false)} />}
      {config && <ConfigModal onClose={() => setConfig(false)} />}
      {won && <WonModal onClose={() => setWon(false)} />}
    </>
  )
}

// Tabla del 5 al azar: 5 × n o n × 5 (n de 2 a 10).
const newQuestion = () => {
  const n = 2 + Math.floor(Math.random() * 9)
  return (Math.random() < 0.5 ? [5, n] : [n, 5]) as readonly [number, number]
}

/** "Solo papá": hay que resolver una multiplicación para abrir la configuración. */
function ParentGate({ onClose, onPass }: { onClose: () => void; onPass: () => void }) {
  const [[a, b], setQ] = useState(newQuestion)
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)

  const check = () => {
    if (Number(value) === a * b) return onPass()
    setWrong(true)
    setValue('')
    setQ(newQuestion())
    setTimeout(() => setWrong(false), 500)
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-violet-700">🔒 Solo papá</h2>
        <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-600" aria-label="Cerrar">
          ✕
        </button>
      </div>
      <p className="mt-1 text-sm font-bold text-slate-500">Resuelve la multiplicación para cambiar la barra.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          check()
        }}
        className={`mt-4 flex items-center justify-center gap-3 ${wrong ? 'animate-shake' : ''}`}
      >
        <span className="font-display text-4xl font-extrabold text-slate-700">
          {a} × {b} =
        </span>
        <input
          autoFocus
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ''))}
          aria-label={`Resultado de ${a} por ${b}`}
          className={`w-24 rounded-2xl border-4 bg-white px-3 py-2 text-center font-display text-3xl font-bold outline-none transition ${
            wrong ? 'border-rose-400' : 'border-violet-200 focus:border-violet-400'
          }`}
        />
      </form>
      {wrong && <p className="mt-2 text-center text-sm font-bold text-rose-500">Incorrecto, prueba con esta otra 🙂</p>}
      <button onClick={check} disabled={!value} className="btn mt-4 w-full bg-violet-500 hover:bg-violet-600">
        Entrar ✔
      </button>
    </Modal>
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

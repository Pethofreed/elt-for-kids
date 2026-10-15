import { topics } from '../content'
import { go } from '../App'
import { POINTS_PER_CORRECT } from '../lib/rewards'
import { quickSteps, type QuickKind } from '../lib/steps'
import { pick } from '../lib/util'
import StepRunner from './StepRunner'
import { Modal } from './ui'

const QUICK: Record<QuickKind, { title: string; desc: string; emoji: string }> = {
  mix: { title: 'Mezcla rápida', desc: '10 preguntas de todo', emoji: '🎲' },
  quiz: { title: 'Quiz', desc: 'Elige la correcta', emoji: '✅' },
  listen: { title: 'Listen', desc: 'Escucha y elige', emoji: '🎧' },
  write: { title: 'Write', desc: 'Escríbelo', emoji: '⌨️' },
  build: { title: 'Build', desc: 'Arma frases', emoji: '🧩' },
}

const randomTopicWith = (pred: (t: (typeof topics)[number]) => boolean) => pick(topics.filter(pred), 1)[0]

// Juegos de un tema concreto que también dan puntos
const SPECIALS = [
  { title: 'Match', desc: 'Une parejas', emoji: '🔗', route: () => `topic/${randomTopicWith((t) => t.words.length >= 6).id}/match` },
  { title: 'Chat', desc: 'Habla con la profe', emoji: '💬', route: () => 'topic/greetings/chat' },
  { title: 'Town Map', desc: 'Is there…?', emoji: '🗺️', route: () => 'topic/town/townMap' },
  { title: 'Who is it?', desc: 'Adivina quién', emoji: '🕵️', route: () => 'topic/descriptions/whoIsIt' },
]

/** Ventana "Gana puntos": elegir un juego que llena la barra. */
export function QuickPicker({ onClose }: { onClose: () => void }) {
  const open = (route: string) => {
    onClose()
    go(route)
  }
  const tile = 'chip flex flex-col items-center border-slate-200 bg-white px-2 py-2 text-slate-700 hover:border-violet-300 hover:bg-violet-50'

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-violet-700">🎮 ¡Gana puntos!</h2>
        <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-600" aria-label="Cerrar">
          ✕
        </button>
      </div>
      <p className="text-sm font-bold text-slate-500">
        Cada respuesta correcta = <b className="text-violet-600">+{POINTS_PER_CORRECT} puntos</b>
      </p>

      <button
        onClick={() => open(`quick/mix/${Date.now()}`)}
        className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 text-left text-white shadow-[0_4px_0_rgba(0,0,0,0.18)] transition active:translate-y-[3px] active:shadow-none"
      >
        <span className="text-4xl">{QUICK.mix.emoji}</span>
        <span>
          <span className="block font-display text-xl font-extrabold leading-tight">{QUICK.mix.title}</span>
          <span className="text-sm font-bold text-white/90">{QUICK.mix.desc}</span>
        </span>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {(['quiz', 'listen', 'write', 'build'] as const).map((k) => (
          <button key={k} onClick={() => open(`quick/${k}/${Date.now()}`)} className={tile}>
            <span className="text-3xl">{QUICK[k].emoji}</span>
            <span className="text-base leading-tight">{QUICK[k].title}</span>
            <span className="text-xs text-slate-500">{QUICK[k].desc}</span>
          </button>
        ))}
        {SPECIALS.map((s) => (
          <button key={s.title} onClick={() => open(s.route())} className={tile}>
            <span className="text-3xl">{s.emoji}</span>
            <span className="text-base leading-tight">{s.title}</span>
            <span className="text-xs text-slate-500">{s.desc}</span>
          </button>
        ))}
      </div>
    </Modal>
  )
}

/** Página de juego rápido: preguntas al azar de todos los temas. */
export function QuickPage({ kind }: { kind: string }) {
  const k = (kind in QUICK ? kind : 'mix') as QuickKind
  return <StepRunner title={QUICK[k].title} emoji={QUICK[k].emoji} makeSteps={() => quickSteps(topics, k)} saveKey={['quick', k]} backTo="" />
}

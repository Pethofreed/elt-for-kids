import { useEffect, type ReactNode } from 'react'
import { canSpeak, speak } from '../lib/speech'

export function BackButton({ to, label = 'Volver' }: { to: string; label?: string }) {
  return (
    <a
      href={`#/${to}`}
      className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 font-display text-base font-bold text-slate-700 shadow ring-1 ring-black/5 transition hover:bg-white"
    >
      ← {label}
    </a>
  )
}

export function SpeakButton({ text, size = 'md', className = '' }: { text: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  if (!canSpeak()) return null
  const s = size === 'lg' ? 'h-14 w-14 text-3xl' : size === 'sm' ? 'h-9 w-9 text-lg' : 'h-11 w-11 text-2xl'
  return (
    <button
      type="button"
      aria-label={`Escuchar: ${text}`}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-yellow-300 shadow-[0_3px_0_rgba(0,0,0,0.15)] transition hover:bg-yellow-200 active:translate-y-[2px] active:shadow-none ${s} ${className}`}
    >
      🔊
    </button>
  )
}

export function Stars({ n, max = 3, size = 'text-xl' }: { n: number; max?: number; size?: string }) {
  return (
    <span className={`${size} tracking-tight`} aria-label={`${n} de ${max} estrellas`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < n ? '' : 'opacity-25 grayscale'}>
          ⭐
        </span>
      ))}
    </span>
  )
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:pt-6">{children}</div>
}

export function ProgressBar({ value, max, className = 'bg-emerald-400' }: { value: number; max: number; className?: string }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-white/70 ring-1 ring-black/5">
      <div className={`h-full rounded-full transition-all duration-500 ${className}`} style={{ width: `${(value / Math.max(1, max)) * 100}%` }} />
    </div>
  )
}

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="card max-h-[90vh] w-full max-w-sm animate-pop overflow-y-auto p-5" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        {children}
      </div>
    </div>
  )
}

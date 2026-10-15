import confetti from 'canvas-confetti'

let ctx: AudioContext | null = null
const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = AC ? new AC() : null
  }
  return ctx
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.15) {
  const c = getCtx()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(vol, c.currentTime + start)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur)
  o.connect(g).connect(c.destination)
  o.start(c.currentTime + start)
  o.stop(c.currentTime + start + dur)
}

export const sfx = {
  correct() {
    tone(660, 0, 0.12, 'triangle')
    tone(880, 0.1, 0.18, 'triangle')
  },
  wrong() {
    tone(220, 0, 0.18, 'sawtooth', 0.08)
    tone(180, 0.12, 0.22, 'sawtooth', 0.08)
  },
  tap() {
    tone(520, 0, 0.06, 'sine', 0.08)
  },
  win() {
    ;[523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle'))
  },
}

export function celebrate(big = false) {
  confetti({ particleCount: big ? 160 : 60, spread: big ? 100 : 60, origin: { y: 0.6 } })
  if (big) {
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 } }), 250)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 } }), 400)
  }
}

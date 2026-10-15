import { AUDIO_FILES } from './audioManifest'
import { audioKey, speechText } from './audioKey'

// 1) Preferimos los audios pregrabados (public/audio, voz Samantha en inglés):
//    suenan igual en cualquier dispositivo y navegador.
// 2) Si un texto no tiene audio, usamos la voz del navegador como respaldo.

let current: HTMLAudioElement | null = null
let voice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (!('speechSynthesis' in window)) return
  const en = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('en'))
  voice =
    en.find((v) => /samantha|google us english|jenny|aria|ava/i.test(v.name)) ??
    en.find((v) => v.lang === 'en-US') ??
    en[0] ??
    null
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

export const canSpeak = () => typeof window !== 'undefined'

/** rate < 0.8 = modo lento 🐢 */
export function speak(text: string, rate = 0.85) {
  if (!canSpeak()) return
  current?.pause()
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()

  const key = audioKey(text)
  if (AUDIO_FILES.has(key)) {
    current = new Audio(`/audio/${key}.m4a`)
    current.playbackRate = rate < 0.8 ? 0.7 : 1
    current.play().catch(() => {})
    return
  }

  if (import.meta.env.DEV) console.warn('[audio] sin grabación:', text)
  if (!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(speechText(text).replace(/_{2,}/g, ', '))
  u.lang = 'en-US'
  u.rate = rate
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}

let voice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (!('speechSynthesis' in window)) return
  const voices = window.speechSynthesis.getVoices()
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'))
  // Preferimos voces en-US agradables si existen
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

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export function speak(text: string, rate = 0.85) {
  if (!canSpeak()) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, 'blank'))
  u.lang = 'en-US'
  u.rate = rate
  if (voice) u.voice = voice
  synth.speak(u)
}

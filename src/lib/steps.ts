import type { Character, Topic, Word } from '../content/types'
import { pick, shuffle, tokens } from './util'

export type ChoiceStep = {
  kind: 'choice'
  prompt: string
  emoji?: string
  options: string[]
  answer: string
  tip?: string
  /** Texto que se lee en voz alta (botón 🔊). */
  speak?: string
  /** Si es true, se lee automáticamente al aparecer (ejercicio de escucha). */
  listen?: boolean
  /** Etiqueta visible de cada opción (si difiere del valor). */
  labels?: Record<string, string>
  /** Personajes para dibujar en las opciones (Who is it?). */
  chars?: Character[]
  /** Pueblo para dibujar (There is / There are). */
  town?: TownPlace[]
  /** Reloj grande (rutina). */
  clock?: number
}

export type WriteStep = {
  kind: 'write'
  es: string
  emoji: string
  answers: string[] // la primera es la "oficial"
}

export type BuildStep = {
  kind: 'build'
  es: string
  emoji?: string
  en: string
}

export type Step = ChoiceStep | WriteStep | BuildStep

// ───────────── Actividades generales ─────────────

export function writeSteps(topic: Topic, n = 8): WriteStep[] {
  return pick(topic.words, n).map((w) => ({
    kind: 'write',
    es: w.es,
    emoji: w.emoji,
    answers: [w.en, ...(w.alt ?? [])],
  }))
}

export function buildSteps(topic: Topic, n = 6): BuildStep[] {
  return pick(
    topic.sentences.filter((s) => tokens(s.en).length >= 2),
    n,
  ).map((s) => ({ kind: 'build', es: s.es, emoji: s.emoji, en: s.en }))
}

const wordLabel = (w: Word) => `${w.emoji} ${w.es}`

/** Escucha la palabra en inglés y elige el dibujo correcto. */
export function listenSteps(topic: Topic, n = 8): ChoiceStep[] {
  return pick(topic.words, n).map((w) => {
    const others = pick(
      topic.words.filter((o) => o.en !== w.en),
      3,
    )
    const opts = shuffle([w, ...others])
    return {
      kind: 'choice',
      prompt: '🔊 Escucha y elige',
      options: opts.map((o) => o.en),
      labels: Object.fromEntries(opts.map((o) => [o.en, wordLabel(o)])),
      answer: w.en,
      speak: w.en,
      listen: true,
    }
  })
}

/** ¿Cómo se dice … en inglés? */
function translateStep(topic: Topic, w: Word): ChoiceStep {
  const others = pick(
    topic.words.filter((o) => o.en !== w.en),
    2,
  ).map((o) => o.en)
  return {
    kind: 'choice',
    prompt: `¿Cómo se dice "${w.es}" en inglés?`,
    emoji: w.emoji,
    options: shuffle([w.en, ...others]),
    answer: w.en,
  }
}

export function quizSteps(topic: Topic, n = 10): ChoiceStep[] {
  const qs: ChoiceStep[] = pick(topic.questions, n).map((q) => ({
    kind: 'choice',
    prompt: q.prompt,
    emoji: q.emoji,
    options: shuffle(q.options),
    answer: q.answer,
    tip: q.tip,
    // Solo leemos en voz alta las preguntas que están en inglés
    speak: /[¿¡áéíóúñ]|Lo contrario|^\W/i.test(q.prompt) ? undefined : q.prompt,
  }))
  // Si faltan preguntas, completamos con traducciones
  const extra = pick(topic.words, Math.max(0, n - qs.length)).map((w) => translateStep(topic, w))
  return shuffle([...qs, ...extra])
}

// ───────────── Especiales ─────────────

/** Who is it? — lee la descripción y elige el personaje. */
export function whoIsItSteps(topic: Topic, n = 6): ChoiceStep[] {
  const chars = topic.characters ?? []
  return pick(chars, n).map((c) => {
    // Elegimos opciones que no tengan exactamente la misma descripción
    const others = pick(
      chars.filter((o) => o.name !== c.name && o.lines.join() !== c.lines.join()),
      2,
    )
    const opts = shuffle([c, ...others])
    const text = c.lines.join(' ')
    return {
      kind: 'choice',
      prompt: text,
      options: opts.map((o) => o.name),
      chars: opts,
      answer: c.name,
      speak: text,
    }
  })
}

const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

export function clockSteps(n = 6): ChoiceStep[] {
  return pick(
    NUMBERS.map((_, i) => i + 1),
    n,
  ).map((h) => {
    const answer = `${NUMBERS[h - 1]} o'clock`
    const others = pick(
      NUMBERS.filter((_, i) => i + 1 !== h),
      2,
    ).map((x) => `${x} o'clock`)
    return {
      kind: 'choice',
      prompt: 'What time is it?',
      clock: h,
      options: shuffle([answer, ...others]),
      answer,
      speak: 'What time is it?',
      tip: `It is ${answer}.`,
    }
  })
}

// ───── Town map: genera un pueblo al azar y pregunta Is there / Are there ─────

export type TownPlace = { word: Word; count: number }

const COUNT_WORDS = ['zero', 'one', 'two', 'three']

export function plural(w: string) {
  const parts = w.split(' ')
  const last = parts.pop()!
  let p: string
  if (/(ch|sh|s|x)$/.test(last)) p = last + 'es'
  else if (/[^aeiou]y$/.test(last)) p = last.slice(0, -1) + 'ies'
  else p = last + 's'
  return [...parts, p].join(' ')
}

const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a')

export const ANSWERS = {
  yesIs: 'Yes, there is.',
  noIsnt: "No, there isn't.",
  yesAre: 'Yes, there are.',
  noArent: "No, there aren't.",
}

export function makeTown(topic: Topic): TownPlace[] {
  return pick(topic.words, 7).map((word) => ({
    word,
    count: Math.random() < 0.65 ? 1 : Math.random() < 0.6 ? 2 : 3,
  }))
}

export function townSteps(topic: Topic, n = 8): ChoiceStep[] {
  const town = makeTown(topic)
  const inTown = new Map(town.map((p) => [p.word.en, p.count]))
  const steps: ChoiceStep[] = []
  let guard = 0
  for (let i = 0; i < n && guard++ < 200; i++) {
    const askPlural = Math.random() < 0.4
    // Mitad lugares que sí están, mitad al azar (pueden no estar)
    const w = Math.random() < 0.55 ? pick(town, 1)[0].word : pick(topic.words, 1)[0]
    const real = inTown.get(w.en) ?? 0
    let prompt: string
    let answer: string
    if (askPlural) {
      const asked = Math.random() < 0.5 ? 2 : 3
      prompt = `Are there ${COUNT_WORDS[asked]} ${plural(w.en)}?`
      answer = real === asked ? ANSWERS.yesAre : ANSWERS.noArent
    } else {
      prompt = `Is there ${article(w.en)} ${w.en}?`
      answer = real > 0 ? ANSWERS.yesIs : ANSWERS.noIsnt
    }
    if (steps.some((s) => s.prompt === prompt)) {
      i--
      continue
    }
    steps.push({
      kind: 'choice',
      prompt,
      emoji: w.emoji,
      town,
      options: [ANSWERS.yesIs, ANSWERS.noIsnt, ANSWERS.yesAre, ANSWERS.noArent],
      answer,
      speak: prompt,
      tip: askPlural
        ? `Pregunta con "Are there" → respuesta con "there are / there aren't". Hay ${real} ${real === 1 ? w.en : plural(w.en)}.`
        : `Pregunta con "Is there" → respuesta con "there is / there isn't".`,
    })
  }
  return steps
}

// ───────────── Examen final: mezcla de todos los temas ─────────────

export function examSteps(topics: Topic[]): Step[] {
  const main = topics.filter((t) => !t.extra)
  const steps: Step[] = []
  for (const t of main) {
    steps.push(...quizSteps(t, 2))
    steps.push(...writeSteps(t, 1))
    steps.push(...buildSteps(t, 1))
    if (t.special?.includes('townMap')) steps.push(...townSteps(t, 2))
    if (t.special?.includes('whoIsIt')) steps.push(...whoIsItSteps(t, 1))
  }
  return shuffle(steps)
}

// ─────────────────────────────────────────────────────────────
//  Tipos del contenido. Cada tema (Topic) es un archivo en
//  src/content/ y se registra en src/content/index.ts.
//  Ver CONTENIDO.md para la guía paso a paso.
// ─────────────────────────────────────────────────────────────

/** Una palabra del vocabulario. */
export type Word = {
  en: string // inglés: "park"
  es: string // español: "parque"
  emoji: string // dibujo: "🌳"
  /** Otras respuestas en inglés que también se aceptan al escribir. */
  alt?: string[]
}

/** Una frase completa para armar, escuchar y traducir. */
export type Sentence = {
  en: string // "There is a park."
  es: string // "Hay un parque."
  emoji?: string
}

/** Pregunta de selección múltiple. `answer` debe estar dentro de `options`. */
export type Question = {
  prompt: string // "I like ___ ."
  emoji?: string
  options: string[]
  answer: string
  /** Se muestra cuando se equivoca (en español, corto). */
  tip?: string
}

/** Tarjeta "Remember!" con la regla gramatical del tema. */
export type GrammarCard = {
  title: string
  lines: string[]
  good?: string // ✅ ejemplo correcto
  bad?: string // ❌ ejemplo incorrecto
}

/** Personaje para el juego "Who is it?" (descripciones). */
export type Character = {
  name: string
  /** Color del monstruo dibujado (pelo/cuerpo). */
  color: 'green' | 'purple' | 'orange' | 'blue' | 'yellow' | 'brown' | 'black' | 'blond' | 'red' | 'pink'
  size?: 'big' | 'small'
  old?: boolean
  cute?: boolean
  /** true = niño/persona dibujada (con traje de superhéroe) en vez de monstruo. */
  person?: boolean
  lines: string[] // "He is cute", "He has green hair"...
}

export type ThemeColor = 'violet' | 'pink' | 'orange' | 'sky' | 'emerald' | 'amber' | 'rose' | 'indigo'

/** Actividades especiales que solo tienen algunos temas. */
export type SpecialActivity = 'townMap' | 'whoIsIt' | 'clock'

export type Topic = {
  id: string // sin espacios: "my-town"
  title: string // "My Town"
  subtitle: string // "There is / There are"
  emoji: string
  color: ThemeColor
  grammar: GrammarCard[]
  words: Word[]
  sentences: Sentence[]
  questions: Question[]
  characters?: Character[]
  special?: SpecialActivity[]
  /** Marca de "tema extra" (no viene en el material del examen). */
  extra?: boolean
}

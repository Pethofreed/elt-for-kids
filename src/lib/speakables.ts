import type { Topic } from '../content/types'
import { ANSWERS, article, COUNT_WORDS, isEnglishPrompt, NUMBERS, plural } from './steps'

/**
 * Todos los textos en inglés que la app puede leer en voz alta.
 * El script `npm run audio` graba un archivo por cada uno.
 */
export function collectSpeakables(topics: Topic[]): string[] {
  const out = new Set<string>()
  const add = (s?: string) => s && out.add(s)

  for (const t of topics) {
    t.words.forEach((w) => add(w.en))
    t.sentences.forEach((s) => add(s.en))
    t.grammar.forEach((g) => add(g.good))
    t.questions.forEach((q) => {
      if (isEnglishPrompt(q.prompt)) add(q.prompt)
      add(q.answer)
    })
    t.dialogue?.forEach((q) => {
      add(q.prompt)
      add(q.answer)
    })
    t.characters?.forEach((c) => {
      add(c.lines.join(' '))
      add(c.name)
    })
    if (t.special?.includes('townMap')) {
      Object.values(ANSWERS).forEach(add)
      for (const w of t.words) {
        add(`Is there ${article(w.en)} ${w.en}?`)
        for (const n of [2, 3]) add(`Are there ${COUNT_WORDS[n]} ${plural(w.en)}?`)
      }
    }
    if (t.special?.includes('clock')) {
      add('What time is it?')
      NUMBERS.forEach((n) => add(`${n} o'clock`))
    }
  }
  return [...out]
}

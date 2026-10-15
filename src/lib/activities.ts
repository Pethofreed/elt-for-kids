import type { Topic } from '../content/types'

export type ActivityId = 'learn' | 'match' | 'listen' | 'write' | 'build' | 'quiz' | 'townMap' | 'whoIsIt' | 'clock'

export const ACTIVITIES: Record<ActivityId, { title: string; desc: string; emoji: string }> = {
  learn: { title: 'Learn', desc: 'Tarjetas para repasar', emoji: '🃏' },
  match: { title: 'Match', desc: 'Une las parejas', emoji: '🔗' },
  listen: { title: 'Listen', desc: 'Escucha y elige', emoji: '🎧' },
  write: { title: 'Write', desc: 'Escríbelo en inglés', emoji: '⌨️' },
  build: { title: 'Build', desc: 'Arma la frase', emoji: '🧩' },
  quiz: { title: 'Quiz', desc: 'Elige la correcta', emoji: '✅' },
  townMap: { title: 'Town Map', desc: 'Is there…? Are there…?', emoji: '🗺️' },
  whoIsIt: { title: 'Who is it?', desc: 'Adivina el personaje', emoji: '🕵️' },
  clock: { title: "O'clock", desc: 'What time is it?', emoji: '🕖' },
}

export function activitiesFor(topic: Topic): ActivityId[] {
  const list: ActivityId[] = ['learn', 'match', 'listen', 'write', 'build', 'quiz']
  return [...list, ...(topic.special ?? [])]
}

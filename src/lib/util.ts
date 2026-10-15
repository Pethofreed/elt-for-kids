export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const pick = <T,>(arr: readonly T[], n: number): T[] => shuffle(arr).slice(0, n)

/** Normaliza para comparar respuestas: sin mayúsculas, tildes, apóstrofes ni puntuación. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`´]/g, '')
    .replace(/[.,!?¿¡;:"-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Divide una frase en fichas para armar: "I like swimming." → ["I","like","swimming."] */
export const tokens = (s: string) => s.split(/\s+/).filter(Boolean)

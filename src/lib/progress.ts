// Progreso guardado en el navegador (localStorage). Si falla, la app sigue funcionando.
const KEY = 'matt-english-progress-v1'

export type Progress = Record<string, number> // "topicId:activity" -> mejores estrellas (0-3)

export function loadProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveStars(topicId: string, activity: string, stars: number): Progress {
  const p = loadProgress()
  const k = `${topicId}:${activity}`
  if (!p[k] || stars > p[k]) p[k] = stars
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* sin almacenamiento: ignorar */
  }
  return p
}

export const starsFor = (p: Progress, topicId: string, activity: string) => p[`${topicId}:${activity}`] ?? 0

export const totalStars = (p: Progress) => Object.values(p).reduce((a, b) => a + b, 0)

export function resetProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignorar */
  }
}

/** 3 estrellas ≥ 90 %, 2 ≥ 70 %, 1 ≥ 40 %. */
export function starsFromScore(correct: number, total: number) {
  const r = total ? correct / total : 0
  return r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.4 ? 1 : 0
}

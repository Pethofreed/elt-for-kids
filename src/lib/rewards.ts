import { useSyncExternalStore } from 'react'

// Barra de recompensa: cada acierto suma puntos; al llenarla Matt gana tiempo de juego.
// Se guarda en el navegador (localStorage) y avisa a la barra para que se actualice sola.
const KEY = 'matt-english-rewards-v1'

export const POINTS_PER_CORRECT = 5
export const GOAL_OPTIONS = [25, 50, 75, 100, 125, 150, 175, 200, 250, 300]

export type Rewards = {
  points: number
  goal: number
  /** Cuántas barras ha llenado en total. */
  earned: number
  /** Nombre del niño (para el saludo del inicio). */
  name: string
}

const DEFAULT: Rewards = { points: 0, goal: 100, earned: 0, name: '' }

function read(): Rewards {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return DEFAULT
  }
}

let state: Rewards = read()
const listeners = new Set<() => void>()

function write(next: Rewards) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* sin almacenamiento: solo en memoria */
  }
  listeners.forEach((l) => l())
}

export const isFull = (r: Rewards) => r.points >= r.goal

export const getRewards = () => state

/** Suma puntos por un acierto. Devuelve true si con esto se llenó la barra. */
export function addCorrect(): boolean {
  if (isFull(state)) return false
  const points = Math.min(state.goal, state.points + POINTS_PER_CORRECT)
  const full = points >= state.goal
  write({ ...state, points, earned: state.earned + (full ? 1 : 0) })
  return full
}

export function setGoal(goal: number) {
  const wasFull = isFull(state)
  const nowFull = state.points >= goal
  write({ ...state, goal, points: Math.min(state.points, goal), earned: state.earned + (!wasFull && nowFull ? 1 : 0) })
}

export function setName(name: string) {
  write({ ...state, name: name.slice(0, 20) })
}

/** Vacía la barra para empezar a ganar el siguiente premio. */
export function resetBar() {
  write({ ...state, points: 0 })
}

export function useRewards(): Rewards {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}

/** Color de la barra: morado → rosa → rojo → naranja → amarillo → verde al llenarse. */
export function barColor(ratio: number) {
  const hue = (275 + 205 * Math.min(1, ratio)) % 360
  return `hsl(${hue} 85% 52%)`
}

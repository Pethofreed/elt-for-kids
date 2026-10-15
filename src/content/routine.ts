import type { Topic } from './types'

// Tema extra: no viene en el material del examen, pero Matt ya lo vio.
const routine: Topic = {
  id: 'routine',
  title: 'My Routine',
  subtitle: "I wake up at six o'clock",
  emoji: '⏰',
  color: 'amber',
  extra: true,
  special: ['clock'],
  grammar: [
    {
      title: "I + action + at + hour + o'clock",
      lines: ["I wake up at six o'clock.", "= Me despierto a las seis en punto.", "o'clock = en punto 🕕"],
      good: "I go to school at seven o'clock.",
      bad: "I go to school in seven o'clock.",
    },
  ],
  words: [
    { en: 'wake up', es: 'despertarse', emoji: '⏰' },
    { en: 'brush my teeth', es: 'cepillarme los dientes', emoji: '🪥' },
    { en: 'take a shower', es: 'bañarme', emoji: '🚿' },
    { en: 'get dressed', es: 'vestirme', emoji: '👕' },
    { en: 'have breakfast', es: 'desayunar', emoji: '🥣' },
    { en: 'go to school', es: 'ir al colegio', emoji: '🏫' },
    { en: 'have lunch', es: 'almorzar', emoji: '🍱' },
    { en: 'do my homework', es: 'hacer mi tarea', emoji: '📚' },
    { en: 'play', es: 'jugar', emoji: '⚽' },
    { en: 'have dinner', es: 'cenar', emoji: '🍝' },
    { en: 'go to bed', es: 'acostarme', emoji: '🛏️' },
  ],
  sentences: [
    { en: "I wake up at six o'clock.", es: 'Me despierto a las seis.', emoji: '⏰' },
    { en: "I have breakfast at seven o'clock.", es: 'Desayuno a las siete.', emoji: '🥣' },
    { en: "I go to school at seven o'clock.", es: 'Voy al colegio a las siete.', emoji: '🏫' },
    { en: "I have lunch at twelve o'clock.", es: 'Almuerzo a las doce.', emoji: '🍱' },
    { en: "I do my homework at three o'clock.", es: 'Hago mi tarea a las tres.', emoji: '📚' },
    { en: "I have dinner at seven o'clock.", es: 'Ceno a las siete.', emoji: '🍝' },
    { en: "I go to bed at nine o'clock.", es: 'Me acuesto a las nueve.', emoji: '🛏️' },
    { en: 'I brush my teeth.', es: 'Me cepillo los dientes.', emoji: '🪥' },
  ],
  questions: [
    { prompt: "I ___ up at six o'clock.", emoji: '⏰', options: ['wake', 'go', 'have'], answer: 'wake' },
    { prompt: "I ___ breakfast at seven o'clock.", emoji: '🥣', options: ['have', 'go', 'wake'], answer: 'have' },
    { prompt: "I go to ___ at nine o'clock.", emoji: '🛏️', options: ['bed', 'school', 'lunch'], answer: 'bed' },
    { prompt: "I go to school ___ seven o'clock.", emoji: '🏫', options: ['at', 'in', 'on'], answer: 'at' },
    { prompt: 'I brush my ___ .', emoji: '🪥', options: ['teeth', 'hair', 'bed'], answer: 'teeth' },
    { prompt: 'I do my ___ .', emoji: '📚', options: ['homework', 'breakfast', 'school'], answer: 'homework' },
  ],
}

export default routine

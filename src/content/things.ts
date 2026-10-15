import type { Topic } from './types'

const things: Topic = {
  id: 'things',
  title: 'My Words',
  subtitle: 'Things & places',
  emoji: '🧸',
  color: 'indigo',
  section: 'vocab',
  grammar: [
    {
      title: 'There is a …',
      lines: ['There is a robot. = Hay un robot.', 'There is a house. = Hay una casa.'],
      good: 'There is a doll.',
      bad: 'There are a doll.',
    },
  ],
  words: [
    { en: 'house', es: 'casa', emoji: '🏠' },
    { en: 'robot', es: 'robot', emoji: '🤖' },
    { en: 'box', es: 'caja', emoji: '📦' },
    { en: 'doll', es: 'muñeca', emoji: '🪆' },
    { en: 'table', es: 'mesa', emoji: '🍽️' },
    { en: 'church', es: 'iglesia', emoji: '⛪' },
    { en: 'café', es: 'cafetería', emoji: '☕', alt: ['cafe'] },
    { en: 'library', es: 'biblioteca', emoji: '📚' },
    { en: 'bakery', es: 'panadería', emoji: '🥖' },
    { en: 'bank', es: 'banco', emoji: '🏦' },
    { en: 'park', es: 'parque', emoji: '🌳' },
    { en: 'bus station', es: 'terminal de buses', emoji: '🚌' },
    { en: 'school', es: 'colegio', emoji: '🏫' },
    { en: 'cinema', es: 'cine', emoji: '🎬' },
  ],
  sentences: [
    { en: 'There is a robot.', es: 'Hay un robot.', emoji: '🤖' },
    { en: 'There is a box.', es: 'Hay una caja.', emoji: '📦' },
    { en: 'There is a doll.', es: 'Hay una muñeca.', emoji: '🪆' },
    { en: 'There is a table.', es: 'Hay una mesa.', emoji: '🍽️' },
    { en: 'There is a house.', es: 'Hay una casa.', emoji: '🏠' },
    { en: 'There is a library.', es: 'Hay una biblioteca.', emoji: '📚' },
    { en: 'There is a bakery.', es: 'Hay una panadería.', emoji: '🥖' },
  ],
  questions: [
    { prompt: 'There is a ___ .', emoji: '🤖', options: ['robot', 'doll', 'box'], answer: 'robot' },
    { prompt: 'There is a ___ .', emoji: '📦', options: ['box', 'table', 'house'], answer: 'box' },
    { prompt: 'There is a ___ .', emoji: '🪆', options: ['doll', 'robot', 'bank'], answer: 'doll' },
    { prompt: 'There is a ___ .', emoji: '🏠', options: ['house', 'school', 'church'], answer: 'house' },
    { prompt: '¿En qué comemos?', emoji: '🍽️', options: ['table', 'box', 'bank'], answer: 'table' },
    { prompt: '¿Dónde compras el pan? 🍞', emoji: '🥖', options: ['bakery', 'library', 'cinema'], answer: 'bakery' },
    { prompt: '¿Dónde lees libros? 📖', emoji: '📚', options: ['library', 'park', 'bank'], answer: 'library' },
    { prompt: '¿Dónde tomas el bus?', emoji: '🚌', options: ['bus station', 'school', 'café'], answer: 'bus station' },
    { prompt: '¿Dónde tomas café? ☕', emoji: '☕', options: ['café', 'church', 'park'], answer: 'café' },
    { prompt: '¿Dónde juegas al aire libre? 🌳', emoji: '🌳', options: ['park', 'bank', 'box'], answer: 'park' },
  ],
}

export default things

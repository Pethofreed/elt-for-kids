// PLANTILLA para un tema nuevo.
// 1. Copia este archivo con otro nombre, ej: animals.ts
// 2. Cambia el id, el título y el contenido.
// 3. Regístralo en src/content/index.ts
import type { Topic } from './types'

const nuevoTema: Topic = {
  id: 'animals', // único, sin espacios
  title: 'Animals',
  subtitle: 'It is a dog',
  emoji: '🐶',
  color: 'indigo', // violet | pink | orange | sky | emerald | amber | rose | indigo
  grammar: [
    {
      title: 'It is a … ',
      lines: ['It is a dog. = Es un perro.'],
      good: 'It is a cat.',
      bad: 'It are a cat.',
    },
  ],
  // Mínimo 6 palabras para el juego de parejas
  words: [
    { en: 'dog', es: 'perro', emoji: '🐶' },
    { en: 'cat', es: 'gato', emoji: '🐱' },
    { en: 'bird', es: 'pájaro', emoji: '🐦' },
    { en: 'fish', es: 'pez', emoji: '🐟' },
    { en: 'horse', es: 'caballo', emoji: '🐴' },
    { en: 'cow', es: 'vaca', emoji: '🐮' },
  ],
  sentences: [
    { en: 'It is a dog.', es: 'Es un perro.', emoji: '🐶' },
  ],
  questions: [
    { prompt: 'It ___ a cat.', emoji: '🐱', options: ['is', 'are'], answer: 'is', tip: 'It + is' },
  ],
}

export default nuevoTema

import type { Topic } from './types'

const hobbies: Topic = {
  id: 'hobbies',
  title: 'My Hobby Club',
  subtitle: 'I like / I love + -ING',
  emoji: '🎨',
  color: 'pink',
  grammar: [
    {
      title: 'I like / I love + VERB + ING',
      lines: ['I like = me gusta 👍', 'I love = me encanta ❤️', 'El verbo SIEMPRE termina en -ING'],
      good: 'I like swimming.',
      bad: 'I like swim.',
    },
    {
      title: 'Ask your friend',
      lines: ['What do you like to do?', '→ I like drawing.', '→ I love dancing.'],
    },
  ],
  words: [
    { en: 'eating', es: 'comer', emoji: '🍽️' },
    { en: 'running', es: 'correr', emoji: '🏃' },
    { en: 'playing video games', es: 'jugar videojuegos', emoji: '🎮' },
    { en: 'playing sports', es: 'hacer deporte', emoji: '⚽', alt: ['playing sport'] },
    { en: 'swimming', es: 'nadar', emoji: '🏊' },
    { en: 'dancing', es: 'bailar', emoji: '💃' },
    { en: 'singing', es: 'cantar', emoji: '🎤' },
    { en: 'drawing', es: 'dibujar', emoji: '✏️' },
    { en: 'painting', es: 'pintar', emoji: '🎨' },
    { en: 'watching movies', es: 'ver películas', emoji: '🎬' },
  ],
  sentences: [
    { en: 'I love painting.', es: 'Me encanta pintar.', emoji: '🎨' },
    { en: 'I like running.', es: 'Me gusta correr.', emoji: '🏃' },
    { en: 'I love dancing.', es: 'Me encanta bailar.', emoji: '💃' },
    { en: 'I like singing.', es: 'Me gusta cantar.', emoji: '🎤' },
    { en: 'I love drawing.', es: 'Me encanta dibujar.', emoji: '✏️' },
    { en: 'I like swimming.', es: 'Me gusta nadar.', emoji: '🏊' },
    { en: 'I love eating.', es: 'Me encanta comer.', emoji: '🍽️' },
    { en: 'I like playing video games.', es: 'Me gusta jugar videojuegos.', emoji: '🎮' },
    { en: 'I love watching movies.', es: 'Me encanta ver películas.', emoji: '🎬' },
    { en: 'I like playing sports.', es: 'Me gusta hacer deporte.', emoji: '⚽' },
    { en: 'What do you like to do?', es: '¿Qué te gusta hacer?', emoji: '❓' },
  ],
  questions: [
    { prompt: 'I like ___ .', emoji: '🏊', options: ['swim', 'swimming', 'swims'], answer: 'swimming', tip: 'Después de like / love el verbo lleva -ING.' },
    { prompt: 'I love ___ .', emoji: '💃', options: ['dancing', 'dance', 'dances'], answer: 'dancing', tip: 'Después de like / love el verbo lleva -ING.' },
    { prompt: 'Rapunzel, what do you like to do?', emoji: '🎨', options: ['I love painting.', 'I love paint.', 'I painting love.'], answer: 'I love painting.' },
    { prompt: 'Pascal, what do you like to do?', emoji: '🏊', options: ['I like swim.', 'I like swimming.', 'I swimming.'], answer: 'I like swimming.' },
    { prompt: 'What do you like to do?', emoji: '🎮', options: ['I like play video games.', 'I like playing video games.', 'I video games like.'], answer: 'I like playing video games.' },
    { prompt: '¿Cuál está bien? ✅', emoji: '🎤', options: ['I like singing.', 'I like sing.'], answer: 'I like singing.', tip: 'Recuerda: I like + verbo + ING.' },
    { prompt: 'I love ___ movies.', emoji: '🎬', options: ['watch', 'watching', 'watches'], answer: 'watching' },
    { prompt: 'I like playing ___ .', emoji: '⚽', options: ['sports', 'movies', 'painting'], answer: 'sports' },
    { prompt: 'I love ___ .', emoji: '🍽️', options: ['eat', 'eats', 'eating'], answer: 'eating' },
    { prompt: 'I love ___ .', emoji: '✏️', options: ['drawing', 'running', 'singing'], answer: 'drawing' },
    { prompt: '¿Cómo se dice "me encanta"?', emoji: '❤️', options: ['I love', 'I like', "I don't like"], answer: 'I love' },
    { prompt: 'I like ___ .', emoji: '🏃', options: ['running', 'swimming', 'eating'], answer: 'running' },
  ],
}

export default hobbies

import type { Topic } from './types'

const animals: Topic = {
  id: 'animals',
  title: 'Animals',
  subtitle: 'dog, cat, bird…',
  emoji: '🐶',
  color: 'emerald',
  section: 'vocab',
  grammar: [
    {
      title: 'Animals + adjectives',
      lines: ['The elephant is big. 🐘', 'The mouse is small. 🐭', 'I like dogs. 🐶'],
      good: 'The lion is strong.',
      bad: 'The lion are strong.',
    },
  ],
  words: [
    { en: 'dog', es: 'perro', emoji: '🐶' },
    { en: 'cat', es: 'gato', emoji: '🐱' },
    { en: 'bird', es: 'pájaro', emoji: '🐦' },
    { en: 'fish', es: 'pez', emoji: '🐟' },
    { en: 'rabbit', es: 'conejo', emoji: '🐰' },
    { en: 'horse', es: 'caballo', emoji: '🐴' },
    { en: 'cow', es: 'vaca', emoji: '🐮' },
    { en: 'pig', es: 'cerdo', emoji: '🐷' },
    { en: 'duck', es: 'pato', emoji: '🦆' },
    { en: 'chicken', es: 'gallina', emoji: '🐔', alt: ['hen'] },
    { en: 'mouse', es: 'ratón', emoji: '🐭' },
    { en: 'lion', es: 'león', emoji: '🦁' },
    { en: 'elephant', es: 'elefante', emoji: '🐘' },
    { en: 'monkey', es: 'mono', emoji: '🐵' },
    { en: 'frog', es: 'rana', emoji: '🐸' },
  ],
  sentences: [
    { en: 'The elephant is big.', es: 'El elefante es grande.', emoji: '🐘' },
    { en: 'The mouse is small.', es: 'El ratón es pequeño.', emoji: '🐭' },
    { en: 'The lion is strong.', es: 'El león es fuerte.', emoji: '🦁' },
    { en: 'The rabbit is fast.', es: 'El conejo es rápido.', emoji: '🐰' },
    { en: 'The cat is cute.', es: 'El gato es tierno.', emoji: '🐱' },
    { en: 'The monkey is funny.', es: 'El mono es chistoso.', emoji: '🐵' },
    { en: 'I like dogs.', es: 'Me gustan los perros.', emoji: '🐶' },
    { en: 'The frog is green.', es: 'La rana es verde.', emoji: '🐸' },
  ],
  questions: [
    { prompt: 'The elephant is ___ .', emoji: '🐘', options: ['big', 'small'], answer: 'big' },
    { prompt: 'The mouse is ___ .', emoji: '🐭', options: ['small', 'big'], answer: 'small' },
    { prompt: '¡Guau, guau! ¿Qué animal es?', emoji: '🐶', options: ['dog', 'cat', 'cow'], answer: 'dog' },
    { prompt: '¡Miau! ¿Qué animal es?', emoji: '🐱', options: ['cat', 'duck', 'pig'], answer: 'cat' },
    { prompt: '¡Muuu! ¿Qué animal es?', emoji: '🐮', options: ['cow', 'horse', 'frog'], answer: 'cow' },
    { prompt: '¡Cua, cua! ¿Qué animal es?', emoji: '🦆', options: ['duck', 'chicken', 'bird'], answer: 'duck' },
    { prompt: '¿Cuál vive en el agua?', emoji: '🐟', options: ['fish', 'lion', 'rabbit'], answer: 'fish' },
    { prompt: '¿Cuál puede volar?', emoji: '🐦', options: ['bird', 'pig', 'horse'], answer: 'bird' },
    { prompt: 'The lion ___ strong.', emoji: '🦁', options: ['is', 'are'], answer: 'is' },
    { prompt: 'The frog is ___ .', emoji: '🐸', options: ['green', 'pink', 'black'], answer: 'green' },
  ],
}

export default animals

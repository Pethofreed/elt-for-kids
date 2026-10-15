import type { Topic } from './types'

const colors: Topic = {
  id: 'colors',
  title: 'Colors',
  subtitle: 'red, blue, yellow…',
  emoji: '🌈',
  color: 'amber',
  section: 'vocab',
  grammar: [
    {
      title: 'Colors',
      lines: ['I like blue. 💙', 'The frog is green. 🐸', 'She has black hair. 🖤'],
      good: 'The banana is yellow.',
      bad: 'The banana are yellow.',
    },
  ],
  words: [
    { en: 'red', es: 'rojo', emoji: '🔴' },
    { en: 'blue', es: 'azul', emoji: '🔵' },
    { en: 'yellow', es: 'amarillo', emoji: '🟡' },
    { en: 'green', es: 'verde', emoji: '🟢' },
    { en: 'orange', es: 'naranja', emoji: '🟠' },
    { en: 'purple', es: 'morado', emoji: '🟣' },
    { en: 'pink', es: 'rosado', emoji: '🩷' },
    { en: 'black', es: 'negro', emoji: '⚫' },
    { en: 'white', es: 'blanco', emoji: '⚪' },
    { en: 'brown', es: 'café / marrón', emoji: '🟤' },
  ],
  sentences: [
    { en: 'I like blue.', es: 'Me gusta el azul.', emoji: '🔵' },
    { en: 'I like red.', es: 'Me gusta el rojo.', emoji: '🔴' },
    { en: 'The frog is green.', es: 'La rana es verde.', emoji: '🐸' },
    { en: 'The banana is yellow.', es: 'El banano es amarillo.', emoji: '🍌' },
    { en: 'The pig is pink.', es: 'El cerdo es rosado.', emoji: '🐷' },
    { en: 'She has black hair.', es: 'Ella tiene el cabello negro.', emoji: '🖤' },
  ],
  questions: [
    { prompt: 'The banana is…', emoji: '🍌', options: ['yellow', 'blue', 'black'], answer: 'yellow' },
    { prompt: 'The frog is…', emoji: '🐸', options: ['green', 'red', 'white'], answer: 'green' },
    { prompt: 'The strawberry is…', emoji: '🍓', options: ['red', 'green', 'purple'], answer: 'red' },
    { prompt: 'The sea is…', emoji: '🌊', options: ['blue', 'brown', 'pink'], answer: 'blue' },
    { prompt: 'The orange is…', emoji: '🍊', options: ['orange', 'blue', 'black'], answer: 'orange' },
    { prompt: 'The pig is…', emoji: '🐷', options: ['pink', 'green', 'yellow'], answer: 'pink' },
    { prompt: 'Snow is…', emoji: '⛄', options: ['white', 'black', 'red'], answer: 'white' },
    { prompt: 'Chocolate is…', emoji: '🍫', options: ['brown', 'white', 'blue'], answer: 'brown' },
    { prompt: 'The grapes are…', emoji: '🍇', options: ['purple', 'yellow', 'orange'], answer: 'purple' },
    { prompt: 'What color is it?', emoji: '⚫', options: ['black', 'white', 'brown'], answer: 'black' },
  ],
}

export default colors

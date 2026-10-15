import type { Topic } from './types'

const likes: Topic = {
  id: 'likes',
  title: 'Likes & Dislikes',
  subtitle: "I like / I don't like",
  emoji: '👍',
  color: 'emerald',
  grammar: [
    {
      title: "I like 👍  /  I don't like 👎",
      lines: ['I like space. = Me gusta el espacio.', "I don't like bananas. = No me gustan los bananos."],
      good: "I don't like loud noises.",
      bad: 'I no like loud noises.',
    },
    {
      title: 'Introduce yourself',
      lines: ['My name is Daniel.', 'I am 23 years old.', '¡Ahora tú! My name is ___ . I am ___ years old.'],
    },
  ],
  words: [
    { en: 'I like', es: 'me gusta', emoji: '👍' },
    { en: "I don't like", es: 'no me gusta', emoji: '👎', alt: ['i do not like', 'i dont like'] },
    { en: 'space', es: 'el espacio', emoji: '🪐' },
    { en: 'banana', es: 'banano', emoji: '🍌' },
    { en: 'loud noises', es: 'ruidos fuertes', emoji: '📢' },
    { en: 'yellow', es: 'amarillo', emoji: '💛' },
    { en: 'purple', es: 'morado', emoji: '💜' },
    { en: 'name', es: 'nombre', emoji: '📛' },
    { en: 'years old', es: 'años (de edad)', emoji: '🎂' },
  ],
  sentences: [
    { en: 'I like space.', es: 'Me gusta el espacio.', emoji: '🪐' },
    { en: 'I like Spider-Man.', es: 'Me gusta Spider-Man.', emoji: '🕷️' },
    { en: 'I like yellow.', es: 'Me gusta el amarillo.', emoji: '💛' },
    { en: 'I like purple.', es: 'Me gusta el morado.', emoji: '💜' },
    { en: "I don't like bananas.", es: 'No me gustan los bananos.', emoji: '🍌' },
    { en: "I don't like loud noises.", es: 'No me gustan los ruidos fuertes.', emoji: '📢' },
    { en: 'My name is Daniel.', es: 'Mi nombre es Daniel.', emoji: '🙋‍♂️' },
    { en: 'I am 23 years old.', es: 'Tengo 23 años.', emoji: '🎂' },
  ],
  questions: [
    { prompt: '👍 + 🪐 = ?', emoji: '🪐', options: ['I like space.', "I don't like space."], answer: 'I like space.' },
    { prompt: '👎 + 🍌 = ?', emoji: '🍌', options: ['I like bananas.', "I don't like bananas."], answer: "I don't like bananas." },
    { prompt: '👎 + 📢 = ?', emoji: '📢', options: ["I don't like loud noises.", 'I like loud noises.'], answer: "I don't like loud noises." },
    { prompt: '👍 + 🕷️ = ?', emoji: '🕷️', options: ["I don't like Spider-Man.", 'I like Spider-Man.'], answer: 'I like Spider-Man.' },
    { prompt: '¿Cómo se dice "no me gusta"?', emoji: '👎', options: ["I don't like", 'I no like', 'I not like'], answer: "I don't like" },
    { prompt: 'My ___ is Daniel.', emoji: '🙋‍♂️', options: ['name', 'old', 'like'], answer: 'name' },
    { prompt: 'I am 23 years ___ .', emoji: '🎂', options: ['name', 'old', 'like'], answer: 'old' },
    { prompt: '¿Cuál está bien? ✅', emoji: '📢', options: ["I don't like loud noises.", "I doesn't like loud noises."], answer: "I don't like loud noises." },
    { prompt: 'I like ___ .', emoji: '💛', options: ['yellow', 'purple', 'banana'], answer: 'yellow' },
    { prompt: 'I like ___ .', emoji: '💜', options: ['yellow', 'purple', 'space'], answer: 'purple' },
  ],
}

export default likes

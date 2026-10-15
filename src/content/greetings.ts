import type { Topic } from './types'

const greetings: Topic = {
  id: 'greetings',
  title: 'Hello & Goodbye',
  subtitle: 'How are you? · What is your name?',
  emoji: '👋',
  color: 'rose',
  special: ['chat'],
  grammar: [
    {
      title: 'Greetings — Saludos',
      lines: ['Hello! = ¡Hola!', 'Good morning ☀️ (mañana)', 'Good afternoon 🌤️ (tarde)', 'Good evening 🌆 (noche, al llegar)', 'Good night 🌙 (noche, al irse a dormir)'],
    },
    {
      title: 'Goodbye — Despedidas',
      lines: ['Bye! = ¡Chao!', 'Goodbye! = ¡Adiós!'],
    },
    {
      title: 'How are you?',
      lines: ["I'm fine. 🙂", "I'm good. 😊", "I'm very good. 😄", "I'm very well. 😁"],
      good: "How are you? — I'm fine.",
      bad: 'How are you? — My name is Tom.',
    },
    {
      title: 'What is your name?',
      lines: ['My name is Tom.', 'How old are you? — I\'m six years old.'],
      good: 'What is your name? — My name is Tom.',
      bad: "What is your name? — I'm six years old.",
    },
  ],
  words: [
    { en: 'hello', es: 'hola', emoji: '👋' },
    { en: 'good morning', es: 'buenos días', emoji: '🌅' },
    { en: 'good afternoon', es: 'buenas tardes', emoji: '🌤️' },
    { en: 'good evening', es: 'buenas noches (al llegar)', emoji: '🌆' },
    { en: 'good night', es: 'buenas noches (a dormir)', emoji: '🌙' },
    { en: 'bye', es: 'chao', emoji: '🙋' },
    { en: 'goodbye', es: 'adiós', emoji: '🚪', alt: ['good bye'] },
    { en: 'fine', es: 'bien', emoji: '🙂', alt: ['good'] },
    { en: 'very well', es: 'muy bien', emoji: '😄', alt: ['very good'] },
  ],
  sentences: [
    { en: 'Hello! How are you?', es: '¡Hola! ¿Cómo estás?', emoji: '👋' },
    { en: "I'm fine.", es: 'Estoy bien.', emoji: '🙂' },
    { en: "I'm very well.", es: 'Estoy muy bien.', emoji: '😄' },
    { en: "I'm very good.", es: 'Estoy muy bien.', emoji: '😊' },
    { en: 'What is your name?', es: '¿Cómo te llamas?', emoji: '❓' },
    { en: 'My name is Tom.', es: 'Me llamo Tom.', emoji: '📛' },
    { en: "I'm six years old.", es: 'Tengo seis años.', emoji: '🎂' },
    { en: 'Good morning, teacher!', es: '¡Buenos días, profe!', emoji: '🌅' },
    { en: 'Good night!', es: '¡Buenas noches! (a dormir)', emoji: '🌙' },
    { en: 'Goodbye, teacher!', es: '¡Adiós, profe!', emoji: '🚪' },
  ],
  questions: [
    { prompt: '☀️ 8:00 a.m. You see your teacher:', emoji: '🌅', options: ['Good morning!', 'Good night!', 'Good afternoon!'], answer: 'Good morning!' },
    { prompt: '🌤️ 3:00 p.m. You see your friend:', emoji: '🌤️', options: ['Good afternoon!', 'Good morning!', 'Good night!'], answer: 'Good afternoon!' },
    { prompt: '🌆 7:00 p.m. You arrive at a party:', emoji: '🌆', options: ['Good evening!', 'Good morning!', 'Goodbye!'], answer: 'Good evening!', tip: 'Good evening = buenas noches al LLEGAR.' },
    { prompt: '🛏️ Time to sleep! You say:', emoji: '🌙', options: ['Good night!', 'Good evening!', 'Hello!'], answer: 'Good night!', tip: 'Good night = buenas noches para DORMIR o despedirse.' },
    { prompt: 'How are you?', emoji: '🙂', options: ["I'm fine.", 'My name is Tom.', 'I brush my teeth.'], answer: "I'm fine." },
    { prompt: 'How are you?', emoji: '😄', options: ['Very good!', 'Good morning!', "I'm six years old."], answer: 'Very good!' },
    { prompt: 'What is your name?', emoji: '📛', options: ['My name is Tom.', 'I brush my teeth.', 'Good morning.', "I'm six years old."], answer: 'My name is Tom.' },
    { prompt: 'How old are you?', emoji: '🎂', options: ["I'm six years old.", 'My name is Tom.', "I'm fine."], answer: "I'm six years old." },
    { prompt: '🏫 You arrive at school. You say:', emoji: '👋', options: ['Hello!', 'Goodbye!'], answer: 'Hello!' },
    { prompt: '🎒 The class is over. You say:', emoji: '🚪', options: ['Goodbye!', 'Hello!'], answer: 'Goodbye!' },
    { prompt: '¿Cómo se dice "buenas tardes"?', emoji: '🌤️', options: ['Good afternoon', 'Good evening', 'Good morning'], answer: 'Good afternoon' },
    { prompt: '¿Cómo se dice "¿cómo te llamas?"', emoji: '❓', options: ['What is your name?', 'How are you?', 'How old are you?'], answer: 'What is your name?' },
  ],
  // Conversación con la profe (actividad "Chat"), en este orden
  dialogue: [
    { prompt: 'Hello! 👋', options: ['Hello!', 'Good night!', 'I brush my teeth.'], answer: 'Hello!' },
    { prompt: 'Good morning!', options: ['Good morning, teacher!', 'Goodbye!', 'My name is Tom.'], answer: 'Good morning, teacher!' },
    { prompt: 'How are you?', options: ["I'm very well.", 'My name is Tom.', "I'm six years old."], answer: "I'm very well." },
    { prompt: 'What is your name?', options: ['My name is Tom.', 'I brush my teeth.', 'Good morning.', 'Very good!'], answer: 'My name is Tom.' },
    { prompt: 'How old are you?', options: ["I'm six years old.", "I'm fine.", 'Hello!'], answer: "I'm six years old." },
    { prompt: 'What do you like to do?', options: ['I like drawing.', 'I like draw.', 'Good afternoon.'], answer: 'I like drawing.' },
    { prompt: 'Goodbye, Tom!', options: ['Bye, teacher!', 'Hello, teacher!', 'Good morning!'], answer: 'Bye, teacher!' },
  ],
}

export default greetings

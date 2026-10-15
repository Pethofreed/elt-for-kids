# ✏️ Cómo agregar contenido nuevo

Todo el contenido vive en `src/content/`. Cada tema es **un archivo**.
Los juegos (tarjetas, parejas, escuchar, escribir, armar frases y quiz) se generan
**solos** a partir de esas listas. No hay que programar nada.

## Agregar palabras o frases a un tema que ya existe

Abre el archivo del tema (por ejemplo `src/content/town.ts`) y agrega una línea
(después corre `npm run audio`, ver paso 4 más abajo):

```ts
words: [
  { en: 'park', es: 'parque', emoji: '🌳' },
  { en: 'zoo', es: 'zoológico', emoji: '🦁' },   // ← nueva
],
sentences: [
  { en: 'There is a zoo.', es: 'Hay un zoológico.', emoji: '🦁' },   // ← nueva
],
questions: [
  { prompt: 'There ___ a zoo.', emoji: '🦁', options: ['is', 'are'], answer: 'is', tip: 'Uno solo → There is' },
],
```

- `alt`: otras respuestas válidas al escribir, ej. `alt: ['dad']` para `father`.
- En `questions`, `answer` debe ser **exactamente igual** a una de las `options`.
- `tip` (opcional) es la ayuda en español que sale cuando se equivoca.

## Crear un tema nuevo

1. Copia `src/content/_plantilla.ts` con otro nombre (ej. `animals.ts`).
2. Cambia `id`, `title`, `subtitle`, `emoji`, `color` y el contenido.
   Pon **mínimo 6 palabras** (para el juego de parejas).
3. Regístralo en `src/content/index.ts`:

```ts
import animals from './animals'
export const topics: Topic[] = [hobbies, likes, descriptions, friends, town, routine, animals]
```

4. Audios: **se graban solos al hacer commit** (en tu Mac, voz "Samantha" en inglés).
   Si el commit cambia algo en `src/content/`, el hook `.githooks/pre-commit` corre
   `npm run audio`, graba lo nuevo, borra lo que sobra y lo incluye en el commit.
   También puedes correrlo a mano cuando quieras:

```bash
npm run audio   # solo graba lo nuevo; tarda unos segundos por frase
```

   Sin audio grabado, la app usa la voz del navegador para esos textos
   (puede sonar en español en algunos dispositivos, como Brave).

5. Sube los cambios a GitHub y Vercel publica la nueva versión solo:

```bash
git add . && git commit -m "Nuevo tema: animals" && git push
```

## Probar en tu computador antes de subir

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:5173
```

Colores disponibles: `violet`, `pink`, `orange`, `sky`, `emerald`, `amber`, `rose`, `indigo`.
Emojis: en Mac usa `Ctrl + Cmd + Espacio` para elegirlos.

## Opciones extra de un tema

- `section: 'vocab'` → el tema aparece en la sección **🧩 Vocabulario** del menú
  (sin esto aparece en **💬 Frases y temas**).
- `dialogue: [...]` + `special: ['chat']` → activa el juego **💬 Chat**: la profe pregunta
  y Matt elige la respuesta, en el orden escrito. Mismo formato que `questions`.
  Ver ejemplo en `src/content/greetings.ts`.
- `extra: true` → marca el tema como EXTRA y no entra en el Final Exam.

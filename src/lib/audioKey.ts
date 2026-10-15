// Clave de audio compartida entre el script que graba (scripts/gen-audio.ts) y la app.

/** Texto limpio para leer en voz alta: sin emojis y con el espacio en blanco normalizado. */
export function speechText(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}|️|‍|[\u{1F1E6}-\u{1F1FF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Nombre de archivo estable para un texto (hash djb2 en base 36). */
export function audioKey(text: string): string {
  const s = speechText(text).toLowerCase()
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0
  return h.toString(36)
}

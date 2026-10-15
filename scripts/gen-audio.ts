// Graba los audios en inglés con la voz "Samantha" de macOS (comandos `say` y `afconvert`).
// Uso: npm run audio   → solo graba los textos nuevos y borra los que ya no se usan.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { topics } from '../src/content'
import { audioKey, speechText } from '../src/lib/audioKey'
import { collectSpeakables } from '../src/lib/speakables'

const VOICE = 'Samantha'
const RATE = '155' // palabras por minuto (más lento que lo normal, para niños)
const OUT = 'public/audio'

mkdirSync(OUT, { recursive: true })
const texts = collectSpeakables(topics)
const keys = new Map<string, string>()
for (const t of texts) if (!keys.has(audioKey(t))) keys.set(audioKey(t), t)

let made = 0
const tmp = join(tmpdir(), 'elt-audio.aiff')
for (const [key, text] of keys) {
  const file = join(OUT, `${key}.m4a`)
  if (existsSync(file)) continue
  // "___" → pausa corta en vez de leer los guiones
  const say = speechText(text).replace(/_{2,}/g, '[[slnc 500]]')
  execFileSync('say', ['-v', VOICE, '-r', RATE, '-o', tmp, say])
  execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', '-b', '48000', '-c', '1', tmp, file])
  made++
}

// Borrar audios que ya no corresponden a ningún texto
let removed = 0
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.m4a') && !keys.has(f.replace('.m4a', ''))) {
    rmSync(join(OUT, f))
    removed++
  }
}

writeFileSync(
  'src/lib/audioManifest.ts',
  `// Generado por scripts/gen-audio.ts — no editar a mano.\nexport const AUDIO_FILES: ReadonlySet<string> = new Set(${JSON.stringify([...keys.keys()].sort())})\n`,
)
console.log(`🔊 ${keys.size} audios (${made} nuevos, ${removed} borrados)`)

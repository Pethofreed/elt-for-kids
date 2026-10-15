import type { Topic } from './types'
import hobbies from './hobbies'
import likes from './likes'
import descriptions from './descriptions'
import friends from './friends'
import town from './town'
import routine from './routine'
import greetings from './greetings'
import things from './things'
import animals from './animals'
import colors from './colors'

// 👉 Para agregar un tema nuevo: crea el archivo (copia _plantilla.ts),
//    impórtalo arriba y agrégalo a esta lista. El orden es el del menú.
export const topics: Topic[] = [greetings, hobbies, likes, descriptions, friends, town, routine, things, animals, colors]

export const getTopic = (id: string) => topics.find((t) => t.id === id)

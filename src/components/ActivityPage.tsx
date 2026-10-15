import type { Topic } from '../content/types'
import { ACTIVITIES, type ActivityId } from '../lib/activities'
import { buildSteps, chatSteps, clockSteps, listenSteps, quizSteps, townSteps, whoIsItSteps, writeSteps, type Step } from '../lib/steps'
import Flashcards from './Flashcards'
import MatchGame from './MatchGame'
import StepRunner from './StepRunner'
import TopicPage from './TopicPage'

const generators: Partial<Record<ActivityId, (t: Topic) => Step[]>> = {
  listen: (t) => listenSteps(t),
  write: (t) => writeSteps(t),
  build: (t) => buildSteps(t),
  quiz: (t) => quizSteps(t),
  townMap: (t) => townSteps(t),
  whoIsIt: (t) => whoIsItSteps(t),
  clock: () => clockSteps(),
  chat: (t) => chatSteps(t),
}

export default function ActivityPage({ topic, activity }: { topic: Topic; activity: ActivityId }) {
  if (activity === 'learn') return <Flashcards topic={topic} />
  if (activity === 'match') return <MatchGame topic={topic} />
  const gen = generators[activity]
  if (!gen) return <TopicPage topic={topic} />
  const info = ACTIVITIES[activity]
  return (
    <StepRunner
      title={`${info.title} — ${topic.title}`}
      emoji={info.emoji}
      makeSteps={() => gen(topic)}
      saveKey={[topic.id, activity]}
      backTo={`topic/${topic.id}`}
    />
  )
}

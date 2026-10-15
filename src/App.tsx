import { useEffect, useState } from 'react'
import Home from './components/Home'
import TopicPage from './components/TopicPage'
import ActivityPage from './components/ActivityPage'
import ExamPage from './components/ExamPage'
import RewardBar from './components/RewardBar'
import { QuickPage } from './components/QuickPlay'
import { getTopic, topics } from './content'
import type { ActivityId } from './lib/activities'

// Enrutador mínimo por hash: #/ · #/topic/town · #/topic/town/quiz · #/exam
const parse = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)

export const go = (path: string) => {
  window.location.hash = '/' + path
}

function Screen() {
  const [parts, setParts] = useState(parse)

  useEffect(() => {
    const onHash = () => {
      setParts(parse())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const [section, id, act] = parts

  if (section === 'exam') return <ExamPage topics={topics} />

  // #/quick/<tipo>/<nonce>: el nonce reinicia el juego si se elige el mismo otra vez
  if (section === 'quick' && id) return <QuickPage kind={id} key={act ?? id} />

  if (section === 'topic' && id) {
    const topic = getTopic(id)
    if (topic && act) return <ActivityPage topic={topic} activity={act as ActivityId} key={`${id}-${act}`} />
    if (topic) return <TopicPage topic={topic} />
  }

  return <Home />
}

export default function App() {
  return (
    <>
      <RewardBar />
      <Screen />
    </>
  )
}

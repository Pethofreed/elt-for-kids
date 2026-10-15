import type { Topic } from '../content/types'
import { examSteps } from '../lib/steps'
import StepRunner from './StepRunner'

export default function ExamPage({ topics }: { topics: Topic[] }) {
  return <StepRunner title="Final Exam" emoji="🏆" makeSteps={() => examSteps(topics)} saveKey={['exam', 'exam']} backTo="" />
}

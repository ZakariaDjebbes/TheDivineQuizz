import { AnimatePresence } from 'framer-motion'
import { NodeCard } from './components/NodeCard'
import { TracePanel } from './components/TracePanel'
import { Victory } from './components/Victory'
import { useQuiz } from './quiz/useQuiz'

export default function App() {
  const quiz = useQuiz()

  return (
    <>
      <div className="starfield" aria-hidden />

      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-xl text-white">
              The Divine Quizz
            </h1>
            <p className="mt-0.5 text-xs tracking-wide text-white/35">
              After Epicurus, 341–271 BC
            </p>
          </div>

          {quiz.trace.length > 0 && (
            <button
              type="button"
              onClick={quiz.restart}
              className="cursor-pointer rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              Start over
            </button>
          )}
        </header>

        <main className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {quiz.node.kind === 'victory' ? (
                <Victory
                  key="victory"
                  steps={quiz.stats.steps}
                  loops={quiz.stats.loops}
                  loopbacks={quiz.stats.loopbacks}
                  onRestart={quiz.restart}
                />
              ) : (
                <NodeCard
                  key={quiz.node.id + ':' + quiz.stats.steps}
                  node={quiz.node}
                  lastReason={quiz.lastReason}
                  loops={quiz.loops}
                  onBinary={quiz.answerBinary}
                  onAcknowledge={quiz.acknowledge}
                  onChoose={quiz.choose}
                  onReason={quiz.submitReason}
                  onLeafExistence={quiz.answerLeafExistence}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="lg:sticky lg:top-12">
            <TracePanel trace={quiz.trace} loops={quiz.loops} />
          </div>
        </main>

        <footer className="mt-10 text-xs leading-relaxed text-white/25">
          “Is God willing to prevent evil, but not able? Then he is not
          omnipotent. Is he able, but not willing? Then he is malevolent.”
        </footer>
      </div>
    </>
  )
}

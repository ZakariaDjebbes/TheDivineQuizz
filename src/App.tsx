import { AnimatePresence } from 'framer-motion'
import { LanguagePicker } from './components/LanguagePicker'
import { NodeCard } from './components/NodeCard'
import { TracePanel } from './components/TracePanel'
import { Victory } from './components/Victory'
import { useLocale } from './i18n/LocaleContext'
import { useQuiz } from './quiz/useQuiz'

export default function App() {
  const quiz = useQuiz()
  const { t, locale } = useLocale()

  return (
    <>
      <div className="starfield" aria-hidden />

      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-xl text-white">
              The Divine Quizz
            </h1>
            <p className="mt-0.5 text-xs tracking-wide text-white/35">
              {t.ui.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {quiz.trace.length > 0 && (
              <button
                type="button"
                onClick={quiz.restart}
                className="cursor-pointer rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                {t.ui.startOver}
              </button>
            )}
            <LanguagePicker />
          </div>
        </header>

        <main className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            {/*
              The locale is part of the key so a language switch replays the
              card's entry animation rather than swapping text mid-frame.
            */}
            <AnimatePresence mode="wait">
              {quiz.node.kind === 'victory' ? (
                <Victory
                  key={`victory:${locale}`}
                  steps={quiz.stats.steps}
                  loops={quiz.stats.loops}
                  loopbacks={quiz.stats.loopbacks}
                  onRestart={quiz.restart}
                />
              ) : (
                <NodeCard
                  key={`${quiz.node.id}:${quiz.stats.steps}:${locale}`}
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
          {t.ui.quote}
        </footer>
      </div>
    </>
  )
}

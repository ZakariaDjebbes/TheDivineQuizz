import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'
import {
  acknowledgeLabel,
  optionLabel,
  promptOf,
} from '../i18n/copy'
import type { Translation } from '../i18n/types'
import type { TraceEntry } from '../quiz/useQuiz'

/** Renders a stored answer reference in the language showing right now. */
function answerLabel(t: Translation, entry: TraceEntry): string {
  switch (entry.answer.kind) {
    case 'yes':
      return t.ui.yes
    case 'no':
      return t.ui.no
    case 'acknowledge':
      return acknowledgeLabel(t, entry.promptNode)
    case 'option':
      return optionLabel(t, entry.promptNode, entry.answer.optionId)
    case 'typed':
      return entry.answer.text
  }
}

export function TracePanel({
  trace,
  loops,
}: {
  trace: TraceEntry[]
  loops: number
}) {
  const { t, dir } = useLocale()
  const listRef = useRef<HTMLOListElement>(null)
  // Entries should slide in from the side the text starts on.
  const slideFrom = dir === 'rtl' ? 8 : -8

  // Keep the most recent answer in view as the path outgrows the panel.
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [trace.length])

  return (
    <aside className="glass flex max-h-[60vh] min-h-0 flex-col rounded-3xl p-5 lg:max-h-[calc(100vh-9rem)]">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="label text-[11px] font-semibold text-white/45">
          {t.ui.yourPath}
        </h2>
        <span className="text-xs whitespace-nowrap text-white/30 tabular-nums">
          {t.ui.steps(trace.length)}
        </span>
      </div>

      {trace.length === 0 ? (
        <p className="text-sm leading-relaxed text-white/35">{t.ui.pathEmpty}</p>
      ) : (
        <ol
          ref={listRef}
          className="trace-scroll -me-2 min-h-0 flex-1 space-y-3 overflow-y-auto pe-2"
        >
          <AnimatePresence initial={false}>
            {trace.map((entry) => (
              <motion.li
                key={entry.key}
                layout
                initial={{ opacity: 0, x: slideFrom }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="relative border-s border-white/10 ps-4"
              >
                <span
                  className={`absolute top-1.5 -start-[3px] h-[5px] w-[5px] rounded-full ${
                    entry.loopback
                      ? 'bg-[color:var(--color-ember)]'
                      : 'bg-white/30'
                  }`}
                />
                <p className="text-[13px] leading-snug text-white/45">
                  {promptOf(t, entry.promptNode)}
                </p>
                <p
                  className={`mt-0.5 text-sm leading-snug font-medium ${
                    entry.answer.kind === 'typed'
                      ? 'text-[color:var(--color-halo)] italic'
                      : 'text-white/85'
                  }`}
                >
                  {answerLabel(t, entry)}
                  {entry.loopback && (
                    <span className="label ms-2 text-[10px] font-semibold text-[color:var(--color-ember)]">
                      <span aria-hidden className="inline-block rtl:-scale-x-100">
                        ↩
                      </span>{' '}
                      {t.ui.backTag}
                    </span>
                  )}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      )}

      {loops > 0 && (
        <div className="mt-4 rounded-2xl border border-[color:var(--color-ember)]/25 bg-[color:var(--color-ember)]/[0.07] px-4 py-3">
          <p className="label text-[11px] font-semibold text-[color:var(--color-ember)]">
            {t.ui.circlesWalked}
          </p>
          <p className="mt-1 text-2xl font-semibold text-white tabular-nums">
            {loops}
          </p>
        </div>
      )}
    </aside>
  )
}

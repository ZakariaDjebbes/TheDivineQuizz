import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TraceEntry } from '../quiz/useQuiz'

export function TracePanel({
  trace,
  loops,
}: {
  trace: TraceEntry[]
  loops: number
}) {
  const listRef = useRef<HTMLOListElement>(null)

  // Keep the most recent answer in view as the path outgrows the panel.
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [trace.length])

  return (
    <aside className="glass flex max-h-[60vh] min-h-0 flex-col rounded-3xl p-5 lg:max-h-[calc(100vh-9rem)]">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[11px] font-semibold tracking-[0.22em] text-white/45 uppercase">
          Your path
        </h2>
        <span className="text-xs text-white/30 tabular-nums">
          {trace.length} step{trace.length === 1 ? '' : 's'}
        </span>
      </div>

      {trace.length === 0 ? (
        <p className="text-sm leading-relaxed text-white/35">
          Every answer you give is recorded here. Watch how the road bends back
          on itself.
        </p>
      ) : (
        <ol
          ref={listRef}
          className="trace-scroll -mr-2 min-h-0 flex-1 space-y-3 overflow-y-auto pr-2"
        >
          <AnimatePresence initial={false}>
            {trace.map((entry) => (
              <motion.li
                key={entry.key}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="relative border-l border-white/10 pl-4"
              >
                <span
                  className={`absolute top-1.5 -left-[3px] h-[5px] w-[5px] rounded-full ${
                    entry.loopback
                      ? 'bg-[color:var(--color-ember)]'
                      : 'bg-white/30'
                  }`}
                />
                <p className="text-[13px] leading-snug text-white/45">
                  {entry.prompt}
                </p>
                <p
                  className={`mt-0.5 text-sm leading-snug font-medium ${
                    entry.typed
                      ? 'text-[color:var(--color-halo)] italic'
                      : 'text-white/85'
                  }`}
                >
                  {entry.answer}
                  {entry.loopback && (
                    <span className="ml-2 text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-ember)] uppercase">
                      ↩ back
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
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[color:var(--color-ember)] uppercase">
            Circles walked
          </p>
          <p className="mt-1 text-2xl font-semibold text-white tabular-nums">
            {loops}
          </p>
        </div>
      )}
    </aside>
  )
}

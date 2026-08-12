import { motion } from 'framer-motion'

export function Victory({
  steps,
  loops,
  loopbacks,
  onRestart,
}: {
  steps: number
  loops: number
  loopbacks: number
  onRestart: () => void
}) {
  // Answering "no" at the very first question is one step: straight out.
  const immediate = steps <= 1

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-full rounded-[28px] p-8 text-center sm:p-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--color-halo)]/40 bg-[color:var(--color-halo)]/10 text-4xl"
      >
        🎉
      </motion.div>

      <p className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-halo-dim)] uppercase">
        The paradox dissolves
      </p>

      <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-balance text-white sm:text-5xl">
        Congratulations.
      </h1>

      <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60">
        {immediate
          ? 'You answered in one move. No contradiction to resolve, no circle to walk — the problem of evil simply never opens.'
          : 'You found the only answer the diagram accepts without contradicting itself. Everything else led back to a question you had already answered.'}
      </p>

      {!immediate && (
        <div className="mx-auto mt-9 grid max-w-sm grid-cols-3 gap-3">
          <Stat label="Steps" value={steps} />
          <Stat label="Sent back" value={loopbacks} />
          <Stat label="Circles" value={loops} />
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 cursor-pointer rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/85 transition-all duration-200 hover:border-white/35 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.985]"
      >
        Walk it again
      </button>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
      <p className="text-2xl font-semibold text-white tabular-nums">{value}</p>
      <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
        {label}
      </p>
    </div>
  )
}

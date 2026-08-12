import { motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'

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
  const { t } = useLocale()
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

      <p className="label mb-4 text-[11px] font-semibold text-[color:var(--color-halo-dim)]">
        {t.ui.paradoxDissolves}
      </p>

      <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-balance text-white sm:text-5xl">
        {t.ui.congratulations}
      </h1>

      <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60">
        {immediate ? t.ui.victoryImmediate : t.ui.victoryWalked}
      </p>

      {!immediate && (
        <div className="mx-auto mt-9 grid max-w-sm grid-cols-3 gap-3">
          <Stat label={t.ui.statSteps} value={steps} />
          <Stat label={t.ui.statSentBack} value={loopbacks} />
          <Stat label={t.ui.statCircles} value={loops} />
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 cursor-pointer rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/85 transition-all duration-200 hover:border-white/35 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.985]"
      >
        {t.ui.walkAgain}
      </button>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
      <p className="text-2xl font-semibold text-white tabular-nums">{value}</p>
      <p className="label mt-1 text-[10px] font-semibold text-white/35">
        {label}
      </p>
    </div>
  )
}

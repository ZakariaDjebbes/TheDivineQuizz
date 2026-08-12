import type { ReactNode } from 'react'

type Tone = 'yes' | 'no' | 'neutral' | 'halo'

const TONES: Record<Tone, string> = {
  yes: 'border-[color:var(--color-verdant)]/35 hover:border-[color:var(--color-verdant)]/70 hover:bg-[color:var(--color-verdant)]/10 text-[color:var(--color-verdant)]',
  no: 'border-[color:var(--color-ember)]/35 hover:border-[color:var(--color-ember)]/70 hover:bg-[color:var(--color-ember)]/10 text-[color:var(--color-ember)]',
  neutral:
    'border-white/12 hover:border-white/30 hover:bg-white/[0.06] text-white/85',
  halo: 'border-[color:var(--color-halo)]/40 hover:border-[color:var(--color-halo)]/80 hover:bg-[color:var(--color-halo)]/10 text-[color:var(--color-halo)]',
}

export function AnswerButton({
  children,
  onClick,
  tone = 'neutral',
  full,
}: {
  children: ReactNode
  onClick: () => void
  tone?: Tone
  full?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl border px-6 py-4 text-start text-base font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.985] ${
        TONES[tone]
      } ${full ? 'w-full' : ''}`}
    >
      <span className="flex items-center justify-between gap-4">
        <span>{children}</span>
        <span
          aria-hidden
          className="text-white/25 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        >
          →
        </span>
      </span>
    </button>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="label mb-4 text-[11px] font-semibold text-[color:var(--color-halo-dim)]">
      {children}
    </p>
  )
}

export function Prompt({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-balance text-white sm:text-4xl md:text-[2.75rem]">
      {children}
    </h1>
  )
}

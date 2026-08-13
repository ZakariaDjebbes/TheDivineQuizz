import { useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizNode } from '../quiz/graph'
import { useLocale } from '../i18n/LocaleContext'
import { choiceCopy, leafCopy, premiseCopy, questionCopy } from '../i18n/copy'
import { AnswerButton, Eyebrow, Prompt } from './ui'

interface Props {
  node: QuizNode
  lastReason: string | null
  loops: number
  onBinary: (yes: boolean) => void
  onAcknowledge: () => void
  onChoose: (optionId: string) => void
  onReason: (text: string) => void
  onLeafExistence: (yes: boolean) => void
}

export function NodeCard({
  node,
  lastReason,
  loops,
  onBinary,
  onAcknowledge,
  onChoose,
  onReason,
  onLeafExistence,
}: Props) {
  const { t } = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-full rounded-[28px] p-7 sm:p-10"
    >
      {node.kind === 'binary' &&
        (() => {
          const copy = questionCopy(t, node.id)
          return (
            <>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <Prompt>{copy.prompt}</Prompt>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <AnswerButton tone="yes" full onClick={() => onBinary(true)}>
                  {t.ui.yes}
                </AnswerButton>
                <AnswerButton tone="no" full onClick={() => onBinary(false)}>
                  {t.ui.no}
                </AnswerButton>
              </div>
            </>
          )
        })()}

      {node.kind === 'premise' &&
        (() => {
          const copy = premiseCopy(t, node.id)
          return (
            <>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <Prompt>{copy.prompt}</Prompt>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                {copy.detail}
              </p>
              <div className="mt-9">
                <AnswerButton tone="halo" onClick={onAcknowledge}>
                  {copy.acknowledge}
                </AnswerButton>
              </div>
            </>
          )
        })()}

      {node.kind === 'choice' &&
        (() => {
          const copy = choiceCopy(t, node.id)
          return (
            <ChoiceBody
              key={node.id}
              eyebrow={copy.eyebrow}
              prompt={copy.prompt}
              taunt={node.id === 'why-didnt' ? t.taunt(loops) : null}
              options={node.options.map((option) => ({
                id: option.id,
                label: copy.options[option.id] ?? option.id,
              }))}
              placeholder={copy.placeholder}
              ownReasonLabel={t.ui.ownReason}
              submitLabel={t.ui.submitReason}
              onChoose={onChoose}
              onReason={onReason}
            />
          )
        })()}

      {node.kind === 'leaf' &&
        (() => {
          const copy = leafCopy(t, node.id)
          return (
            <>
              <Eyebrow>{t.ui.thenItFollows}</Eyebrow>
              <Prompt>{copy.conclusion}</Prompt>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                {copy.detail}
              </p>
              {lastReason && (
                <p className="mt-5 max-w-xl border-s-2 border-[color:var(--color-halo)]/40 ps-4 text-sm leading-relaxed text-white/40 italic">
                  {t.ui.reasonEcho(lastReason)}
                </p>
              )}

              <div className="mt-10 border-t border-white/10 pt-8">
                <Eyebrow>{t.ui.soOneMoreTime}</Eyebrow>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
                  {questionCopy(t, 'exist').prompt}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <AnswerButton
                    tone="yes"
                    full
                    onClick={() => onLeafExistence(true)}
                  >
                    {t.ui.yes}
                  </AnswerButton>
                  <AnswerButton
                    tone="no"
                    full
                    onClick={() => onLeafExistence(false)}
                  >
                    {t.ui.no}
                  </AnswerButton>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/30">
                  {t.ui.leafHint}
                </p>
              </div>
            </>
          )
        })()}
    </motion.div>
  )
}

function ChoiceBody({
  eyebrow,
  prompt,
  taunt,
  options,
  placeholder,
  ownReasonLabel,
  submitLabel,
  onChoose,
  onReason,
}: {
  eyebrow: string
  prompt: string
  taunt: string | null
  options: { id: string; label: string }[]
  placeholder: string
  ownReasonLabel: string
  submitLabel: string
  onChoose: (id: string) => void
  onReason: (text: string) => void
}) {
  const [text, setText] = useState('')

  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Prompt>{prompt}</Prompt>

      {taunt && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-[color:var(--color-ember)]/80"
        >
          {taunt}
        </motion.p>
      )}

      <div className="mt-9 grid gap-3">
        {options.map((option) => (
          <AnswerButton key={option.id} full onClick={() => onChoose(option.id)}>
            {option.label}
          </AnswerButton>
        ))}
      </div>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault()
          onReason(text)
        }}
      >
        <label
          htmlFor="reason"
          className="label mb-2 block text-[11px] font-semibold text-white/35"
        >
          {ownReasonLabel}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="reason"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-black/25 px-5 py-4 text-base text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[color:var(--color-halo)]/60"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="cursor-pointer rounded-2xl border border-[color:var(--color-halo)]/40 px-6 py-4 text-base font-medium text-[color:var(--color-halo)] transition-all duration-200 hover:bg-[color:var(--color-halo)]/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.985] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/20 disabled:hover:bg-transparent"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  )
}

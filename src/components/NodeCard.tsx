import { useState } from 'react'
import { motion } from 'framer-motion'
import { EXISTENCE_QUESTION, type QuizNode } from '../quiz/graph'
import { AnswerButton, Eyebrow, Prompt } from './ui'

/** Escalating nudges for the player stuck in the free-will circle. */
function loopTaunt(loops: number): string | null {
  if (loops <= 0) return null
  if (loops === 1) return 'You have been here before.'
  if (loops === 2) return 'Twice around. The question has not moved an inch.'
  if (loops === 3) return 'Three laps. Epicurus is still waiting.'
  if (loops < 6) return `${loops} laps. The circle does not have an exit here.`
  if (loops < 10)
    return `${loops} laps. There is one answer that ends this, and it is at the very top.`
  return `${loops} laps. Genuinely, at this point, admiration.`
}

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-full rounded-[28px] p-7 sm:p-10"
    >
      {node.kind === 'binary' && (
        <>
          {node.eyebrow && <Eyebrow>{node.eyebrow}</Eyebrow>}
          <Prompt>{node.prompt}</Prompt>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <AnswerButton tone="yes" full onClick={() => onBinary(true)}>
              Yes
            </AnswerButton>
            <AnswerButton tone="no" full onClick={() => onBinary(false)}>
              No
            </AnswerButton>
          </div>
        </>
      )}

      {node.kind === 'premise' && (
        <>
          {node.eyebrow && <Eyebrow>{node.eyebrow}</Eyebrow>}
          <Prompt>{node.prompt}</Prompt>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            {node.detail}
          </p>
          <div className="mt-9">
            <AnswerButton tone="halo" onClick={onAcknowledge}>
              {node.acknowledge}
            </AnswerButton>
          </div>
        </>
      )}

      {node.kind === 'choice' && (
        <ChoiceBody
          key={node.id}
          eyebrow={node.eyebrow}
          prompt={node.prompt}
          taunt={node.id === 'why-didnt' ? loopTaunt(loops) : null}
          options={node.options}
          placeholder={node.freeText.placeholder}
          onChoose={onChoose}
          onReason={onReason}
        />
      )}

      {node.kind === 'leaf' && (
        <>
          <Eyebrow>Then it follows that</Eyebrow>
          <Prompt>{node.conclusion}</Prompt>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            {node.detail}
          </p>
          {lastReason && (
            <p className="mt-5 max-w-xl border-l-2 border-[color:var(--color-halo)]/40 pl-4 text-sm leading-relaxed text-white/40 italic">
              Your reason — “{lastReason}” — did not survive the next question.
            </p>
          )}

          <div className="mt-10 border-t border-white/10 pt-8">
            <Eyebrow>So, one more time</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
              {EXISTENCE_QUESTION}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <AnswerButton tone="yes" full onClick={() => onLeafExistence(true)}>
                Yes
              </AnswerButton>
              <AnswerButton tone="no" full onClick={() => onLeafExistence(false)}>
                No
              </AnswerButton>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/30">
              Saying yes sends you back to the question that brought you here.
            </p>
          </div>
        </>
      )}
    </motion.div>
  )
}

function ChoiceBody({
  eyebrow,
  prompt,
  taunt,
  options,
  placeholder,
  onChoose,
  onReason,
}: {
  eyebrow?: string
  prompt: string
  taunt: string | null
  options: { id: string; label: string }[]
  placeholder: string
  onChoose: (id: string) => void
  onReason: (text: string) => void
}) {
  const [text, setText] = useState('')

  return (
    <>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
          className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/35 uppercase"
        >
          Or give your own reason
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
            Answer
          </button>
        </div>
      </form>
    </>
  )
}

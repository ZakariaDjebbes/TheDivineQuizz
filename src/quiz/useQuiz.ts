import { useCallback, useMemo, useState } from 'react'
import { GRAPH, START_NODE, type NodeId, type QuizNode } from './graph'

/**
 * What the player answered, stored as a reference rather than a rendered
 * string, so the recorded path re-renders in whatever language is active.
 */
export type TraceAnswer =
  | { kind: 'yes' }
  | { kind: 'no' }
  | { kind: 'acknowledge' }
  | { kind: 'option'; optionId: string }
  | { kind: 'typed'; text: string }

export interface TraceEntry {
  key: number
  /** Node whose prompt was shown — 'exist' when a leaf re-asked the question. */
  promptNode: NodeId
  answer: TraceAnswer
  /** True when the answer sent the player backwards in the graph. */
  loopback?: boolean
}

interface QuizState {
  current: NodeId
  /** The node that produced the leaf we are standing on, if any. */
  leafOrigin: NodeId | null
  trace: TraceEntry[]
  /** How many times the player has been thrown back to "why didn't he?". */
  loops: number
  /** The reason the player typed most recently, echoed back at them. */
  lastReason: string | null
  step: number
}

const INITIAL: QuizState = {
  current: START_NODE,
  leafOrigin: null,
  trace: [],
  loops: 0,
  lastReason: null,
  step: 0,
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL)

  const node: QuizNode = GRAPH[state.current]

  const go = useCallback(
    (
      to: NodeId,
      entry: Omit<TraceEntry, 'key'>,
      opts: { reason?: string | null } = {},
    ) => {
      setState((prev) => ({
        current: to,
        // Remember where a leaf was reached from, so "yes, God exists" can
        // send the player back to the exact question that trapped them.
        leafOrigin: GRAPH[to].kind === 'leaf' ? prev.current : null,
        trace: [...prev.trace, { ...entry, key: prev.step }],
        // The free-will branch is the one that circles: "could he have made
        // free will without evil?" -> yes -> back to "then why didn't he?".
        loops:
          prev.current === 'could-freewill' && to === 'why-didnt'
            ? prev.loops + 1
            : prev.loops,
        lastReason: opts.reason === undefined ? prev.lastReason : opts.reason,
        step: prev.step + 1,
      }))
    },
    [],
  )

  const answerBinary = useCallback(
    (yes: boolean) => {
      if (node.kind !== 'binary') return
      go(yes ? node.yes : node.no, {
        promptNode: node.id,
        answer: { kind: yes ? 'yes' : 'no' },
      })
    },
    [go, node],
  )

  const acknowledge = useCallback(() => {
    if (node.kind !== 'premise') return
    go(node.next, { promptNode: node.id, answer: { kind: 'acknowledge' } })
  }, [go, node])

  const choose = useCallback(
    (optionId: string) => {
      if (node.kind !== 'choice') return
      const option = node.options.find((candidate) => candidate.id === optionId)
      if (!option) return
      go(
        option.next,
        { promptNode: node.id, answer: { kind: 'option', optionId } },
        { reason: null },
      )
    },
    [go, node],
  )

  const submitReason = useCallback(
    (text: string) => {
      if (node.kind !== 'choice') return
      const reason = text.trim()
      if (!reason) return
      go(
        node.freeTextNext,
        { promptNode: node.id, answer: { kind: 'typed', text: reason } },
        { reason },
      )
    },
    [go, node],
  )

  /** The existence question, re-asked on every leaf. */
  const answerLeafExistence = useCallback(
    (yes: boolean) => {
      if (node.kind !== 'leaf') return
      if (!yes) {
        go('victory', { promptNode: 'exist', answer: { kind: 'no' } })
        return
      }
      go(state.leafOrigin ?? START_NODE, {
        promptNode: 'exist',
        answer: { kind: 'yes' },
        loopback: true,
      })
    },
    [go, node, state.leafOrigin],
  )

  const restart = useCallback(() => setState(INITIAL), [])

  const stats = useMemo(
    () => ({
      steps: state.trace.length,
      loops: state.loops,
      loopbacks: state.trace.filter((entry) => entry.loopback).length,
    }),
    [state.trace, state.loops],
  )

  return {
    node,
    trace: state.trace,
    lastReason: state.lastReason,
    loops: state.loops,
    stats,
    answerBinary,
    acknowledge,
    choose,
    submitReason,
    answerLeafExistence,
    restart,
  }
}

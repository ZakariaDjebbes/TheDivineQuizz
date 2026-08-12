import { useCallback, useMemo, useState } from 'react'
import {
  EXISTENCE_QUESTION,
  GRAPH,
  START_NODE,
  type NodeId,
  type QuizNode,
} from './graph'

export interface TraceEntry {
  key: number
  /** The question or statement the player was shown. */
  prompt: string
  /** What they answered. */
  answer: string
  /** True when the answer sent them backwards in the graph. */
  loopback?: boolean
  /** True when the answer was typed rather than picked. */
  typed?: boolean
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
      setState((prev) => {
        const target = GRAPH[to]
        const isLeaf = target.kind === 'leaf'
        return {
          current: to,
          // Remember where a leaf was reached from, so "yes, God exists"
          // can send the player back to the exact question that trapped them.
          leafOrigin: isLeaf ? prev.current : null,
          trace: [...prev.trace, { ...entry, key: prev.step }],
          // The free-will branch is the one that circles: "could he have made
          // free will without evil?" -> yes -> back to "then why didn't he?".
          loops:
            prev.current === 'could-freewill' && to === 'why-didnt'
              ? prev.loops + 1
              : prev.loops,
          lastReason:
            opts.reason === undefined ? prev.lastReason : opts.reason,
          step: prev.step + 1,
        }
      })
    },
    [],
  )

  const answerBinary = useCallback(
    (yes: boolean) => {
      if (node.kind !== 'binary') return
      go(yes ? node.yes : node.no, {
        prompt: node.prompt,
        answer: yes ? 'Yes' : 'No',
      })
    },
    [go, node],
  )

  const acknowledge = useCallback(() => {
    if (node.kind !== 'premise') return
    go(node.next, { prompt: node.prompt, answer: node.acknowledge })
  }, [go, node])

  const choose = useCallback(
    (optionId: string) => {
      if (node.kind !== 'choice') return
      const option = node.options.find((o) => o.id === optionId)
      if (!option) return
      go(
        option.next,
        { prompt: node.prompt, answer: option.label },
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
        node.freeText.next,
        { prompt: node.prompt, answer: reason, typed: true },
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
        go('victory', { prompt: EXISTENCE_QUESTION, answer: 'No' })
        return
      }
      const back = state.leafOrigin ?? START_NODE
      go(
        back,
        { prompt: EXISTENCE_QUESTION, answer: 'Yes', loopback: true },
      )
    },
    [go, node, state.leafOrigin],
  )

  const restart = useCallback(() => setState(INITIAL), [])

  const stats = useMemo(
    () => ({
      steps: state.trace.length,
      loops: state.loops,
      loopbacks: state.trace.filter((t) => t.loopback).length,
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

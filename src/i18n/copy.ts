/**
 * Lookups from a graph node id to its copy in the active language.
 *
 * The graph is keyed by `NodeId` while `Translation['nodes']` is written as a
 * precise per-node shape, so translators get a compile error for anything they
 * miss. These helpers bridge the two: each read site knows the node kind it is
 * rendering, which the id alone cannot tell TypeScript.
 */

import type { NodeId } from '../quiz/graph'
import type { Translation } from './types'

type NodeCopyKey = keyof Translation['nodes']

function entry(t: Translation, id: NodeId): unknown {
  return t.nodes[id as NodeCopyKey]
}

export interface QuestionCopy {
  eyebrow: string
  prompt: string
}

export function questionCopy(t: Translation, id: NodeId): QuestionCopy {
  return entry(t, id) as QuestionCopy
}

export function premiseCopy(
  t: Translation,
  id: NodeId,
): QuestionCopy & { detail: string; acknowledge: string } {
  return entry(t, id) as QuestionCopy & {
    detail: string
    acknowledge: string
  }
}

export function choiceCopy(
  t: Translation,
  id: NodeId,
): QuestionCopy & { placeholder: string; options: Record<string, string> } {
  return entry(t, id) as QuestionCopy & {
    placeholder: string
    options: Record<string, string>
  }
}

export function leafCopy(
  t: Translation,
  id: NodeId,
): { conclusion: string; detail: string } {
  return entry(t, id) as { conclusion: string; detail: string }
}

/** The line shown in the path panel for a node the player answered. */
export function promptOf(t: Translation, id: NodeId): string {
  const copy = entry(t, id) as
    | { prompt?: string; conclusion?: string }
    | undefined
  return copy?.prompt ?? copy?.conclusion ?? ''
}

export function optionLabel(
  t: Translation,
  id: NodeId,
  optionId: string,
): string {
  const copy = entry(t, id) as { options?: Record<string, string> } | undefined
  return copy?.options?.[optionId] ?? optionId
}

export function acknowledgeLabel(t: Translation, id: NodeId): string {
  const copy = entry(t, id) as { acknowledge?: string } | undefined
  return copy?.acknowledge ?? ''
}

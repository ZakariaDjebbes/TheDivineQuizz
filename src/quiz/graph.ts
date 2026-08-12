/**
 * The Epicurean paradox, encoded as a directed graph.
 *
 * Structure only — every visible string lives in `src/i18n`, keyed by the node
 * ids below. That split is what lets the player switch language mid-walk and
 * see the whole path they have already taken re-render in the new one.
 *
 * Terminal nodes ("leaves") carry no return edge: each one re-asks the opening
 * question, and answering "yes" there sends the player back to whichever node
 * produced the leaf. Since three different questions can force the same "not
 * all powerful" conclusion, that origin is tracked at runtime instead.
 */

export type NodeId =
  | 'exist'
  | 'premise-evil'
  | 'can-prevent'
  | 'knows-evil'
  | 'wants-prevent'
  | 'why-evil'
  | 'could-without'
  | 'why-didnt'
  | 'could-freewill'
  | 'leaf-not-powerful'
  | 'leaf-not-knowing'
  | 'leaf-not-good'
  | 'leaf-satan'
  | 'leaf-test'
  | 'victory'

export interface BinaryNode {
  kind: 'binary'
  id: NodeId
  yes: NodeId
  no: NodeId
}

export interface PremiseNode {
  kind: 'premise'
  id: NodeId
  next: NodeId
}

export interface ChoiceOption {
  id: string
  next: NodeId
}

export interface ChoiceNode {
  kind: 'choice'
  id: NodeId
  options: ChoiceOption[]
  /** Where any freely typed reason leads. */
  freeTextNext: NodeId
}

export interface LeafNode {
  kind: 'leaf'
  id: NodeId
}

export interface VictoryNode {
  kind: 'victory'
  id: NodeId
}

export type QuizNode =
  | BinaryNode
  | PremiseNode
  | ChoiceNode
  | LeafNode
  | VictoryNode

export const START_NODE: NodeId = 'exist'

export const GRAPH: Record<NodeId, QuizNode> = {
  exist: { kind: 'binary', id: 'exist', yes: 'premise-evil', no: 'victory' },

  'premise-evil': { kind: 'premise', id: 'premise-evil', next: 'can-prevent' },

  'can-prevent': {
    kind: 'binary',
    id: 'can-prevent',
    yes: 'knows-evil',
    no: 'leaf-not-powerful',
  },

  'knows-evil': {
    kind: 'binary',
    id: 'knows-evil',
    yes: 'wants-prevent',
    no: 'leaf-not-knowing',
  },

  'wants-prevent': {
    kind: 'binary',
    id: 'wants-prevent',
    yes: 'why-evil',
    no: 'leaf-not-good',
  },

  'why-evil': {
    kind: 'choice',
    id: 'why-evil',
    options: [
      { id: 'necessary', next: 'could-without' },
      { id: 'satan', next: 'leaf-satan' },
      { id: 'test', next: 'leaf-test' },
    ],
    freeTextNext: 'could-without',
  },

  'could-without': {
    kind: 'binary',
    id: 'could-without',
    yes: 'why-didnt',
    no: 'leaf-not-powerful',
  },

  'why-didnt': {
    kind: 'choice',
    id: 'why-didnt',
    options: [
      { id: 'free-will', next: 'could-freewill' },
      { id: 'test', next: 'leaf-test' },
    ],
    freeTextNext: 'could-freewill',
  },

  'could-freewill': {
    kind: 'binary',
    id: 'could-freewill',
    yes: 'why-didnt',
    no: 'leaf-not-powerful',
  },

  'leaf-not-powerful': { kind: 'leaf', id: 'leaf-not-powerful' },
  'leaf-not-knowing': { kind: 'leaf', id: 'leaf-not-knowing' },
  'leaf-not-good': { kind: 'leaf', id: 'leaf-not-good' },
  'leaf-satan': { kind: 'leaf', id: 'leaf-satan' },
  'leaf-test': { kind: 'leaf', id: 'leaf-test' },

  victory: { kind: 'victory', id: 'victory' },
}

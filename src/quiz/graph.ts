/**
 * The Epicurean paradox, encoded as a directed graph.
 *
 * Every terminal node ("leaf") re-asks the opening question: does God exist?
 * Answering "yes" there sends the player back to whichever node produced the
 * leaf, which is why leaves carry no return edge of their own — the origin is
 * tracked at runtime, since three different questions can land on the same
 * "then God is not all powerful" conclusion.
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
  /** Small line above the question, for context. */
  eyebrow?: string
  prompt: string
  yes: NodeId
  no: NodeId
}

export interface PremiseNode {
  kind: 'premise'
  id: NodeId
  eyebrow?: string
  prompt: string
  detail: string
  /** Label of the single button that moves the player on. */
  acknowledge: string
  next: NodeId
}

export interface ChoiceOption {
  id: string
  label: string
  next: NodeId
}

export interface ChoiceNode {
  kind: 'choice'
  id: NodeId
  eyebrow?: string
  prompt: string
  options: ChoiceOption[]
  /** Free-text answer: the player may give any reason they like. */
  freeText: {
    placeholder: string
    /** Where any typed reason leads. */
    next: NodeId
  }
}

export interface LeafNode {
  kind: 'leaf'
  id: NodeId
  /** The conclusion forced by the player's answers. */
  conclusion: string
  detail: string
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
export const EXISTENCE_QUESTION = 'Does God exist?'

export const GRAPH: Record<NodeId, QuizNode> = {
  exist: {
    kind: 'binary',
    id: 'exist',
    eyebrow: 'The only question that matters',
    prompt: EXISTENCE_QUESTION,
    yes: 'premise-evil',
    no: 'victory',
  },

  'premise-evil': {
    kind: 'premise',
    id: 'premise-evil',
    eyebrow: 'The premise',
    prompt: 'Evil exists.',
    detail:
      'Suffering, cruelty, disease, the death of children. Whatever you call it, it is here and it is not in dispute.',
    acknowledge: 'Yes, evil exists',
    next: 'can-prevent',
  },

  'can-prevent': {
    kind: 'binary',
    id: 'can-prevent',
    eyebrow: 'On power',
    prompt: 'Can God prevent evil?',
    yes: 'knows-evil',
    no: 'leaf-not-powerful',
  },

  'knows-evil': {
    kind: 'binary',
    id: 'knows-evil',
    eyebrow: 'On knowledge',
    prompt: 'Does God know about all the evil?',
    yes: 'wants-prevent',
    no: 'leaf-not-knowing',
  },

  'wants-prevent': {
    kind: 'binary',
    id: 'wants-prevent',
    eyebrow: 'On goodness',
    prompt: 'Does God want to prevent evil?',
    yes: 'why-evil',
    no: 'leaf-not-good',
  },

  'why-evil': {
    kind: 'choice',
    id: 'why-evil',
    eyebrow: 'He can, he knows, he wants to',
    prompt: 'Then why is there evil?',
    options: [
      {
        id: 'necessary',
        label: 'It is necessary for the universe to exist',
        next: 'could-without',
      },
      { id: 'satan', label: 'Satan', next: 'leaf-satan' },
      { id: 'test', label: 'To test us', next: 'leaf-test' },
    ],
    freeText: {
      placeholder: 'Some other reason…',
      next: 'could-without',
    },
  },

  'could-without': {
    kind: 'binary',
    id: 'could-without',
    eyebrow: 'On power, again',
    prompt: 'Could God have created a universe without these?',
    yes: 'why-didnt',
    no: 'leaf-not-powerful',
  },

  'why-didnt': {
    kind: 'choice',
    id: 'why-didnt',
    eyebrow: 'He could have',
    prompt: "Then why didn't he?",
    options: [
      { id: 'free-will', label: 'Free will', next: 'could-freewill' },
      { id: 'test', label: 'To test us', next: 'leaf-test' },
    ],
    freeText: {
      placeholder: 'Some other reason…',
      next: 'could-freewill',
    },
  },

  'could-freewill': {
    kind: 'binary',
    id: 'could-freewill',
    eyebrow: 'On power, once more',
    prompt:
      'Could God have created a universe with free will but without evil?',
    yes: 'why-didnt',
    no: 'leaf-not-powerful',
  },

  'leaf-not-powerful': {
    kind: 'leaf',
    id: 'leaf-not-powerful',
    conclusion: 'Then God is not all powerful.',
    detail:
      'Something stands beyond his reach — and whatever that something is, it is not omnipotence you are describing.',
  },

  'leaf-not-knowing': {
    kind: 'leaf',
    id: 'leaf-not-knowing',
    conclusion: 'Then God is not all knowing.',
    detail:
      'There is evil in his world that has escaped his notice. Omniscience does not survive a blind spot.',
  },

  'leaf-not-good': {
    kind: 'leaf',
    id: 'leaf-not-good',
    conclusion: 'Then God is not good. God is not loving.',
    detail:
      'He can stop it, he sees it, and he lets it stand. Call that what you like, but do not call it benevolence.',
  },

  'leaf-satan': {
    kind: 'leaf',
    id: 'leaf-satan',
    conclusion:
      'An all-powerful, all-knowing, all-good God could and would destroy Satan.',
    detail:
      'Satan does not answer the question, he only moves it one step down. Why does the adversary still stand?',
  },

  'leaf-test': {
    kind: 'leaf',
    id: 'leaf-test',
    conclusion:
      'If God is all-knowing, he already knows what we would do if we were tested — so there is no need to test us.',
    detail:
      'A test tells the examiner something they did not already know. Omniscience has nothing left to learn.',
  },

  victory: { kind: 'victory', id: 'victory' },
}

export function getNode(id: NodeId): QuizNode {
  return GRAPH[id]
}

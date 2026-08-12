import type { Translation } from './types'

export const en: Translation = {
  ui: {
    subtitle: 'After Epicurus, 341–271 BC',
    startOver: 'Start over',
    language: 'Language',
    yes: 'Yes',
    no: 'No',
    quote:
      '“Is God willing to prevent evil, but not able? Then he is not omnipotent. Is he able, but not willing? Then he is malevolent.”',

    yourPath: 'Your path',
    pathEmpty:
      'Every answer you give is recorded here. Watch how the road bends back on itself.',
    backTag: 'back',
    circlesWalked: 'Circles walked',
    steps: (n) => `${n} step${n === 1 ? '' : 's'}`,

    thenItFollows: 'Then it follows that',
    soOneMoreTime: 'So, one more time',
    leafHint: 'Saying yes sends you back to the question that brought you here.',
    reasonEcho: (reason) =>
      `Your reason — “${reason}” — did not survive the next question.`,
    ownReason: 'Or give your own reason',
    submitReason: 'Answer',

    paradoxDissolves: 'The paradox dissolves',
    congratulations: 'Congratulations.',
    victoryImmediate:
      'You answered in one move. No contradiction to resolve, no circle to walk — the problem of evil simply never opens.',
    victoryWalked:
      'You found the only answer the diagram accepts without contradicting itself. Everything else led back to a question you had already answered.',
    statSteps: 'Steps',
    statSentBack: 'Sent back',
    statCircles: 'Circles',
    walkAgain: 'Walk it again',
  },

  nodes: {
    exist: {
      eyebrow: 'The only question that matters',
      prompt: 'Does God exist?',
    },
    'premise-evil': {
      eyebrow: 'The premise',
      prompt: 'Evil exists.',
      detail:
        'Suffering, cruelty, disease, the death of children. Whatever you call it, it is here and it is not in dispute.',
      acknowledge: 'Yes, evil exists',
    },
    'can-prevent': {
      eyebrow: 'On power',
      prompt: 'Can God prevent evil?',
    },
    'knows-evil': {
      eyebrow: 'On knowledge',
      prompt: 'Does God know about all the evil?',
    },
    'wants-prevent': {
      eyebrow: 'On goodness',
      prompt: 'Does God want to prevent evil?',
    },
    'why-evil': {
      eyebrow: 'He can, he knows, he wants to',
      prompt: 'Then why is there evil?',
      placeholder: 'Some other reason…',
      options: {
        necessary: 'It is necessary for the universe to exist',
        satan: 'Satan',
        test: 'To test us',
      },
    },
    'could-without': {
      eyebrow: 'On power, again',
      prompt: 'Could God have created a universe without these?',
    },
    'why-didnt': {
      eyebrow: 'He could have',
      prompt: "Then why didn't he?",
      placeholder: 'Some other reason…',
      options: { 'free-will': 'Free will', test: 'To test us' },
    },
    'could-freewill': {
      eyebrow: 'On power, once more',
      prompt:
        'Could God have created a universe with free will but without evil?',
    },

    'leaf-not-powerful': {
      conclusion: 'Then God is not all powerful.',
      detail:
        'Something stands beyond his reach — and whatever that something is, it is not omnipotence you are describing.',
    },
    'leaf-not-knowing': {
      conclusion: 'Then God is not all knowing.',
      detail:
        'There is evil in his world that has escaped his notice. Omniscience does not survive a blind spot.',
    },
    'leaf-not-good': {
      conclusion: 'Then God is not good. God is not loving.',
      detail:
        'He can stop it, he sees it, and he lets it stand. Call that what you like, but do not call it benevolence.',
    },
    'leaf-satan': {
      conclusion:
        'An all-powerful, all-knowing, all-good God could and would destroy Satan.',
      detail:
        'Satan does not answer the question, he only moves it one step down. Why does the adversary still stand?',
    },
    'leaf-test': {
      conclusion:
        'If God is all-knowing, he already knows what we would do if we were tested — so there is no need to test us.',
      detail:
        'A test tells the examiner something they did not already know. Omniscience has nothing left to learn.',
    },
  },

  taunt: (loops) => {
    if (loops <= 0) return null
    if (loops === 1) return 'You have been here before.'
    if (loops === 2) return 'Twice around. The question has not moved an inch.'
    if (loops === 3) return 'Three laps. Epicurus is still waiting.'
    if (loops < 6) return `${loops} laps. The circle does not have an exit here.`
    if (loops < 10)
      return `${loops} laps. There is one answer that ends this, and it is at the very top.`
    return `${loops} laps. Genuinely, at this point, admiration.`
  },
}

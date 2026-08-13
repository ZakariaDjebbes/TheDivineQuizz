/**
 * Every string the app can show, in one shape.
 *
 * The graph in `quiz/graph.ts` holds structure only — ids and edges — so a
 * locale file is the complete script for a walk through the paradox. Adding a
 * language means implementing this interface and nothing else; TypeScript
 * reports any line a translator missed.
 */

export type LocaleCode = 'en' | 'fr' | 'ar' | 'de' | 'ru' | 'es'

export interface Language {
  code: LocaleCode
  /** The language's name in that language. */
  name: string
  dir: 'ltr' | 'rtl'
}

interface Question {
  eyebrow: string
  prompt: string
}

interface Conclusion {
  conclusion: string
  detail: string
}

export interface Translation {
  ui: {
    subtitle: string
    startOver: string
    language: string
    yes: string
    no: string
    quote: string

    yourPath: string
    pathEmpty: string
    backTag: string
    circlesWalked: string
    /** "3 steps" — locales handle their own plural rules. */
    steps: (count: number) => string

    thenItFollows: string
    soOneMoreTime: string
    leafHint: string
    /** Quotes the player's typed reason back at them on a leaf. */
    reasonEcho: (reason: string) => string
    ownReason: string
    submitReason: string

    paradoxDissolves: string
    congratulations: string
    victoryImmediate: string
    victoryWalked: string
    statSteps: string
    statSentBack: string
    statCircles: string
    walkAgain: string
  }

  nodes: {
    exist: Question
    'premise-evil': Question & { detail: string; acknowledge: string }
    'can-prevent': Question
    'knows-evil': Question
    'wants-prevent': Question
    'why-evil': Question & {
      placeholder: string
      options: { necessary: string; satan: string; test: string }
    }
    'could-without': Question
    'why-didnt': Question & {
      placeholder: string
      options: { 'free-will': string; test: string }
    }
    'could-freewill': Question
    'leaf-not-powerful': Conclusion
    'leaf-not-knowing': Conclusion
    'leaf-not-good': Conclusion
    'leaf-satan': Conclusion
    'leaf-test': Conclusion
  }

  /** Escalating commentary for a player circling the free-will branch. */
  taunt: (loops: number) => string | null
}

import type { Translation } from './types'

export const de: Translation = {
  ui: {
    subtitle: 'Nach Epikur, 341–271 v. Chr.',
    startOver: 'Neu starten',
    language: 'Sprache',
    yes: 'Ja',
    no: 'Nein',
    quote:
      '„Will Gott das Übel verhindern, kann es aber nicht? Dann ist er nicht allmächtig. Kann er es, will es aber nicht? Dann ist er missgünstig.“',

    yourPath: 'Dein Weg',
    pathEmpty:
      'Jede Antwort, die du gibst, wird hier festgehalten. Sieh zu, wie der Weg sich in sich selbst zurückkrümmt.',
    backTag: 'zurück',
    circlesWalked: 'Gelaufene Kreise',
    steps: (n) => `${n} Schritt${n === 1 ? '' : 'e'}`,

    thenItFollows: 'Daraus folgt',
    soOneMoreTime: 'Also, noch einmal',
    leafHint:
      'Ein Ja schickt dich zurück zu der Frage, die dich hierher gebracht hat.',
    reasonEcho: (reason) =>
      `Dein Grund – „${reason}“ – hat die nächste Frage nicht überstanden.`,
    ownReason: 'Oder nenne deinen eigenen Grund',
    submitReason: 'Antworten',

    paradoxDissolves: 'Das Paradox löst sich auf',
    congratulations: 'Glückwunsch.',
    victoryImmediate:
      'Du hast in einem einzigen Zug geantwortet. Kein Widerspruch zu lösen, kein Kreis zu gehen – das Problem des Übels stellt sich schlicht nie.',
    victoryWalked:
      'Du hast die einzige Antwort gefunden, die das Diagramm annimmt, ohne sich selbst zu widersprechen. Alles andere führte zurück zu einer Frage, die du schon beantwortet hattest.',
    statSteps: 'Schritte',
    statSentBack: 'Zurückgeschickt',
    statCircles: 'Kreise',
    walkAgain: 'Noch einmal gehen',
  },

  nodes: {
    exist: {
      eyebrow: 'Die einzige Frage, auf die es ankommt',
      prompt: 'Existiert Gott?',
    },
    'premise-evil': {
      eyebrow: 'Die Prämisse',
      prompt: 'Das Übel existiert.',
      detail:
        'Leid, Grausamkeit, Krankheit, der Tod von Kindern. Wie man es auch nennt: Es ist da, und darüber wird nicht gestritten.',
      acknowledge: 'Ja, das Übel existiert',
    },
    'can-prevent': {
      eyebrow: 'Zur Macht',
      prompt: 'Kann Gott das Übel verhindern?',
    },
    'knows-evil': {
      eyebrow: 'Zum Wissen',
      prompt: 'Weiß Gott von allem Übel?',
    },
    'wants-prevent': {
      eyebrow: 'Zur Güte',
      prompt: 'Will Gott das Übel verhindern?',
    },
    'why-evil': {
      eyebrow: 'Er kann, er weiß, er will',
      prompt: 'Warum gibt es dann das Übel?',
      placeholder: 'Ein anderer Grund…',
      options: {
        necessary: 'Es ist notwendig, damit das Universum existiert',
        satan: 'Satan',
        test: 'Um uns zu prüfen',
      },
    },
    'could-without': {
      eyebrow: 'Nochmals zur Macht',
      prompt: 'Hätte Gott ein Universum ohne all das erschaffen können?',
    },
    'why-didnt': {
      eyebrow: 'Er hätte es gekonnt',
      prompt: 'Warum hat er es dann nicht getan?',
      placeholder: 'Ein anderer Grund…',
      options: { 'free-will': 'Der freie Wille', test: 'Um uns zu prüfen' },
    },
    'could-freewill': {
      eyebrow: 'Ein letztes Mal zur Macht',
      prompt:
        'Hätte Gott ein Universum mit freiem Willen, aber ohne Übel erschaffen können?',
    },

    'leaf-not-powerful': {
      conclusion: 'Dann ist Gott nicht allmächtig.',
      detail:
        'Etwas liegt außerhalb seiner Reichweite – und was immer das ist: Allmacht beschreibst du damit nicht.',
    },
    'leaf-not-knowing': {
      conclusion: 'Dann ist Gott nicht allwissend.',
      detail:
        'In seiner Welt gibt es Übel, das seiner Aufmerksamkeit entgangen ist. Allwissenheit überlebt keinen blinden Fleck.',
    },
    'leaf-not-good': {
      conclusion: 'Dann ist Gott nicht gut. Gott ist nicht liebend.',
      detail:
        'Er kann es beenden, er sieht es, und er lässt es bestehen. Nenn das, wie du willst, aber nenn es nicht Güte.',
    },
    'leaf-satan': {
      conclusion:
        'Ein allmächtiger, allwissender, allgütiger Gott könnte Satan vernichten – und würde es tun.',
      detail:
        'Satan beantwortet die Frage nicht, er verschiebt sie nur um einen Schritt. Warum steht der Widersacher noch?',
    },
    'leaf-test': {
      conclusion:
        'Wenn Gott allwissend ist, weiß er längst, was wir täten, würden wir geprüft – eine Prüfung erübrigt sich also.',
      detail:
        'Eine Prüfung sagt dem Prüfer etwas, das er noch nicht wusste. Der Allwissenheit bleibt nichts mehr zu lernen.',
    },
  },

  taunt: (loops) => {
    if (loops <= 0) return null
    if (loops === 1) return 'Hier warst du schon.'
    if (loops === 2)
      return 'Zweimal herum. Die Frage hat sich keinen Zentimeter bewegt.'
    if (loops === 3) return 'Drei Runden. Epikur wartet immer noch.'
    if (loops < 6) return `${loops} Runden. Der Kreis hat hier keinen Ausgang.`
    if (loops < 10)
      return `${loops} Runden. Es gibt eine Antwort, die das beendet, und sie steht ganz oben.`
    return `${loops} Runden. Ehrlich, an diesem Punkt: Respekt.`
  },
}

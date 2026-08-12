import type { Translation } from './types'

export const fr: Translation = {
  ui: {
    subtitle: 'D’après Épicure, 341–271 av. J.-C.',
    startOver: 'Recommencer',
    language: 'Langue',
    yes: 'Oui',
    no: 'Non',
    quote:
      '« Dieu veut-il empêcher le mal, mais ne le peut-il pas ? Alors il n’est pas tout-puissant. Le peut-il, mais ne le veut-il pas ? Alors il est malveillant. »',

    yourPath: 'Votre parcours',
    pathEmpty:
      'Chaque réponse que vous donnez est consignée ici. Observez comme le chemin se replie sur lui-même.',
    backTag: 'retour',
    circlesWalked: 'Tours parcourus',
    steps: (n) => `${n} étape${n === 1 ? '' : 's'}`,

    thenItFollows: 'Il s’ensuit que',
    soOneMoreTime: 'Alors, une fois de plus',
    leafHint: 'Répondre oui vous renvoie à la question qui vous a mené ici.',
    reasonEcho: (reason) =>
      `Votre raison — « ${reason} » — n’a pas survécu à la question suivante.`,
    ownReason: 'Ou donnez votre propre raison',
    submitReason: 'Répondre',

    paradoxDissolves: 'Le paradoxe se dissout',
    congratulations: 'Félicitations.',
    victoryImmediate:
      'Vous avez répondu en un seul coup. Aucune contradiction à résoudre, aucun cercle à parcourir — le problème du mal ne s’ouvre tout simplement jamais.',
    victoryWalked:
      'Vous avez trouvé la seule réponse que le diagramme accepte sans se contredire. Tout le reste ramenait à une question à laquelle vous aviez déjà répondu.',
    statSteps: 'Étapes',
    statSentBack: 'Renvois',
    statCircles: 'Tours',
    walkAgain: 'Refaire le parcours',
  },

  nodes: {
    exist: {
      eyebrow: 'La seule question qui compte',
      prompt: 'Dieu existe-t-il ?',
    },
    'premise-evil': {
      eyebrow: 'La prémisse',
      prompt: 'Le mal existe.',
      detail:
        'La souffrance, la cruauté, la maladie, la mort des enfants. Quel que soit le nom qu’on lui donne, il est là et nul ne le conteste.',
      acknowledge: 'Oui, le mal existe',
    },
    'can-prevent': {
      eyebrow: 'Sur la puissance',
      prompt: 'Dieu peut-il empêcher le mal ?',
    },
    'knows-evil': {
      eyebrow: 'Sur la connaissance',
      prompt: 'Dieu a-t-il connaissance de tout le mal ?',
    },
    'wants-prevent': {
      eyebrow: 'Sur la bonté',
      prompt: 'Dieu veut-il empêcher le mal ?',
    },
    'why-evil': {
      eyebrow: 'Il le peut, il le sait, il le veut',
      prompt: 'Alors pourquoi le mal existe-t-il ?',
      placeholder: 'Une autre raison…',
      options: {
        necessary: 'C’est nécessaire à l’existence de l’univers',
        satan: 'Satan',
        test: 'Pour nous mettre à l’épreuve',
      },
    },
    'could-without': {
      eyebrow: 'Sur la puissance, encore',
      prompt: 'Dieu aurait-il pu créer un univers sans cela ?',
    },
    'why-didnt': {
      eyebrow: 'Il l’aurait pu',
      prompt: 'Alors pourquoi ne l’a-t-il pas fait ?',
      placeholder: 'Une autre raison…',
      options: {
        'free-will': 'Le libre arbitre',
        test: 'Pour nous mettre à l’épreuve',
      },
    },
    'could-freewill': {
      eyebrow: 'Sur la puissance, une fois de plus',
      prompt:
        'Dieu aurait-il pu créer un univers avec le libre arbitre mais sans le mal ?',
    },

    'leaf-not-powerful': {
      conclusion: 'Alors Dieu n’est pas tout-puissant.',
      detail:
        'Quelque chose échappe à sa portée — et quoi que soit ce quelque chose, ce n’est pas l’omnipotence que vous décrivez.',
    },
    'leaf-not-knowing': {
      conclusion: 'Alors Dieu n’est pas omniscient.',
      detail:
        'Il y a dans son monde un mal qui lui a échappé. L’omniscience ne survit pas à un angle mort.',
    },
    'leaf-not-good': {
      conclusion: 'Alors Dieu n’est pas bon. Dieu n’est pas aimant.',
      detail:
        'Il peut l’arrêter, il le voit, et il le laisse durer. Appelez cela comme vous voulez, mais ne l’appelez pas bienveillance.',
    },
    'leaf-satan': {
      conclusion:
        'Un Dieu tout-puissant, omniscient et parfaitement bon pourrait détruire Satan, et le ferait.',
      detail:
        'Satan ne répond pas à la question, il ne fait que la déplacer d’un cran. Pourquoi l’adversaire tient-il encore debout ?',
    },
    'leaf-test': {
      conclusion:
        'Si Dieu est omniscient, il sait déjà ce que nous ferions si nous étions mis à l’épreuve — l’épreuve est donc inutile.',
      detail:
        'Une épreuve apprend à l’examinateur quelque chose qu’il ignorait. À l’omniscience, il ne reste rien à apprendre.',
    },
  },

  taunt: (loops) => {
    if (loops <= 0) return null
    if (loops === 1) return 'Vous êtes déjà passé par ici.'
    if (loops === 2) return 'Deux fois. La question n’a pas bougé d’un pouce.'
    if (loops === 3) return 'Trois tours. Épicure attend toujours.'
    if (loops < 6) return `${loops} tours. Le cercle n’a pas de sortie ici.`
    if (loops < 10)
      return `${loops} tours. Une seule réponse met fin à tout ceci, et elle est tout en haut.`
    return `${loops} tours. Sincèrement, à ce stade, respect.`
  },
}

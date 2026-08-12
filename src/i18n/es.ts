import type { Translation } from './types'

export const es: Translation = {
  ui: {
    subtitle: 'Según Epicuro, 341–271 a. C.',
    startOver: 'Empezar de nuevo',
    language: 'Idioma',
    yes: 'Sí',
    no: 'No',
    quote:
      '«¿Quiere Dios impedir el mal, pero no puede? Entonces no es omnipotente. ¿Puede, pero no quiere? Entonces es malévolo.»',

    yourPath: 'Tu recorrido',
    pathEmpty:
      'Cada respuesta que das queda registrada aquí. Observa cómo el camino se pliega sobre sí mismo.',
    backTag: 'atrás',
    circlesWalked: 'Vueltas dadas',
    steps: (n) => `${n} paso${n === 1 ? '' : 's'}`,

    thenItFollows: 'Entonces se sigue que',
    soOneMoreTime: 'Así que, una vez más',
    leafHint: 'Responder que sí te devuelve a la pregunta que te trajo hasta aquí.',
    reasonEcho: (reason) =>
      `Tu razón — «${reason}» — no sobrevivió a la siguiente pregunta.`,
    ownReason: 'O da tu propia razón',
    submitReason: 'Responder',

    paradoxDissolves: 'La paradoja se disuelve',
    congratulations: 'Enhorabuena.',
    victoryImmediate:
      'Has respondido en un solo movimiento. Ninguna contradicción que resolver, ningún círculo que recorrer: el problema del mal sencillamente nunca se abre.',
    victoryWalked:
      'Has encontrado la única respuesta que el diagrama acepta sin contradecirse. Todo lo demás llevaba de vuelta a una pregunta que ya habías respondido.',
    statSteps: 'Pasos',
    statSentBack: 'Devoluciones',
    statCircles: 'Vueltas',
    walkAgain: 'Recorrerlo otra vez',
  },

  nodes: {
    exist: {
      eyebrow: 'La única pregunta que importa',
      prompt: '¿Existe Dios?',
    },
    'premise-evil': {
      eyebrow: 'La premisa',
      prompt: 'El mal existe.',
      detail:
        'El sufrimiento, la crueldad, la enfermedad, la muerte de los niños. Lo llames como lo llames, está aquí y nadie lo discute.',
      acknowledge: 'Sí, el mal existe',
    },
    'can-prevent': {
      eyebrow: 'Sobre el poder',
      prompt: '¿Puede Dios impedir el mal?',
    },
    'knows-evil': {
      eyebrow: 'Sobre el conocimiento',
      prompt: '¿Conoce Dios todo el mal?',
    },
    'wants-prevent': {
      eyebrow: 'Sobre la bondad',
      prompt: '¿Quiere Dios impedir el mal?',
    },
    'why-evil': {
      eyebrow: 'Puede, lo sabe, lo quiere',
      prompt: '¿Entonces por qué hay mal?',
      placeholder: 'Otra razón…',
      options: {
        necessary: 'Es necesario para que exista el universo',
        satan: 'Satanás',
        test: 'Para ponernos a prueba',
      },
    },
    'could-without': {
      eyebrow: 'Sobre el poder, otra vez',
      prompt: '¿Podría Dios haber creado un universo sin todo eso?',
    },
    'why-didnt': {
      eyebrow: 'Podría haberlo hecho',
      prompt: '¿Entonces por qué no lo hizo?',
      placeholder: 'Otra razón…',
      options: {
        'free-will': 'El libre albedrío',
        test: 'Para ponernos a prueba',
      },
    },
    'could-freewill': {
      eyebrow: 'Sobre el poder, una vez más',
      prompt:
        '¿Podría Dios haber creado un universo con libre albedrío pero sin mal?',
    },

    'leaf-not-powerful': {
      conclusion: 'Entonces Dios no es todopoderoso.',
      detail:
        'Algo queda fuera de su alcance, y sea lo que sea, no es omnipotencia lo que estás describiendo.',
    },
    'leaf-not-knowing': {
      conclusion: 'Entonces Dios no es omnisciente.',
      detail:
        'Hay mal en su mundo que ha escapado a su atención. La omnisciencia no sobrevive a un punto ciego.',
    },
    'leaf-not-good': {
      conclusion: 'Entonces Dios no es bueno. Dios no es amoroso.',
      detail:
        'Puede detenerlo, lo ve, y lo deja estar. Llámalo como quieras, pero no lo llames benevolencia.',
    },
    'leaf-satan': {
      conclusion:
        'Un Dios todopoderoso, omnisciente y sumamente bueno podría destruir a Satanás, y lo haría.',
      detail:
        'Satanás no responde a la pregunta, solo la desplaza un paso. ¿Por qué sigue en pie el adversario?',
    },
    'leaf-test': {
      conclusion:
        'Si Dios es omnisciente, ya sabe lo que haríamos si nos pusiera a prueba, así que no hace falta ponernos a prueba.',
      detail:
        'Una prueba le dice al examinador algo que aún no sabía. A la omnisciencia no le queda nada por aprender.',
    },
  },

  taunt: (loops) => {
    if (loops <= 0) return null
    if (loops === 1) return 'Ya has estado aquí.'
    if (loops === 2) return 'Dos veces. La pregunta no se ha movido ni un milímetro.'
    if (loops === 3) return 'Tres vueltas. Epicuro sigue esperando.'
    if (loops < 6) return `${loops} vueltas. El círculo no tiene salida por aquí.`
    if (loops < 10)
      return `${loops} vueltas. Hay una respuesta que termina con esto, y está justo arriba.`
    return `${loops} vueltas. Sinceramente, a estas alturas, admiración.`
  },
}

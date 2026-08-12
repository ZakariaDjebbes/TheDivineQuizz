import type { Translation } from './types'

/**
 * Arabic counts in several forms. Numerals stay Western so they line up with
 * the tabular figures used elsewhere in the interface.
 */
function count(
  n: number,
  forms: {
    /** Standalone phrase for one — carries no numeral of its own. */
    one: string
    /** Standalone dual phrase for two. */
    two: string
    /** Counted noun for 3–10, which takes the broken plural. */
    few: string
    /** Counted noun for 11 and above, which reverts to the singular. */
    many: string
    none: string
  },
): string {
  if (n === 0) return forms.none
  if (n === 1) return forms.one
  if (n === 2) return forms.two
  if (n <= 10) return `${n} ${forms.few}`
  return `${n} ${forms.many}`
}

export const ar: Translation = {
  ui: {
    subtitle: 'على خطى أبيقور، ٣٤١–٢٧١ ق.م.',
    startOver: 'ابدأ من جديد',
    language: 'اللغة',
    yes: 'نعم',
    no: 'لا',
    quote:
      '«أيريد الله منع الشر ولا يقدر؟ إذن فهو ليس كلي القدرة. أيقدر ولا يريد؟ إذن فهو شرير.»',

    yourPath: 'مسارك',
    pathEmpty: 'كل إجابة تقدّمها تُسجَّل هنا. راقب كيف ينثني الطريق على نفسه.',
    backTag: 'رجوع',
    circlesWalked: 'دورات مقطوعة',
    steps: (n) =>
      count(n, {
        none: 'لا خطوات',
        one: 'خطوة واحدة',
        two: 'خطوتان',
        few: 'خطوات',
        many: 'خطوة',
      }),

    thenItFollows: 'إذن يلزم أن',
    soOneMoreTime: 'إذن، مرة أخرى',
    leafHint: 'الإجابة بنعم تعيدك إلى السؤال الذي أوصلك إلى هنا.',
    reasonEcho: (reason) => `سببك — «${reason}» — لم يصمد أمام السؤال التالي.`,
    ownReason: 'أو اذكر سببك الخاص',
    submitReason: 'أجب',

    paradoxDissolves: 'المفارقة تتلاشى',
    congratulations: 'تهانينا.',
    victoryImmediate:
      'أجبت في خطوة واحدة. لا تناقض يُحلّ، ولا دائرة تُقطع — مشكلة الشر ببساطة لا تُفتح أبدًا.',
    victoryWalked:
      'وجدت الإجابة الوحيدة التي يقبلها المخطط دون أن يناقض نفسه. كل ما عداها كان يعود بك إلى سؤال أجبت عنه من قبل.',
    statSteps: 'خطوات',
    statSentBack: 'مرات الرجوع',
    statCircles: 'دورات',
    walkAgain: 'اسلك الطريق مجددًا',
  },

  nodes: {
    exist: {
      eyebrow: 'السؤال الوحيد الذي يهم',
      prompt: 'هل الله موجود؟',
    },
    'premise-evil': {
      eyebrow: 'المقدمة',
      prompt: 'الشر موجود.',
      detail:
        'المعاناة، القسوة، المرض، موت الأطفال. سمّه ما شئت، فهو هنا ولا خلاف عليه.',
      acknowledge: 'نعم، الشر موجود',
    },
    'can-prevent': {
      eyebrow: 'في القدرة',
      prompt: 'هل يستطيع الله منع الشر؟',
    },
    'knows-evil': {
      eyebrow: 'في العلم',
      prompt: 'هل يعلم الله بكل الشر؟',
    },
    'wants-prevent': {
      eyebrow: 'في الصلاح',
      prompt: 'هل يريد الله منع الشر؟',
    },
    'why-evil': {
      eyebrow: 'يستطيع، ويعلم، ويريد',
      prompt: 'إذن لماذا يوجد الشر؟',
      placeholder: 'سبب آخر…',
      options: {
        necessary: 'إنه ضروري لوجود الكون',
        satan: 'الشيطان',
        test: 'ليختبرنا',
      },
    },
    'could-without': {
      eyebrow: 'في القدرة، مجددًا',
      prompt: 'أكان بوسع الله أن يخلق كونًا بلا هذه الأشياء؟',
    },
    'why-didnt': {
      eyebrow: 'كان بوسعه ذلك',
      prompt: 'إذن لماذا لم يفعل؟',
      placeholder: 'سبب آخر…',
      options: { 'free-will': 'الإرادة الحرة', test: 'ليختبرنا' },
    },
    'could-freewill': {
      eyebrow: 'في القدرة، مرة أخرى',
      prompt: 'أكان بوسع الله أن يخلق كونًا فيه إرادة حرة بلا شر؟',
    },

    'leaf-not-powerful': {
      conclusion: 'إذن فالله ليس كلي القدرة.',
      detail:
        'ثمة شيء خارج عن متناوله — وأيًّا كان ذلك الشيء، فما تصفه ليس القدرة المطلقة.',
    },
    'leaf-not-knowing': {
      conclusion: 'إذن فالله ليس كلي العلم.',
      detail:
        'في عالمه شر غاب عن علمه. والعلم المطلق لا يصمد أمام نقطة عمياء.',
    },
    'leaf-not-good': {
      conclusion: 'إذن فالله ليس صالحًا. الله ليس محبًّا.',
      detail:
        'يستطيع أن يوقفه، ويراه، ويدعه قائمًا. سمِّ ذلك ما شئت، لكن لا تسمّه رحمة.',
    },
    'leaf-satan': {
      conclusion:
        'إلهٌ كليُّ القدرة، كليُّ العلم، كليُّ الصلاح، كان بوسعه أن يُهلك الشيطان ولفعل.',
      detail:
        'الشيطان لا يجيب عن السؤال، بل يزيحه خطوة واحدة إلى الوراء. فلماذا لا يزال الخصم قائمًا؟',
    },
    'leaf-test': {
      conclusion:
        'إن كان الله كلي العلم، فهو يعلم سلفًا ما سنفعله لو اختُبرنا — فلا حاجة إذن لاختبارنا.',
      detail:
        'الاختبار يُعلِم المُختبِر شيئًا لم يكن يعرفه. والعلم المطلق لم يبقَ له ما يتعلمه.',
    },
  },

  taunt: (loops) => {
    if (loops <= 0) return null
    if (loops === 1) return 'لقد مررت من هنا من قبل.'
    if (loops === 2) return 'مرتان. السؤال لم يتزحزح قيد أنملة.'
    if (loops === 3) return 'ثلاث دورات. أبيقور ما زال ينتظر.'
    const laps = count(loops, {
      none: 'لا دورات',
      one: 'دورة واحدة',
      two: 'دورتان',
      few: 'دورات',
      many: 'دورة',
    })
    if (loops < 6) return `${laps}. الدائرة لا مخرج لها من هنا.`
    if (loops < 10) return `${laps}. ثمة إجابة واحدة تنهي هذا، وهي في الأعلى تمامًا.`
    return `${laps}. بصدق، عند هذا الحد، إعجاب.`
  },
}

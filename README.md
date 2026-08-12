# The Divine Quizz

An interactive walk through the **Epicurean paradox** — the classic argument
that an all-powerful, all-knowing, all-good God is hard to square with the
existence of evil.

The quiz is a directed graph. Every branch you take either forces a conclusion
about God's nature or bends back to a question you have already answered. There
is exactly one answer that ends the walk.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Built with React, TypeScript, Vite, Tailwind CSS v4 and Framer Motion. No
backend — it is a static site.

## How the flow works

The quiz opens with **"Does God exist?"**

- **No** → the paradox never opens, and you get the congratulations screen.
- **Yes** → you enter the diagram: *evil exists* → *can God prevent it?* →
  *does he know about it?* → *does he want to prevent it?* → *then why is there
  evil?*

Answering "no" to any of the three attribute questions forces a conclusion —
God is not all-powerful, not all-knowing, or not good. Those are the **leaves**.

**Every leaf re-asks "Does God exist?"** Answer *no* and you reach the
congratulations screen; answer *yes* and you are sent straight back to the
question that produced that leaf. Since three different questions can land on
"then God is not all powerful", the return target is tracked at runtime rather
than baked into the leaf.

Two nodes — *"Then why is there evil?"* and *"Then why didn't he?"* — accept any
answer at all, so alongside the preset options they take free text. A typed
reason follows the same edge as the diagram's "other reason" branch, and is
echoed back at you when the next question undoes it.

The *free will* branch is a genuine cycle: **"could God have created a universe
with free will but without evil?" → yes → "then why didn't he?"** and around
again. The app counts those laps and comments on them.

## Languages

The quiz is available in **English, French, Spanish, German, Russian and
Arabic**. It picks up the browser's preferred language on first visit and
remembers any later choice in `localStorage`.

Arabic switches the whole interface to right-to-left. The layout uses logical
CSS properties throughout, so nothing is mirrored by hand; the small
caps-and-tracking labels drop that treatment under Arabic, which has no letter
case and whose connected letterforms are damaged by letter-spacing.

Switching language mid-walk re-renders the path you have already taken, because
the trace stores *what you answered* rather than the words it was shown in.
Russian and Arabic plurals ("3 шага", "خطوتان") are handled per locale rather
than by appending an "s".

## Project layout

```
src/
  quiz/graph.ts        the paradox as nodes and edges — structure only
  quiz/useQuiz.ts      traversal state: current node, path trace, loop counter
  i18n/types.ts        the shape every locale must fill
  i18n/<code>.ts       one file per language, all copy for that language
  i18n/copy.ts         node id -> copy lookups
  i18n/LocaleContext   active language, persistence, document lang/dir
  components/          NodeCard, TracePanel, Victory, LanguagePicker, shared UI
  App.tsx              layout
```

`graph.ts` is the single source of truth for the flow and holds no text at all.
Adding a question means editing it plus each locale file — and because
`Translation` is a precise type, TypeScript names every string a translator
still owes. Adding a language means one new file and one line in `i18n/index.ts`.

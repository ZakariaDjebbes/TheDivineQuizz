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

## Project layout

```
src/
  quiz/graph.ts        the paradox encoded as nodes and edges
  quiz/useQuiz.ts      traversal state: current node, path trace, loop counter
  components/          NodeCard, TracePanel, Victory, shared UI
  App.tsx              layout
```

`graph.ts` is the single source of truth for the flow. Adding a question or
rerouting a branch means editing that file and nothing else.

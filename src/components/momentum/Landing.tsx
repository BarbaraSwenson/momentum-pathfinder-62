import { ArrowRight, Compass, Crosshair, Layers, Leaf } from "lucide-react";

import { CATEGORIES, FRAMEWORK } from "@/lib/momentum-method";

const ICONS = {
  clarity: Compass,
  focus: Crosshair,
  systems: Layers,
  recovery: Leaf,
} as const;

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
      <div className="rise text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {FRAMEWORK.appName} · with {FRAMEWORK.author}
        </p>
        <h1 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
          What's Blocking Your Momentum?
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Take this 3-minute assessment to discover what's helping you move forward, what's
          holding you back, and what to focus on next.
        </p>
        <button
          onClick={onStart}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-4 text-base font-medium text-sage-foreground shadow-[var(--shadow-card)] transition-all hover:brightness-95 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Start My Assessment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <section className="mt-16 sm:mt-24">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl">{FRAMEWORK.name}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {FRAMEWORK.intro}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.id];
            return (
              <div key={category.id} className="card-surface p-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-soft text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="truncate text-lg">{category.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-14 text-center text-xs leading-relaxed text-muted-foreground/80">
        {FRAMEWORK.appName} is a fictional demonstration product. Maya Bennett and{" "}
        {FRAMEWORK.name} are not real, and results are for illustration only.
      </p>
    </div>
  );
}

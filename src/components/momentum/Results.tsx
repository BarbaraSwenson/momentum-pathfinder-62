import { Compass, Loader2, RotateCcw, Sparkles, TrendingUp, Target } from "lucide-react";
import { useEffect, useState } from "react";

import type { Coaching } from "@/lib/coaching.functions";
import type { Results as ResultsData } from "@/lib/scoring";

interface Props {
  results: ResultsData;
  coaching: Coaching | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onRetake: () => void;
}

function ScoreBar({ name, percent, delay }: { name: string; percent: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), delay);
    return () => clearTimeout(t);
  }, [percent, delay]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm tabular-nums text-muted-foreground">{percent}%</span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-sage transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-surface p-6 sm:p-8">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-soft text-accent-foreground">
          {icon}
        </span>
        <h2 className="truncate text-xl sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Results({ results, coaching, loading, error, onRetry, onRetake }: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <div className="rise card-surface p-8 text-center sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Your Momentum Score
        </p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-6xl leading-none sm:text-7xl">
          {results.overallScore}
          <span className="text-2xl text-muted-foreground">/100</span>
        </p>

        <div className="mt-8 space-y-5 text-left">
          {results.categories.map((c, i) => (
            <ScoreBar key={c.id} name={c.name} percent={c.percent} delay={150 + i * 120} />
          ))}
        </div>
      </div>

      {loading && (
        <div className="card-surface mt-6 flex items-center gap-3 p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
          Maya is reading your results...
        </div>
      )}

      {error && (
        <div className="card-surface mt-6 p-6">
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-sage-foreground transition-all hover:brightness-95"
          >
            Try again
          </button>
        </div>
      )}

      {coaching && (
        <div className="mt-6 space-y-6">
          <section className="rise card-surface p-6 sm:p-8">
            <p className="text-base leading-relaxed">{coaching.overall}</p>
          </section>

          <Section icon={<TrendingUp className="h-5 w-5" />} title="Your Momentum Strength">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-foreground">
              {results.strength.name} — {results.strength.percent}%
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{coaching.strength}</p>
          </Section>

          <Section icon={<Target className="h-5 w-5" />} title="Your Biggest Opportunity">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-foreground">
              {results.opportunity.name} — {results.opportunity.percent}%
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{coaching.opportunity}</p>
          </Section>

          <section className="rise overflow-hidden rounded-3xl bg-sage p-6 text-sage-foreground shadow-[var(--shadow-lift)] sm:p-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-foreground/15">
                <Compass className="h-5 w-5" />
              </span>
              <h2 className="truncate text-xl sm:text-2xl">
                Your Recommended Momentum Practice
              </h2>
            </div>
            <p className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
              {coaching.practice.name}
            </p>
            <p className="mt-3 leading-relaxed text-sage-foreground/85">
              {coaching.practice.why}
            </p>
            <div className="mt-6 rounded-2xl bg-sage-foreground/10 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-sage-foreground/70">
                Try it today
              </p>
              <p className="mt-2 leading-relaxed">{coaching.practice.exercise}</p>
            </div>
          </section>

          <Section icon={<Sparkles className="h-5 w-5" />} title="Your 3 Recommended Moves">
            <ol className="space-y-4">
              {coaching.actions.map((action, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="min-w-0 leading-relaxed text-muted-foreground">{action}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={<Sparkles className="h-5 w-5" />} title="Your 7-Day Momentum Experiment">
            <p className="font-[family-name:var(--font-display)] text-lg">
              {coaching.experiment.title}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {coaching.experiment.summary}
            </p>
            <ul className="mt-5 divide-y divide-border">
              {coaching.experiment.days.map((d, i) => (
                <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-3">
                  <span className="shrink-0 text-sm font-medium">{d.day}</span>
                  <span className="min-w-0 text-sm leading-relaxed text-muted-foreground">
                    {d.task}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <section className="card-surface p-8 text-center">
            <h2 className="text-xl sm:text-2xl">
              Want help implementing your Momentum Method?
            </h2>
            <button className="mt-5 rounded-full bg-sage px-6 py-3 text-sm font-medium text-sage-foreground transition-all hover:brightness-95 hover:shadow-[var(--shadow-lift)]">
              Demo Complete
            </button>
          </section>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Retake Assessment
        </button>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/80">
        Fictional demonstration product. Not scientifically validated coaching advice.
      </p>
    </div>
  );
}

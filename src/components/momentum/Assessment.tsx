import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { QUESTIONS, SCALE, getCategory } from "@/lib/momentum-method";

interface Props {
  onComplete: (answers: Record<number, number>) => void;
  onExit: () => void;
}

export function Assessment({ onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = QUESTIONS[index]!;
  const progress = ((index + 1) / QUESTIONS.length) * 100;

  function choose(value: number) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (index === QUESTIONS.length - 1) {
      onComplete(next);
    } else {
      setIndex(index + 1);
    }
  }

  function back() {
    if (index === 0) onExit();
    else setIndex(index - 1);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-16">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <button
          onClick={back}
          className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate">Back</span>
        </button>
        <span className="shrink-0 text-sm font-medium text-muted-foreground">
          Question {index + 1} of {QUESTIONS.length}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={question.id} className="rise card-surface mt-8 p-6 sm:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-foreground">
          {getCategory(question.category).name}
        </p>
        <h2 className="mt-4 text-2xl leading-snug sm:text-3xl">{question.text}</h2>

        <div className="mt-8 space-y-3">
          {SCALE.map((option) => {
            const selected = answers[question.id] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => choose(option.value)}
                className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all ${
                  selected
                    ? "border-sage bg-sage-soft"
                    : "border-border bg-background hover:border-sage hover:bg-secondary"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-medium ${
                    selected ? "bg-sage text-sage-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {option.value}
                </span>
                <span className="min-w-0 text-sm sm:text-base">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

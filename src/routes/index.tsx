import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useState } from "react";

import { Assessment } from "@/components/momentum/Assessment";
import { Landing } from "@/components/momentum/Landing";
import { Results } from "@/components/momentum/Results";
import { getCoaching, type Coaching } from "@/lib/coaching.functions";
import { calculateResults, type Results as ResultsData } from "@/lib/scoring";

const TITLE = "Momentum Check — What's Blocking Your Momentum?";
const DESCRIPTION =
  "A 3-minute assessment based on The Momentum Method. Discover your Clarity, Focus, Systems, and Recovery scores and get personalized AI coaching.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MomentumCheck,
});

type Stage = "landing" | "assessment" | "results";

function MomentumCheck() {
  const [stage, setStage] = useState<Stage>("landing");
  const [results, setResults] = useState<ResultsData | null>(null);
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoaching = useServerFn(getCoaching);

  const runCoaching = useCallback(
    async (data: ResultsData) => {
      setLoading(true);
      setError(null);
      try {
        setCoaching(await fetchCoaching({ data }));
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Something went wrong generating your coaching.",
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchCoaching],
  );

  function handleComplete(answers: Record<number, number>) {
    const data = calculateResults(answers);
    setResults(data);
    setCoaching(null);
    setStage("results");
    void runCoaching(data);
  }

  function retake() {
    setResults(null);
    setCoaching(null);
    setError(null);
    setStage("assessment");
  }

  return (
    <main className="min-h-screen bg-background">
      {stage === "landing" && <Landing onStart={() => setStage("assessment")} />}
      {stage === "assessment" && (
        <Assessment onComplete={handleComplete} onExit={() => setStage("landing")} />
      )}
      {stage === "results" && results && (
        <Results
          results={results}
          coaching={coaching}
          loading={loading}
          error={error}
          onRetry={() => void runCoaching(results)}
          onRetake={retake}
        />
      )}
    </main>
  );
}

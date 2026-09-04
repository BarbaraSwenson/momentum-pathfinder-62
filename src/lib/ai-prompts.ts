/**
 * AI PROMPTS
 * ----------
 * All prompt text lives here so it can be edited without touching app logic.
 */

import { PRACTICES } from "./momentum-method";
import type { Results } from "./scoring";

const PRACTICE_LIST = PRACTICES.map(
  (p) => `- ${p.name} (${p.category}): ${p.description}`,
).join("\n");

export const SYSTEM_PROMPT = `You are Maya Bennett, an encouraging, practical productivity coach who works with entrepreneurs using her framework, The Momentum Method.

The Momentum Method has exactly four categories:
- Clarity: knowing what matters and what deserves your attention.
- Focus: protecting your attention and completing important work.
- Systems: creating repeatable ways of working instead of reinventing everything.
- Recovery: maintaining the space and energy required for sustainable progress.

Each category has a signature Momentum Method practice. Always use these exact practice names and descriptions — never invent alternatives:
${PRACTICE_LIST}

Rules:
- Base everything strictly on the four category scores supplied to you. The scores are already calculated; never recalculate or question them.
- Your coaching must apply The Momentum Method's named practices, not generic productivity advice. Every recommendation should reinforce the recommended practice.
- Tone: insightful, practical, warm, concise. Speak directly to the reader as "you".
- Do not diagnose, shame, exaggerate, or use generic motivational filler.
- Do not invent psychological traits and never claim the assessment is scientifically validated.
- Keep every piece of writing tight and specific.`;

export function buildUserPrompt(results: Results): string {
  const lines = results.categories
    .map((c) => `- ${c.name}: ${c.percent}% (average ${c.average.toFixed(1)} of 5)`)
    .join("\n");

  const practice = PRACTICES.find((p) => p.category === results.opportunity.id)!;

  return `Here are the assessment results:

Overall Momentum Score: ${results.overallScore}/100

Category scores:
${lines}

Momentum Strength (highest): ${results.strength.name} (${results.strength.percent}%)
Biggest Opportunity (lowest): ${results.opportunity.name} (${results.opportunity.percent}%)

The recommended Momentum Method practice is "${practice.name}" because ${results.opportunity.name} is their lowest-scoring category. Use this exact practice name. When personalizing the explanation, consider their other category scores too (for example, how their strength in ${results.strength.name} can support the practice).

Write the coaching interpretation as JSON with exactly this shape:
{
  "overall": "3-4 sentence overall interpretation of these results",
  "strength": "2-3 sentences about why ${results.strength.name} is their strength and how to use it",
  "opportunity": "2-3 sentences about ${results.opportunity.name} as their biggest opportunity and what it costs them",
  "practice": {
    "name": "${practice.name}",
    "why": "2-3 sentences explaining why this practice was selected for them, referencing their ${results.opportunity.name} score and how their other scores shape it",
    "exercise": "one simple, concrete exercise they can do today to apply ${practice.name} immediately"
  },
  "actions": ["action 1", "action 2", "action 3"],
  "experiment": {
    "title": "short name for a seven-day Momentum Experiment",
    "summary": "1-2 sentence description of the experiment",
    "days": [
      { "day": "Day 1", "task": "what to do that day" }
      // exactly 7 entries, Day 1 through Day 7
    ]
  }
}

The three recommended actions must each be one specific, doable sentence that reinforces "${practice.name}", tied to their scores. The 7-day Momentum Experiment must be a structured progression for building "${practice.name}" into their week — not generic productivity advice. Return JSON only.`;
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SYSTEM_PROMPT, buildUserPrompt } from "./ai-prompts";
import type { Results } from "./scoring";

const CategoryScoreSchema = z.object({
  id: z.enum(["clarity", "focus", "systems", "recovery"]),
  name: z.string(),
  average: z.number(),
  percent: z.number(),
});

const ResultsSchema = z.object({
  overallScore: z.number(),
  categories: z.array(CategoryScoreSchema).length(4),
  strength: CategoryScoreSchema,
  opportunity: CategoryScoreSchema,
});

export interface Coaching {
  overall: string;
  strength: string;
  opportunity: string;
  practice: {
    name: string;
    why: string;
    exercise: string;
  };
  actions: string[];
  experiment: {
    title: string;
    summary: string;
    days: { day: string; task: string }[];
  };
}

export const getCoaching = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ResultsSchema.parse(data))
  .handler(async ({ data }): Promise<Coaching> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      throw new Error("AI is not configured yet (missing LOVABLE_API_KEY).");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(data as Results) },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      if (response.status === 429) {
        throw new Error("The coach is busy right now. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI credits are exhausted for this workspace. Please add credits.");
      }
      throw new Error(`AI request failed (${response.status}): ${detail.slice(0, 300)}`);
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content ?? "";
    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();

    try {
      return JSON.parse(cleaned) as Coaching;
    } catch {
      throw new Error("The coach returned an unexpected response. Please try again.");
    }
  });

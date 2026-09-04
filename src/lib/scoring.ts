/**
 * SCORING
 * -------
 * All scoring math happens here, in application code (never in the AI model).
 */

import { CATEGORIES, QUESTIONS, type CategoryId } from "./momentum-method";

export interface CategoryScore {
  id: CategoryId;
  name: string;
  average: number; // 1-5
  percent: number; // 0-100
}

export interface Results {
  overallScore: number; // 0-100
  categories: CategoryScore[];
  strength: CategoryScore;
  opportunity: CategoryScore;
}

/** answers: map of question id -> value 1..5 */
export function calculateResults(answers: Record<number, number>): Results {
  const categories: CategoryScore[] = CATEGORIES.map((category) => {
    const items = QUESTIONS.filter((q) => q.category === category.id);
    const total = items.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const average = total / items.length;
    return {
      id: category.id,
      name: category.name,
      average,
      percent: Math.round((average / 5) * 100),
    };
  });

  const totalPoints = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const overallScore = Math.round((totalPoints / (QUESTIONS.length * 5)) * 100);

  const sorted = [...categories].sort((a, b) => b.average - a.average);

  return {
    overallScore,
    categories,
    strength: sorted[0]!,
    opportunity: sorted[sorted.length - 1]!,
  };
}

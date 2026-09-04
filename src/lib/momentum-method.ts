/**
 * THE METHODOLOGY DATA
 * --------------------
 * Everything specific to the fictional "Momentum Method" lives here.
 * To adapt this app to a real client's framework, replace CATEGORIES and
 * QUESTIONS below. Nothing else in the app needs to change.
 */

export type CategoryId = "clarity" | "focus" | "systems" | "recovery";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Question {
  id: number;
  category: CategoryId;
  text: string;
}

export const FRAMEWORK = {
  name: "The Momentum Method",
  author: "Maya Bennett",
  appName: "Momentum Check",
  intro:
    "The Momentum Method evaluates four areas that influence an entrepreneur's ability to make consistent progress.",
};

export const CATEGORIES: Category[] = [
  {
    id: "clarity",
    name: "Clarity",
    description: "Knowing what matters and what deserves your attention.",
  },
  {
    id: "focus",
    name: "Focus",
    description: "Protecting your attention and completing important work.",
  },
  {
    id: "systems",
    name: "Systems",
    description: "Creating repeatable ways of working instead of reinventing everything.",
  },
  {
    id: "recovery",
    name: "Recovery",
    description: "Maintaining the space and energy required for sustainable progress.",
  },
];

export interface Practice {
  category: CategoryId;
  name: string;
  description: string;
}

/**
 * The Momentum Method's signature practices, one per category.
 * The AI coaching recommends the practice tied to the user's
 * lowest-scoring category.
 */
export const PRACTICES: Practice[] = [
  {
    category: "clarity",
    name: "The Priority Anchor",
    description:
      "Identify the single outcome that matters most right now and use it as the filter for competing priorities.",
  },
  {
    category: "focus",
    name: "The Focus Window",
    description:
      "Create a protected block of uninterrupted time devoted to the Priority Anchor.",
  },
  {
    category: "systems",
    name: "The Repeatability Rule",
    description:
      "When an important activity is performed repeatedly, capture the steps and turn it into a simple repeatable process.",
  },
  {
    category: "recovery",
    name: "The Capacity Check",
    description:
      "Plan commitments according to realistic available energy and capacity rather than theoretical available time.",
  },
];

export function getPracticeForCategory(id: CategoryId): Practice {
  return PRACTICES.find((p) => p.category === id)!;
}

export const SCALE = [
  { value: 1, label: "Not at all true" },
  { value: 2, label: "Rarely true" },
  { value: 3, label: "Sometimes true" },
  { value: 4, label: "Mostly true" },
  { value: 5, label: "Very true" },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "clarity",
    text: "I can identify the one or two priorities that matter most to me right now.",
  },
  {
    id: 2,
    category: "clarity",
    text: "I know what a successful week looks like before the week begins.",
  },
  {
    id: 3,
    category: "clarity",
    text: "I can confidently say no to opportunities that don't support my current priorities.",
  },
  {
    id: 4,
    category: "focus",
    text: "I regularly have uninterrupted time to work on my most important priorities.",
  },
  {
    id: 5,
    category: "focus",
    text: "I finish important tasks before jumping to new ideas.",
  },
  {
    id: 6,
    category: "focus",
    text: "I can work without constantly checking messages, notifications, or other distractions.",
  },
  {
    id: 7,
    category: "systems",
    text: "I have repeatable processes for tasks I perform regularly.",
  },
  {
    id: 8,
    category: "systems",
    text: "Important information, tasks, and commitments have clear places where I keep track of them.",
  },
  {
    id: 9,
    category: "systems",
    text: "My business can continue functioning even when I have a particularly busy week.",
  },
  {
    id: 10,
    category: "recovery",
    text: "I regularly step away from work without feeling that I should be doing more.",
  },
  {
    id: 11,
    category: "recovery",
    text: "I generally have enough mental energy for my highest-value work.",
  },
  {
    id: 12,
    category: "recovery",
    text: "My current way of working feels sustainable for the next six months.",
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

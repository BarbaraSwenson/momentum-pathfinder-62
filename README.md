# Momentum Check

I want you to build a polished, mobile-friendly web app called Momentum Check.

This is a demonstration app for a fictional productivity coach named Maya Bennett and her fictional framework, The Momentum Method.

The purpose of the app is to show how an expert's intellectual property or methodology can be transformed into an interactive AI-powered assessment.

Core Experience

The app should have three main stages:

Landing page

Assessment

Personalized AI results

Keep the application simple. Do not add accounts, authentication, payments, dashboards, databases, email collection, or other features unless I request them later.

1. Landing Page

Create an attractive, premium-looking landing page.

Headline:

What's Blocking Your Momentum?

Subheadline:

Take this 3-minute assessment to discover what's helping you move forward, what's holding you back, and what to focus on next.

Include a button:

Start My Assessment

Also introduce the fictional framework:

The Momentum Method

The Momentum Method evaluates four areas that influence an entrepreneur's ability to make consistent progress:

Clarity — knowing what matters and what deserves your attention.

Focus — protecting your attention and completing important work.

Systems — creating repeatable ways of working instead of reinventing everything.

Recovery — maintaining the space and energy required for sustainable progress.

Make it clear somewhere unobtrusively that this is a fictional demonstration product.

2. Assessment

Create a 12-question assessment.

Display one question at a time.

Include a progress indicator such as:

Question 4 of 12

Users answer each question using a five-point scale:

1 — Not at all true
2 — Rarely true
3 — Sometimes true
4 — Mostly true
5 — Very true

Use these questions:

Clarity

I can identify the one or two priorities that matter most to me right now.

I know what a successful week looks like before the week begins.

I can confidently say no to opportunities that don't support my current priorities.

Focus

I regularly have uninterrupted time to work on my most important priorities.

I finish important tasks before jumping to new ideas.

I can work without constantly checking messages, notifications, or other distractions.

Systems

I have repeatable processes for tasks I perform regularly.

Important information, tasks, and commitments have clear places where I keep track of them.

My business can continue functioning even when I have a particularly busy week.

Recovery

I regularly step away from work without feeling that I should be doing more.

I generally have enough mental energy for my highest-value work.

My current way of working feels sustainable for the next six months.

Allow users to move backward if they want to change an answer.

3. Scoring

Each response has a numerical value from 1 through 5.

Calculate the average score for each category:

Clarity

Focus

Systems

Recovery

Identify the category with the highest average as the user's Momentum Strength.

Identify the category with the lowest average as the user's Biggest Opportunity.

Calculate an overall Momentum Score from 0–100 by taking the user's total points, dividing them by the maximum possible points of 60, and multiplying by 100.

Round appropriately for display.

Do these calculations in the application code. Do not ask the AI model to calculate the scores.

4. AI Interpretation

After scoring is complete, send the four category scores and overall score to an AI model.

Ask the AI to act as an encouraging, practical productivity coach using the Momentum Method.

The AI should generate:

A short overall interpretation of the user's results.

A 2–3 sentence explanation of their Momentum Strength.

A 2–3 sentence explanation of their Biggest Opportunity.

Three specific recommended actions based on their scores.

A simple seven-day Momentum Experiment they can try.

The AI must base its recommendations on the four Momentum Method categories and the scores supplied by the application.

The tone should be insightful, practical, warm, and concise. Avoid exaggerated claims, diagnoses, shame, or generic motivational language.

Do not invent additional psychological traits or claim that the assessment is scientifically validated.

5. Results Page

Create a visually appealing results page.

Prominently display:

Your Momentum Score: [score]/100

Then display all four category scores visually.

For example:

Clarity — 86%
Focus — 54%
Systems — 34%
Recovery — 66%

Then display sections for:

Your Momentum Strength

Show the highest-scoring category and the AI interpretation.

Your Biggest Opportunity

Show the lowest-scoring category and the AI interpretation.

Your 3 Recommended Moves

Display the three AI-generated recommendations.

Your 7-Day Momentum Experiment

Display the AI-generated seven-day plan in an easy-to-read format.

At the bottom include:

Want help implementing your Momentum Method?

And a button:

Demo Complete

Because this is a fictional demonstration, the button does not need to lead anywhere.

Also provide a Retake Assessment option.

Design Direction

Make the app feel like a premium coaching product rather than a generic software dashboard.

Use:

Warm off-white background

Deep navy or charcoal text

Muted sage green accent color

Generous whitespace

Rounded cards

Subtle shadows

Clear typography

Simple progress animations where appropriate

The interface should feel calm, intelligent, modern, and trustworthy.

Prioritize mobile responsiveness.

Technical Requirements

Choose the simplest reasonable architecture for a beginner-friendly prototype.

Keep the code organized and easy to modify.

Store the assessment questions and category information in a clearly identifiable data structure so I can later replace the fictional Momentum Method with a real client's methodology.

Keep AI prompts separate and clearly labeled so I can easily modify them later.

Do not expose API keys or secrets in frontend/client-side code.

If an AI API connection requires credentials that I have not provided, build the rest of the application first and clearly tell me exactly what credential or setup step is needed. Do not fabricate an API key.

Before adding additional packages, services, databases, or complexity, prefer the simplest solution that accomplishes the requested experience.

This is version 1. Build the core experience first.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://momentum-pathfinder-62.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f4e9deb-c2f7-4979-ae29-fb922e27279a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

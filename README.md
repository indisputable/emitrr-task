# Project: Language Learning Game

Live Demo: https://langlearntask.vercel.app
Github Repository: https://github.com/indisputable/emitrr-task

## Technologies used:
- Typescript
- Next.js 13 / React.js
- Prisma (as ORM)
- NextAuth
- TailwindCSS
- Shadcn UI
- Zod (schema validation)
- Postgres on [NeonDB](https://neon.tech/)

- Deployed on Vercel


## Features
- Users can register using their emails.
- Users can take quizes for specific languages.
- The question will be selected according to user's level. If user's level is high, the user will get harder questions.
- After submitting the quiz, the user's level will change accordingly.
- Users can see their score cards and review correct/incorrect answers.
- Users can see all their previous submissions on their profile page.
- Users can reset their progress from their profile page.
- Users can view global leaderboard. The ranking will be based on who has score more points.
- Users can also see language-specific and quiz-specific leaderboard.

#### Admins
- Admins can add quizes.
- Admins can add languages.
- Admins can add questions for selected languages.

## Getting Started
First, run the development server:

```bash
pnpm 
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

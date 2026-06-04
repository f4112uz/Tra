# Support Trainer OS

A Vercel-ready Next.js prototype for a support team trainer workspace.

## What It Includes

- Training needs queue from Zendesk, Intercom, QA, Slack, Gmail, KB, and CSAT signals
- Cohort attendance and readiness tracking
- Pre-test, post-test, ticket simulation, and survey flow
- Training material builder cards
- 90-day trainee performance monitor
- Benchmark map for comparable tools

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy To Vercel

1. Upload this folder to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import your GitHub repository.
4. Use these settings:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: leave blank
Root Directory: ./
```

Vercel should auto-detect this as a Next.js app.

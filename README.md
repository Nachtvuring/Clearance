# Clearance — ATC Training

A Next.js course for learning aviation radio communication, with spoken examples and optional listening and speaking practice.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public landing page is `/`; the signed-in learning area starts at `/dashboard`.

## Supabase setup

1. Create a Supabase project and copy its Project URL and publishable key into `.env.local` using the names in `.env.example`.
2. In Supabase SQL Editor, run `supabase/migrations/202610270001_initial_schema.sql`, then `supabase/migrations/202610270002_seed_atc_course.sql` to register the current course chapters as lessons.
3. In **Authentication → URL Configuration**, set the local Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to the redirect URLs. Add your production site and callback URL before deployment.
4. For Google sign-in, enable Google under **Authentication → Providers → Google**. Create an OAuth client in Google Cloud and use the Supabase callback URL shown in that provider settings page as Google's authorized redirect URI. Add the client ID and secret to Supabase, then save.
5. Restart the Next.js dev server after editing `.env.local`.

Supabase Auth handles email/password and Google accounts. The migrations create profiles, course/module/lesson content, spoken lesson examples, and per-user lesson progress. Row-level security limits profile and progress records to their owner and exposes only published course content.

## ElevenLabs voice practice

The onboarding CLI stores `ELEVENLABS_API_KEY` in `.env.local`. ATC playback uses ElevenLabs text-to-speech; speaking practice uses ElevenLabs Scribe for transcription. The API key stays on the server, and microphone access requires localhost or HTTPS.

## Deploy to Vercel

Import the GitHub repository in Vercel. Vercel detects Next.js and uses the project build settings automatically; no extra `vercel.json` is required.

Add these environment variables in **Project Settings → Environment Variables** for Production and Preview deployments:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID` (optional; defaults to the configured example voice)
- `ELEVENLABS_TTS_MODEL` (optional; defaults to `eleven_v4`)
- `ELEVENLABS_STT_MODEL` (optional; defaults to `scribe_v2`)

Keep API credentials private; only the two Supabase values prefixed with `NEXT_PUBLIC_` belong in browser-visible configuration. Redeploy after changing Vercel environment variables.

After the first deployment, in Supabase **Authentication → URL Configuration**, set the Site URL to your production domain and add `https://<your-domain>/auth/callback` to the allowed redirect URLs. Keep the localhost callback for development. To support Vercel Preview deployments, add the matching preview URL pattern for your Vercel team/account. The Google OAuth client's authorized redirect URI remains the Supabase callback URL shown in the Google provider settings; it is not the Vercel callback URL.

The course text is currently maintained in the app and linked to lesson rows by chapter slug. Starting and completing lessons saves per-user progress in Supabase; dashboard and profile course progress read from those records. Audio examples, practice time, and streaks are not yet stored as learner activity.

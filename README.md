# Masoud Moslemi Holdings (Next.js)

Production-ready Next.js App Router version of the Lovable project.

## Requirements
- Node.js 18+
- npm

## Getting started
```bash
npm install
npm run dev
```

## Build & start
```bash
npm run build
npm run start
```

## Environment variables
Create `.env.local` in the project root. Required keys:
```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_KEY=
```

You can copy `.env.local.example` as a starting point.
`NEXT_PUBLIC_API_KEY` is optional unless your backend enforces `apikey` headers.

## Project structure
- `src/app` – App Router routes, layouts, loading/error boundaries
- `src/components` – shared UI sections + shadcn/ui
- `src/lib` – Supabase client + data utilities

## Notes
- API calls are handled via a lightweight client data layer; auth flows remain client-side to preserve the existing experience.
- Images use `next/image` with remote domains configured in `next.config.mjs`.

## Tradeoffs & assumptions
- Property detail fetch assumes the API accepts an `id` query parameter on `/rest/v1/properties`.
- Admin delete uses `DELETE /rest/v1/properties/{id}` (not listed in the schema).
- The UI still shows “مشارکت” in listing type; this is mapped to `sale` for API calls.
- The backend schema does not include sign-up; the UI keeps the toggle but only login is functional.

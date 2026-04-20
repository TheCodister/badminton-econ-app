# Badminton E-Commerce App — Claude Code Context

## Stack
- **Frontend:** Next.js 16 (Pages Router), React 19, TypeScript 5.9 strict
- **UI:** HeroUI + Tailwind CSS 4
- **State:** TanStack Query 5 (server), Zustand 5 (persistent UI), React Context (checkout logic)
- **Auth:** NextAuth.js 4 (JWT, Credentials + Google + GitHub OAuth)
- **AI:** Vercel AI SDK 5 + @ai-sdk/google (Gemini 2.5 Flash streaming)
- **Backend:** NestJS + Prisma + PostgreSQL (git submodule at `backend/`)
- **Package manager:** pnpm

## Dev Commands
```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm lint      # ESLint with auto-fix
```

## Architecture Decisions

### Router: Pages Router only
All pages live in `pages/`. The `app/` directory contains only `app/api/chat/` (AI streaming endpoint). Do not add new pages to `app/` — keep everything in `pages/`.

### State management pattern
- **React Query** — server state (products, cart). 5-min staleTime for products, 5s polling for cart.
- **Zustand** (`stores/useSelectedCart.ts`) — persisted to localStorage. Tracks selected cart items + last route.
- **CheckoutContext** (`context/CheckoutContext.tsx`) — wraps Zustand store, provides checkout helpers. Wrap pages that need checkout logic with `<CheckoutProvider>`.

### Toast notifications
Use `addToast` from `@heroui/react`. `<ToastProvider>` is mounted in `pages/_app.tsx`. Never use `alert()`.

### API calls
All REST calls go through custom React Query hooks in `hooks/`. Backend URL configured via `BACKEND_URL` constant. Never call `axios` directly in components.

### Filter typing
List hooks (`useGetRacket`, `useGetShoes`, `useGetShuttlecocks`) accept typed filter interfaces defined in each hook file. Pass `{ ...router.query, limit, page }` from pages.

## Naming Conventions
- **Components:** PascalCase (`ProductCard.tsx`)
- **Hooks:** `use` prefix + camelCase (`useGetRacket.ts`)
- **Utils/helpers:** camelCase (`converter.ts`, `handleFilter.ts`)
- **Context files:** PascalCase + Context suffix (`CheckoutContext.tsx`)
- **Dynamic routes:** camelCase param names (`[racketId]`, `[shoesId]`, `[shuttlecockId]`)
- **Constants:** SCREAMING_SNAKE_CASE (`BACKEND_URL`)
- **Zod schemas:** PascalCase + Schema suffix (`RacketSchema`)

## Environment Variables
- `NEXTAUTH_URL` — public base URL
- `NEXTAUTH_SECRET` — JWT secret
- `NEXT_PUBLIC_BACKEND_URL` — backend API base URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — OAuth
- `GITHUB_ID` / `GITHUB_SECRET` — OAuth
- `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini API key

## Key Files
| Path | Purpose |
|------|---------|
| `pages/_app.tsx` | Root: providers (Query, HeroUI, Theme, Session, Checkout) |
| `context/CheckoutContext.tsx` | Checkout state + helpers |
| `stores/useSelectedCart.ts` | Zustand persisted cart selection |
| `types/schema/schema.ts` | All Zod schemas + inferred TypeScript types |
| `app/api/chat/route.ts` | AI chat streaming endpoint (Gemini) |
| `app/api/chat/tools/product.tool.ts` | Tool definitions for product search in chat |
| `lib/auth.ts` | NextAuth config |

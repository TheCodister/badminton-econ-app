# Badminton E-Commerce App

A full-stack badminton equipment e-commerce platform built with **Next.js (Pages Router)**, **HeroUI**, and a **NestJS/Express backend**. The app features AI-powered product recommendations via Google Gemini, OAuth authentication, shopping cart management, and multi-category product browsing with advanced filters.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Pages & Routes](#pages--routes)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [Data Fetching with React Query](#data-fetching-with-react-query)
- [AI Chat Assistant](#ai-chat-assistant)
- [Styling System](#styling-system)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)

---

## Features

- **Multi-Category Product Listings** — Browse rackets, shoes, and shuttlecocks with per-category sidebar filters (brand, weight, balance, stiffness, price range)
- **AI-Powered Chat Assistant** — Conversational product recommender powered by Google Gemini with structured tool calls to the backend
- **Authentication** — Credentials login + Google & GitHub OAuth via NextAuth.js
- **Shopping Cart & Checkout** — Add/remove/update cart items; checkout flow with order summary and shipping input
- **Dark Mode** — Full light/dark theme support via `next-themes` and HeroUI
- **Persistent Cart Selection** — Selected checkout items survive page refreshes via `zustand` + `localStorage`
- **Responsive Design** — Mobile-first layouts, drawer-based filters on small screens

---

## Tech Stack

### Frontend

| Category | Library | Version |
|---|---|---|
| Framework | Next.js (Pages Router) | 16.1.1 |
| Language | TypeScript | 5.9.3 |
| UI Components | HeroUI (fork of NextUI) | 2.7.8 |
| Styling | Tailwind CSS v4 | 4.1.18 |
| Animations | Framer Motion | 12.12.1 |
| Theme | next-themes | 0.2.1 |
| Data Fetching | TanStack React Query | 5.76.1 |
| HTTP Client | Axios | 1.7.7 |
| Global State | Zustand | 5.0.3 |
| Validation | Zod | 4.0.14 |
| Auth | NextAuth.js | 4.24.10 |
| AI SDK | Vercel AI SDK + @ai-sdk/google | 5.0.0 / 2.0.0 |

### Backend

- **Runtime:** Node.js (Express/NestJS)
- **Database:** PostgreSQL via Prisma ORM
- **Deployment:** Vercel (prod) / `localhost:3001` (dev)
- **Repo:** included as a `backend/` submodule

---

## Project Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser (Client)               │
│  Pages Router  ──  React Query  ──  Zustand      │
│  Context API   ──  HeroUI       ──  Tailwind CSS  │
└───────────────────────┬──────────────────────────┘
                        │  HTTP / Fetch
           ┌────────────▼────────────┐
           │  Next.js API Routes     │
           │  /api/auth (NextAuth)   │
           │  /api/chat  (AI SDK)    │
           └────────────┬────────────┘
                        │  REST / OAuth
           ┌────────────▼────────────┐
           │  Express/NestJS Backend │
           │  PostgreSQL + Prisma    │
           └─────────────────────────┘
```

**Key design decisions:**
- **Pages Router** over App Router — the project was started before App Router stabilized; all pages live in `pages/`.
- **Hybrid state management** — React Query owns server state (products, cart), Zustand persists the user's checkout item selections across navigations, and Context API wraps checkout business logic.
- **AI on the server** — The Gemini API key stays on the server; the `/api/chat` route uses Vercel AI SDK streaming with tool calls to the backend's product search endpoints.

---

## Folder Structure

```
badminton-econ-app/
│
├── app/                        # App Router files (only API routes live here)
│   └── api/chat/route.ts       # AI chat endpoint (streaming, tool use)
│
├── pages/                      # All Next.js page routes
│   ├── index.tsx               # Home page
│   ├── racket/
│   │   ├── index.tsx           # Racket listing
│   │   └── [racketid]/index.tsx
│   ├── shoes/
│   │   ├── index.tsx
│   │   └── [shoesid]/index.tsx
│   ├── shuttlecock/
│   │   ├── index.tsx
│   │   └── [shuttlecockid]/index.tsx
│   ├── cart/index.tsx
│   ├── checkout/index.tsx
│   ├── chat/index.tsx
│   ├── login/index.tsx
│   ├── register/index.tsx
│   ├── profile/index.tsx
│   ├── _app.tsx                # App wrapper (QueryClient, ThemeProvider, SessionProvider)
│   └── api/
│       └── auth/[...nextauth].ts  # NextAuth catch-all route
│
├── components/                 # Reusable React components
│   ├── button/AddToCartButton.tsx
│   ├── card/
│   │   ├── ProductCard.tsx         # Racket card with specs dropdown
│   │   ├── ShoesCard.tsx
│   │   ├── ShuttlecocksCard.tsx
│   │   ├── ChatProductCard.tsx     # Card used inside AI chat results
│   │   ├── CategoryCard.tsx        # Home page category cards
│   │   ├── OrderItemCard.tsx       # Checkout order item
│   │   └── CartProductCard.tsx
│   ├── header/header.tsx           # Navbar (cart badge, auth, theme toggle)
│   ├── footer/footer.tsx
│   ├── hero/hero.tsx
│   ├── filter/FilterSection.tsx
│   ├── sidebar/
│   │   ├── RacketSideBar.tsx       # Brand, weight, balance, stiffness
│   │   ├── ShoesSideBar.tsx
│   │   └── ShuttleSideBar.tsx
│   ├── SearchBar.tsx
│   ├── MobileSearchBar.tsx
│   ├── FeatureProductDisplay.tsx   # Horizontal-scroll featured products
│   └── common/ErrorBoundary.tsx
│
├── hooks/                      # Custom React Query hooks
│   ├── useGetRacket.ts
│   ├── useGetRacketbyId.ts
│   ├── useGetShoes.ts
│   ├── useGetShoesbyId.ts
│   ├── useGetShuttlecocks.ts
│   ├── useGetShuttlecockbyId.ts
│   ├── useGetCart.ts           # Polls every 5s + refetches on window focus
│   ├── useGetUser.ts
│   ├── useAddToCart.ts
│   ├── useRemoveCart.ts
│   ├── useUpdateCartQuantity.ts
│   └── useSearchProduct.ts
│
├── context/context.tsx         # CheckoutContext (wraps Zustand store)
├── stores/useSelectedCart.ts   # Zustand store — persisted to localStorage
│
├── lib/
│   ├── auth.ts                 # NextAuth config (providers, callbacks)
│   └── nestauth.ts             # login() / register() helpers
│
├── constants/                  # Shared constants (BACKEND_URL, categories, etc.)
├── types/                      # TypeScript types / Zod schemas
├── utils/                      # Helper functions
├── layouts/                    # Page layout wrappers
├── icons/                      # SVG icon components
├── styles/globals.css          # Tailwind base styles + HeroUI theme vars
│
├── backend/                    # Backend submodule (Express/NestJS)
├── .husky/                     # Git hooks (pre-commit lint, commitlint)
├── .github/                    # GitHub Actions CI
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `pages/index.tsx` | Hero banner, featured products (VNB, Lining, Gosen), category cards |
| `/racket` | `pages/racket/index.tsx` | Paginated racket list with sidebar filters |
| `/racket/[racketid]` | `pages/racket/[racketid]/index.tsx` | Racket detail — specs, add to cart |
| `/shoes` | `pages/shoes/index.tsx` | Shoes listing with filters |
| `/shoes/[shoesid]` | `pages/shoes/[shoesid]/index.tsx` | Shoes detail |
| `/shuttlecock` | `pages/shuttlecock/index.tsx` | Shuttlecock listing |
| `/shuttlecock/[shuttlecockid]` | `pages/shuttlecock/[shuttlecockid]/index.tsx` | Shuttlecock detail |
| `/cart` | `pages/cart/index.tsx` | Cart items, quantity controls, proceed to checkout |
| `/checkout` | `pages/checkout/index.tsx` | Order review, shipping form, payment method |
| `/chat` | `pages/chat/index.tsx` | AI chat assistant with product cards in responses |
| `/login` | `pages/login/index.tsx` | Credentials + Google/GitHub OAuth |
| `/register` | `pages/register/index.tsx` | New user registration |
| `/profile` | `pages/profile/index.tsx` | User profile page |

---

## API Routes

### `POST /api/chat` — AI Chat Assistant

**File:** `app/api/chat/route.ts`

Streams responses using Vercel AI SDK with Google Gemini (`gemini-2.5-flash`). Defines two tools the model can call:

| Tool | Description | Backend endpoint called |
|---|---|---|
| `search_racket` | Search by product name or keyword | `GET ${BACKEND_URL}/products?search=...` |
| `search_racket_by_attributes` | Search by weight, balance, stiffness, brand | `GET ${BACKEND_URL}/rackets?...` |

The model autonomously decides when to call these tools, then synthesizes a natural-language response with embedded product results.

### `GET|POST /api/auth/[...nextauth]` — Authentication

**File:** `pages/api/auth/[...nextauth].ts`

Catch-all NextAuth.js route. Delegates entirely to `lib/auth.ts`.

---

## State Management

The app uses three complementary state mechanisms — each with a distinct responsibility:

### 1. React Query — Server State

All product and cart data is owned by React Query. Cache settings per domain:

| Data | `staleTime` | `refetchInterval` |
|---|---|---|
| Products (rackets, shoes, shuttlecocks) | 5 minutes | — |
| Shopping cart | 0 (always fresh) | 5 seconds |

Mutations (`useAddToCart`, `useRemoveCart`, `useUpdateCartQuantity`) invalidate the `cart` query key on success so the UI updates immediately.

### 2. Zustand — Persistent Client State

**File:** `stores/useSelectedCart.ts`

Stores which cart items the user has *selected* for checkout (checkboxes). Persisted to `localStorage` under the key `'selected-cart'` so selections survive a hard refresh.

```typescript
interface SelectedCartState {
  selectedItems: CartItem[];
  toggleItem: (item: CartItem) => void;
  clearItems: () => void;
  setLastVisitedRoute: (route: string) => void;
}
```

### 3. Context API — Checkout Business Logic

**File:** `context/context.tsx`

`CheckoutContext` wraps the Zustand store and exposes higher-level helpers used across checkout pages:

```typescript
{
  checkoutItems: CartItem[];
  addCheckoutItem: (item: CartItem) => void;
  removeCheckoutItem: (productId: string) => void;
  clearCheckoutItems: () => void;
  getCheckoutTotal: () => number;
  isInCheckout: (productId: string) => boolean;
}
```

---

## Authentication Flow

**Library:** NextAuth.js v4 with JWT strategy

**Configured providers:**
- `CredentialsProvider` — calls `POST ${BACKEND_URL}/auth/login`
- `GoogleProvider` — standard OAuth via Google Console credentials
- `GitHubProvider` — standard OAuth via GitHub App credentials

**Flow (credentials):**

```
User submits form
  → lib/nestauth.ts login()
    → POST /auth/login { mail, password }
      → Backend returns { user, access_token }
        → NextAuth JWT callback stores { id, email, name, accessToken }
          → Session available via useSession() throughout the app
```

**Session shape:**

```typescript
session.user = {
  id: string;
  email: string;
  name: string;
  accessToken: string;  // Used for authenticated backend calls
}
```

**Key files:**
- `lib/auth.ts` — Provider config, JWT & session callbacks
- `lib/nestauth.ts` — `login()` and `register()` fetch wrappers
- `pages/api/auth/[...nextauth].ts` — Route handler

---

## Data Fetching with React Query

All hooks follow the same pattern. Example from `useGetRacket.ts`:

```typescript
export const useGetRacket = (filters: RacketFilters) => {
  return useQuery({
    queryKey: ['racket', filters],     // Re-fetches automatically when filters change
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/rackets?${buildQueryString(filters)}`)
      return { data: data.data, total: data.total }
    },
    staleTime: 1000 * 60 * 5,         // Cached for 5 minutes
  })
}
```

Filters come from component-level state and are passed as URL query params. Changing a filter updates the `queryKey`, triggering a new fetch automatically.

**Available hooks:**

```
useGetRacket(filters)           → { data: Racket[], total: number }
useGetRacketbyId(id)            → Racket
useGetShoes(filters)            → { data: Shoes[], total: number }
useGetShoesbyId(id)             → Shoes
useGetShuttlecocks(filters)     → { data: Shuttlecock[], total: number }
useGetShuttlecockbyId(id)       → Shuttlecock
useGetCart(userId)              → CartItem[]   (polls every 5s)
useGetUser(userId)              → User

useAddToCart()                  → mutation
useRemoveCart()                 → mutation
useUpdateCartQuantity()         → mutation
useSearchProduct(query)         → SearchResult[]
```

---

## AI Chat Assistant

**Page:** `/chat`  
**API Route:** `app/api/chat/route.ts`  
**Model:** `gemini-2.5-flash` via `@ai-sdk/google`

The chat UI uses `useChat()` from `@ai-sdk/react`. Messages stream token-by-token from the server. When the model invokes a tool, the frontend renders `<ChatProductCard />` components inside the chat bubble using `react-markdown`.

**Architecture:**

```
User message
  → POST /api/chat (streaming)
    → Gemini decides to call search_racket or search_racket_by_attributes
      → Server calls backend product APIs
        → Results injected back into model context
          → Gemini generates response with product recommendations
            → Streamed back to client
```

Tool schemas are defined with Zod and converted to JSON Schema for the model. This ensures type-safe tool call/response parsing on the server.

---

## Styling System

**Tailwind CSS v4** with a custom HeroUI theme.

### Color Palette

| Token | Light Mode | Dark Mode |
|---|---|---|
| Background | `#f6f1eb` (warm cream) | `#111a15` (deep forest) |
| Primary | `#3f8066` (forest green) | `#4fa882` |
| Secondary | `#ddc1a2` (sandy tan) | `#c4a07e` |

### Typography

Font family: **Montserrat** (loaded via CSS variable from Google Fonts)

### Responsive Breakpoints (standard Tailwind)

| Prefix | Min-width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Product grids adapt from 1 column (mobile) to 4 columns (desktop). Sidebar filters collapse into a Drawer on mobile.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required — AI Chat
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Required — NextAuth
NEXTAUTH_SECRET=any_random_secret_string_at_least_32_chars

# Required — OAuth Providers
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# Required — Backend target
# Set to "dev" to point at localhost:3001, anything else hits the Vercel backend
NEXT_PUBLIC_ENV=dev
```

**Backend URL resolution** (`constants/index.ts`):

```typescript
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod' || process.env.NEXT_PUBLIC_ENV === 'qa'
    ? 'https://badminton-econ-app-express-backend.vercel.app'
    : 'http://localhost:3001';
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+ (`npm install -g pnpm`)
- A running backend (see `backend/` submodule or use the deployed URL)

### 1. Clone the repository

```bash
git clone --recurse-submodules https://github.com/TheCodister/badminton-econ-app.git
cd badminton-econ-app
```

> `--recurse-submodules` pulls the `backend/` submodule as well. If you forgot it, run `git submodule update --init`.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local   # or create manually from the table above
```

### 4. Start the development server

```bash
pnpm dev
```

App runs at **http://localhost:3000**.

If you also need the backend locally:

```bash
cd backend
pnpm install
pnpm dev   # starts on :3001
```

---

## Development Workflow

### Available scripts

```bash
pnpm dev        # Start dev server (hot reload)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm format     # Run Prettier
pnpm test       # Run Playwright E2E tests
```

### Git conventions

This repo uses **commitlint** + **Husky**:
- Pre-commit: ESLint + Prettier run automatically via `lint-staged`
- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec  
  Examples: `feat: add filter by price`, `fix: cart not updating on remove`, `chore: update deps`

### Adding a new product category

1. Create hooks in `hooks/` following the `useGetRacket.ts` pattern
2. Add a page under `pages/<category>/index.tsx` and `[id]/index.tsx`
3. Create a sidebar filter component in `components/sidebar/`
4. Add a product card in `components/card/`
5. Register the category in `constants/` and update the navbar

### Adding a new AI tool

1. Define the tool schema with Zod in `app/api/chat/route.ts`
2. Implement the `execute` function that calls the backend
3. The model will automatically discover and use the tool based on its description

---

## Roadmap

- [x] OAuth authentication (Google, GitHub)
- [x] Multi-category product filtering
- [x] AI chat assistant with Gemini
- [x] Dark mode
- [ ] Order tracking system
- [ ] Admin dashboard for product/order management
- [ ] Improved AI recommendation accuracy
- [ ] Product reviews & ratings

---

## License

[MIT](https://github.com/TheCodister/badminton-econ-app/blob/main/LICENSE)

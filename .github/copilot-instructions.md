## Quick orientation — project snapshot

- This is a Vite + React (TypeScript) single-page starter that was forked from a Next.js starter (README still references Next.js). The dev server is Vite (see `package.json` -> `scripts.dev`), not `next`.
- Entrypoint: `index.html` -> `src/main.tsx`. App root and manual view routing live in `src/App.tsx` (not file-based routing).
- Primary UI folder: `src/components/` (TypeScript/TSX). There's a legacy `components/` folder at repo root (JSX) — prefer `src/*` for edits unless the user explicitly references root files.

## Important files to read first

- `vite.config.ts` — Vite + `@vitejs/plugin-react-swc`, aliases (`@` -> `./src`), server port (3000) and build outDir (`build`). Use the `@` alias in imports when appropriate.
- `src/main.tsx` — React DOM mount.
- `src/App.tsx` — top-level app; manual view switching (`home`, `products`, `product`, `checkout`, `order-success`). Changes here affect app navigation.
- `src/context/CartContext.tsx` — single source of truth for cart state. Exposes `useCart()` and reducer actions: `HYDRATE`, `ADD`, `REMOVE`, `UPDATE_QTY`, `CLEAR`. Persisted to localStorage under key `royal_cart`.
- `src/lib/products.ts` — product fixtures, `getProducts()`, `getProduct(id)`, and `mockCheckout(cart, customer)` which simulates an API and returns `{ orderId, total }`.
- `src/styles/globals.css` — design tokens and CSS variables used across components (many utility classnames reference these variables).

## Architecture / data flow (short)

- App-level view state (in `src/App.tsx`) routes which page component is rendered. Data and persistent state are in `CartContext`.
- Product data is local (static array in `src/lib/products.ts`). Checkout is mocked there — there is no real backend by default.
- UI primitives live under `src/components/ui/` — small wrappers around Radix/third-party libraries. Reuse these for controls, toasters, dialogs, etc.

## Project-specific conventions and gotchas

- Dual component trees: prefer `src/components/*` (TSX). The top-level `components/` (JSX) looks like leftover demos and may not be wired to `src/App.tsx`.
- Manual routing: don't add file-based routes expecting Next.js behavior. Modify `src/App.tsx` to change navigation flow.
- Cart payload shape (use when dispatching actions):
  - CartItem: `{ id: string, name: string, price: number, img: string, unit: string, quantity: number }`
  - Dispatch example: `dispatch({ type: 'ADD', payload: cartItem })` (see `CartContext.tsx`).
- Persistence key: localStorage key is `royal_cart` (used in `CartContext.tsx`). Be careful when changing it — tests/manual checks expect this key.
- Aliases: import from `@/...` is available via `vite.config.ts` aliasing `@` -> `./src`.

## Build / run / debug (commands discovered)

- Install: `npm i` (project uses npm lock implicitly in package.json)
- Dev server: `npm run dev` -> runs `vite` and opens browser at port 3000 (see `vite.config.ts`).
- Build: `npm run build` -> `vite build`, outputs to `build/`.
- There are no test scripts or typecheck scripts in `package.json`. Type errors are handled by Vite/SWC during dev/build. If you add a formal type-check step, run `npx tsc --noEmit` after adding `tsconfig.json`.

## Integration points & external dependencies

- UI: many Radix primitives and small UI helpers under `src/components/ui/*`. Match existing patterns for props/styling.
- Images: product images are external Unsplash URLs in `src/lib/products.ts`.
- Mock API: `mockCheckout` in `src/lib/products.ts` is the only checkout integration. If replacing with a real API, adapt `CheckoutPage` and `mockCheckout` usage.

## Examples an AI should use when editing or creating code

- To list products use: `import { getProducts } from '@/lib/products'` (or relative path) and call `getProducts()`.
- To add an item to cart in a component with access to `useCart()`:
  - `const { dispatch } = useCart()`
  - `dispatch({ type: 'ADD', payload: { id, name, price, img, unit, quantity } })`
- To trigger a mock checkout: call `mockCheckout(cart, customer)` and handle the promise (it delays ~1s and throws if cart is empty).

## Editing guidance for maintainers / AI agents

- Prefer modifying files under `src/` (TSX). If you must edit files in the root `components/`, check whether `src/App.tsx` imports them — otherwise you may be changing dead code.
- Keep CSS variable names in `src/styles/globals.css` in sync if adding new theme tokens; components use these variables directly (e.g., `var(--background)`).
- Use the `@` alias for absolute imports from `src` where it improves clarity (configured in `vite.config.ts`).

## When you can't find tests or CI

- There are no tests, no CI configs, and no `.github` automation other than this file. If you add tests, also add npm scripts (`test`, `typecheck`) and update the README/CI as needed.

If anything above looks incomplete or you want instructions expanded (examples for `CheckoutPage`, sample `tsconfig.json`, or a recommended lint/type-check step), tell me which area to expand and I'll update this file.

# Lumina Finance — Dashboard UI

Next.js (App Router) finance dashboard built for the **Finance Dashboard UI** assignment: frontend only, mock JSON data, no backend.

## Requirements coverage

| Requirement | Implementation |
|-------------|------------------|
| **Dashboard overview** | Summary cards: Total balance, Income, Expenses (`SummaryCards`). |
| **Time-based visualization** | Running **balance trend** area chart (Recharts), from monthly net flow. |
| **Categorical visualization** | **Spending by category** donut/pie chart (expenses only). |
| **Transactions** | Table with **date, amount, category, type**; **search**, category/type **filters**, **sort** (column + direction). |
| **Role-based UI** | **Viewer**: read-only (no add/edit). **Admin**: add and edit transactions. Toggle in header. |
| **Insights** | Highest spending category, month-over-month expense comparison, portfolio snapshot / average expense. |
| **State management** | **Zustand** store: transactions, filters, sort, role; **persist** to `localStorage` for transactions + role. |
| **UI/UX** | Responsive layout, readable typography, **empty states** (no data / no filter matches). |
| **Optional** | **Dark mode** (next-themes), **export** CSV/JSON, subtle **motion** on landing. |

## Mock data

- Seed file: `data/initial-transactions.json`
- Loaded into the store as the default dataset; **Reset demo data** (admin footer) restores this seed after local experiments.

## Getting started

```bash
npm install
npm run dev
```

Open [https://finance-dashboard-frontend-flame.vercel.app/](https://finance-dashboard-frontend-flame.vercel.app/) for the **landing page**, then **Enter dashboard** or go to `/dashboard`.

```bash
npm run build
npm start
```

## Light / dark mode

`next-themes` toggles a `dark` class on `<html>`. Tailwind v4’s default `dark:` variant follows **prefers-color-scheme** only, so `app/globals.css` adds:

`@custom-variant dark (&:where(.dark, .dark *));`

so `dark:` utilities respond to that class and the toggle works.

## Footer & contact

Global footer: `components/site-footer.tsx` — **light site → dark footer**, **dark site → light footer**. Edit names, email, and social URLs in `lib/site-config.ts`, or set `NEXT_PUBLIC_LINKEDIN_URL` and `NEXT_PUBLIC_INSTAGRAM_URL` in `.env.local`.

## Tech stack

- **Next.js** 16, **React** 19, **TypeScript**
- **Tailwind CSS** v4
- **Recharts** for charts
- **Zustand** (+ persist) for state
- **next-themes** for light/dark
- **lucide-react** for icons

## Project structure (high level)

- `app/page.tsx` — Marketing-style landing
- `app/dashboard/page.tsx` — Dashboard route
- `components/dashboard/*` — Dashboard UI sections
- `lib/store.ts` — Global finance state (`computeFilteredSortedTransactions` is used with `useMemo`, not as a raw Zustand selector, to avoid React snapshot loops)
- `lib/finance-helpers.ts` — Aggregations for charts and insights
- `data/initial-transactions.json` — Mock ledger

## Notes

- Charts are loaded with `dynamic(..., { ssr: false })` so Recharts measures layout correctly in the browser.
- Persisted state lives under the key `finance-dashboard-storage` in `localStorage`.

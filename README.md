# 💰 Expense Tracker

A production-ready expense tracker built with **Next.js 14 (App Router)**, **TypeScript**, **TailwindCSS**, **Supabase**, and **Zod**.

---

## Project Structure

```
expense-tracker/
├── app/
│   ├── actions/
│   │   └── transactions.ts   # Server Actions (create, delete)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main dashboard page (Server Component)
├── components/
│   ├── DashboardSummary.tsx  # Income / Expense / Balance cards
│   ├── FilterBar.tsx         # Month + category filter (Client Component)
│   ├── TransactionForm.tsx   # Add transaction form (Client Component)
│   ├── TransactionItem.tsx   # Single row with delete (Client Component)
│   └── TransactionList.tsx   # Renders all rows (Server Component)
├── lib/
│   ├── supabase.ts           # Supabase client + data access layer
│   ├── utils.ts              # formatCurrency, formatDate, helpers…
│   └── validations.ts        # Zod schemas
├── types/
│   └── index.ts              # Shared TypeScript types
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 1 — Create the Supabase Table

Open your Supabase project → **SQL Editor** and run:

```sql
-- Main transactions table
CREATE TABLE transactions (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  amount      NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  type        TEXT        NOT NULL CHECK (type IN ('income', 'expense')),
  category    TEXT        NOT NULL,
  note        TEXT        NOT NULL DEFAULT '',
  date        DATE        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for the filter queries
CREATE INDEX idx_transactions_date     ON transactions (date);
CREATE INDEX idx_transactions_category ON transactions (category);
CREATE INDEX idx_transactions_type     ON transactions (type);
```

---

## 2 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Find these values in your Supabase project under **Project Settings → API**.

---

## 3 — Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 4 — Build for Production

```bash
npm run build
npm start
```

---

## Features

| Feature | Status |
|---|---|
| Add income / expense transactions | ✅ |
| Dashboard: total income, expenses, balance | ✅ |
| Filter by month | ✅ |
| Filter by category | ✅ |
| Delete transactions | ✅ |
| Zod request validation | ✅ |
| Loading states & spinners | ✅ |
| Error handling (DB + form) | ✅ |
| Currency formatting (Intl API) | ✅ |
| Responsive layout | ✅ |
| Strong TypeScript typing | ✅ |

---

## Tech Stack

- **Next.js 14** — App Router, Server Components, Server Actions
- **TypeScript** — strict mode throughout
- **TailwindCSS** — utility-first styling
- **Supabase** — PostgreSQL database + JS client
- **Zod** — runtime schema validation

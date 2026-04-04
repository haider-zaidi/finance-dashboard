"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useFinanceStore } from "@/lib/store";
import { DashboardQuickStats } from "./dashboard-quick-stats";
import { InsightsPanel } from "./insights-panel";
import { MonthlyCashflowBars } from "./monthly-cashflow-bars";
import { RecentActivity } from "./recent-activity";
import { RoleSwitcher } from "./role-switcher";
import { SummaryCards } from "./summary-cards";
import { ThemeToggle } from "./theme-toggle";
import { TransactionsSection } from "./transactions-section";
import { TrustStrip } from "./trust-strip";

const BalanceTrendChart = dynamic(
  () =>
    import("./balance-trend-chart").then((m) => ({
      default: m.BalanceTrendChart,
    })),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const SpendingBreakdownChart = dynamic(
  () =>
    import("./spending-chart").then((m) => ({
      default: m.SpendingBreakdownChart,
    })),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

function ChartSkeleton() {
  return (
    <div className="mt-4 h-[300px] animate-pulse rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60" />
  );
}

export function DashboardApp() {
  const role = useFinanceStore((s) => s.role);
  const resetToSeed = useFinanceStore((s) => s.resetToSeed);

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col bg-gradient-to-b from-zinc-50 via-white to-violet-50/40 dark:from-zinc-950 dark:via-zinc-950 dark:to-violet-950/30">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400/30 via-fuchsia-300/20 to-transparent dark:from-violet-600/25 dark:via-fuchsia-600/15"
        aria-hidden
      />

      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/80 text-zinc-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-violet-500"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Lumina Finance
                </p>
                <h1 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
                  Activity dashboard
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <RoleSwitcher />
          </div>
        </div>
      </header>

      <main className="relative z-0 w-full flex-1 space-y-8 px-4 py-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1600px] space-y-8">
          <div id="section-overview" className="scroll-mt-28 space-y-6">
            <DashboardQuickStats />
            <SummaryCards />
          </div>

          <TrustStrip />

          <div id="section-analytics" className="scroll-mt-28 space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {role === "admin"
                    ? "Balance trajectory (line)"
                    : "Balance trend (area)"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {role === "admin"
                    ? "Running balance as a sharp line with point markers — same data as the viewer area chart."
                    : "Running balance with a soft filled area — switch to Admin to see the line variant."}
                </p>
                <BalanceTrendChart />
              </section>
              <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {role === "admin"
                    ? "Spending by category (bars)"
                    : "Spending by category (donut)"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {role === "admin"
                    ? "Horizontal bars for quick comparison across categories."
                    : "Donut split to see share of wallet at a glance."}
                </p>
                <SpendingBreakdownChart />
              </section>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {role === "admin"
                    ? "Monthly cash flow (columns)"
                    : "Monthly cash flow (strips)"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {role === "admin"
                    ? "Grouped columns per month — richer than the compact viewer strips."
                    : "Lightweight twin bars per month; Admin view uses full column groups."}
                </p>
                <div className="mt-4">
                  <MonthlyCashflowBars />
                </div>
              </section>
              <RecentActivity />
            </div>
          </div>

          <section id="section-insights" className="scroll-mt-28">
            <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Insights
            </h2>
            <InsightsPanel />
          </section>

          <TransactionsSection />

          <div className="flex flex-col items-start justify-between gap-3 border-t border-zinc-200/60 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row sm:items-center">
            <p>
              Demo dataset with optional local persistence. Site footer has
              support and social links.
            </p>
            {role === "admin" && (
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      "Reset all transactions to the original demo JSON? This cannot be undone."
                    )
                  )
                    resetToSeed();
                }}
                className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
              >
                Reset demo data
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

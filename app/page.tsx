import Image from "next/image";
import Link from "next/link";
import landingHero from "../public/images/img24.jpg";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.22),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(217,70,239,0.12),transparent_45%),radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(34,211,238,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.45),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(217,70,239,0.25),transparent_45%),radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(34,211,238,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-zinc-50/95 to-zinc-100 dark:from-zinc-950/20 dark:via-zinc-950/80 dark:to-zinc-950" />

      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
            <LayoutDashboard className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Lumina Finance
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
          <a
            href="#experience"
            className="transition hover:text-violet-700 dark:hover:text-white"
          >
            Experience
          </a>
          <a
            href="#highlights"
            className="transition hover:text-violet-700 dark:hover:text-white"
          >
            Highlights
          </a>
          <a
            href="#flow"
            className="transition hover:text-violet-700 dark:hover:text-white"
          >
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-violet-300 hover:text-violet-800 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:shadow-none dark:hover:border-violet-400/50 dark:hover:bg-white/10"
          >
            Open dashboard
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1 text-xs font-medium text-violet-800 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-violet-200/90">
          <Sparkles className="h-3.5 w-3.5" />
          Personal finance snapshot — charts, ledger, and insights in one view
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl md:leading-[1.05] dark:text-white">
          Clarity for every{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-cyan-200">
            dollar in motion
          </span>
          .
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lumina brings your cash flow into focus: balances at a glance, trends
          over time, spending by category, and a transaction ledger you can
          search and slice. Switch between overview and detail without losing
          context — built as a fast, focused interface you can explore end to
          end.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-violet-600/25 transition hover:brightness-110 dark:shadow-violet-600/35"
          >
            Enter dashboard
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#highlights"
            className="text-sm font-medium text-zinc-500 underline-offset-4 transition hover:text-violet-700 hover:underline dark:text-zinc-400 dark:hover:text-white"
          >
            See what&apos;s inside
          </Link>
        </div>

        <section
          className="relative mt-16 md:mt-24"
          aria-label="Product preview"
        >
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-0 sm:px-2 lg:px-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-tr from-amber-500/15 via-violet-500/25 to-fuchsia-500/20 opacity-90 blur-3xl dark:from-amber-500/10 dark:via-violet-500/35 dark:to-fuchsia-500/25"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-[0_32px_64px_-12px_rgba(24,24,27,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] dark:border-white/[0.12] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
                  <div className="relative aspect-[5/2] min-h-[220px] sm:min-h-[260px] md:aspect-[2.35/1] md:min-h-[300px]">
                    <Image
                      src={landingHero}
                      alt="Lumina Finance dashboard preview: portfolio summary, major indices chart, sectors, and stock tiles in a dark glass UI."
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1200px"
                      className="object-cover object-[center_42%]"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-50 via-zinc-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/50"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 grid grid-cols-2 gap-4 border-y border-zinc-200 py-10 dark:border-white/10 md:grid-cols-4">
          {[
            {
              label: "Summary tiles",
              value: "3",
              sub: "Balance · Income · Spend",
            },
            { label: "Live visuals", value: "2", sub: "Trend & category" },
            {
              label: "Ledger tools",
              value: "6+",
              sub: "Filter · sort · search",
            },
            { label: "Modes", value: "2", sub: "Viewer & admin preview" },
          ].map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="text-3xl font-semibold tracking-tight text-violet-700 md:text-4xl dark:text-white">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-300">
                {s.label}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <section id="experience" className="mt-20 md:mt-28">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300/90">
            Experience
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl dark:text-white">
            A calm surface for noisy numbers — so you notice patterns before
            they become problems.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The dashboard pairs high-signal cards with gentle gradients and
            glass panels. Charts explain direction: where money pooled, which
            categories grew, and how your running balance evolved month by
            month. Every interaction is meant to feel intentional, from the
            first glance to the last sorted row.
          </p>
        </section>

        <section id="highlights" className="mt-16 md:mt-24">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300/90">
            Highlights
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Overview & charts",
                desc: "Balance, income, and expenses sit up front. A time-based trend shows momentum; a category chart reveals where spending concentrates.",
                icon: BarChart3,
              },
              {
                title: "Ledger you can steer",
                desc: "Search across categories and notes, narrow by type, reorder by date or amount, and export what you see for your own records.",
                icon: LineChart,
              },
              {
                title: "Roles, demonstrated",
                desc: "Preview read-only viewing, then switch to an elevated mode to add or refine entries — a clear UX story for collaborative products.",
                icon: ShieldCheck,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition hover:border-violet-300/60 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-violet-500/30 dark:hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/80 to-fuchsia-600/80 text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white to-violet-50/40 p-8 backdrop-blur-md dark:border-white/10 dark:from-white/[0.07] dark:to-transparent md:grid-cols-2 md:p-10 md:mt-24">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-200/80">
              Insight strip
            </h2>
            <p className="mt-3 text-xl font-semibold text-zinc-900 md:text-2xl dark:text-white">
              Small observations, surfaced automatically
            </p>
            <ul className="mt-6 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              {[
                "Spot your heaviest spending category at a glance.",
                "Compare recent months to see if habits are drifting.",
                "Keep context with notes beside each line in the ledger.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400/90" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-zinc-200/80 bg-white/60 p-6 dark:border-white/10 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <PieChart className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-300" />
              <span className="font-medium">Category discipline</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Donut and area treatments make tradeoffs visible: steady inflows,
              lumpy outflows, and the categories that quietly add up. Use them
              together with the table to validate the story behind the chart.
            </p>
            <div className="flex items-center gap-3 border-t border-zinc-200 pt-4 text-zinc-900 dark:border-white/10 dark:text-white">
              <Wallet className="h-8 w-8 text-violet-600 dark:text-violet-300" />
              <span className="font-medium">Designed for daily check-ins</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Short sessions should still feel productive — that&apos;s why
              filters persist in-session and the layout breathes on large and
              small screens alike.
            </p>
          </div>
        </section>

        <section id="flow" className="mt-16 md:mt-24">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300/90">
            How it works
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Scan the overview",
                body: "Start with balance, income, and expenses — then read the trend to see whether momentum is building or fading.",
              },
              {
                step: "02",
                title: "Decode categories",
                body: "Open the spending split to find concentration risk. Pair it with insights for a quick narrative of the month.",
              },
              {
                step: "03",
                title: "Dig into the ledger",
                body: "Filter, sort, and search rows; when you are previewing elevated access, add or refine entries and export results.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-zinc-200/80 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="font-mono text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300/90">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-3xl border border-violet-200 bg-violet-50/80 p-8 text-center dark:border-violet-500/20 dark:bg-violet-950/30 md:mt-24 md:p-12">
          <Zap className="mx-auto h-10 w-10 text-amber-600 dark:text-amber-300" />
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
            &ldquo;We wanted a finance surface that feels premium without
            feeling complicated — something you&apos;d actually open on a Sunday
            evening.&rdquo;
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            — Lumina product narrative
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-violet-300/60 bg-white px-6 py-3 text-sm font-semibold text-violet-900 shadow-sm transition hover:bg-violet-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/15"
          >
            Launch the dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";
import { Mail, LifeBuoy } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { InstagramLogo, LinkedInLogo } from "@/components/social-brand-icons";

const socialBtn =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-600 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900/80 hover:text-[#0A66C2] dark:border-zinc-300 dark:bg-white dark:text-zinc-700 dark:hover:border-[#0A66C2] dark:hover:bg-zinc-50";

const socialBtnIg =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-600 text-zinc-300 transition hover:border-pink-500 hover:bg-zinc-900/80 hover:text-pink-400 dark:border-zinc-300 dark:bg-white dark:text-zinc-700 dark:hover:border-pink-500 dark:hover:text-pink-600 dark:hover:bg-zinc-50";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t-2 border-zinc-800 bg-zinc-950 text-zinc-400 dark:border-zinc-200 dark:bg-white dark:text-zinc-600"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
              {siteConfig.product}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-300 dark:text-zinc-600">
              {siteConfig.description} Built with Next.js as a focused UI for
              summaries, interactive charts, transaction management, role-based
              views, and actionable insights.
            </p>
            <p className="mt-4 text-sm font-medium text-white dark:text-zinc-900">
              {siteConfig.author}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
              Support
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}?subject=Lumina%20Finance%20support`}
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-white dark:text-zinc-600 dark:hover:text-zinc-900"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                  <LifeBuoy className="h-4 w-4 shrink-0" />
                  Help — use email for inquiries
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
              Connect
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/haider-zaidi-48576a252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialBtn}
                  aria-label="LinkedIn"
                >
                  <LinkedInLogo className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialBtnIg}
                  aria-label="Instagram"
                >
                  <InstagramLogo className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 dark:border-zinc-200 dark:text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.author}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="transition hover:text-white dark:hover:text-zinc-900"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="transition hover:text-white dark:hover:text-zinc-900"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
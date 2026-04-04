"use client";

import { Download } from "lucide-react";
import type { Transaction } from "@/lib/types";

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportToolbar({ rows }: { rows: Transaction[] }) {

  const exportJson = () => {
    download(
      "transactions.json",
      JSON.stringify(rows, null, 2),
      "application/json"
    );
  };

  const exportCsv = () => {
    const header = ["date", "amount", "category", "type", "description"];
    const lines = [
      header.join(","),
      ...rows.map((t) =>
        [
          t.date,
          t.amount,
          JSON.stringify(t.category),
          t.type,
          JSON.stringify(t.description ?? ""),
        ].join(",")
      ),
    ];
    download("transactions.csv", lines.join("\n"), "text/csv");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={exportCsv}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-violet-500"
      >
        <Download className="h-4 w-4" />
        CSV
      </button>
      <button
        type="button"
        onClick={exportJson}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-violet-500"
      >
        <Download className="h-4 w-4" />
        JSON
      </button>
    </div>
  );
}

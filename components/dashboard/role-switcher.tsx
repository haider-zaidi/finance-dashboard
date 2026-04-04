"use client";

import { Shield, Eye } from "lucide-react";
import { useFinanceStore } from "@/lib/store";

export function RoleSwitcher() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 p-1 dark:border-zinc-700 dark:bg-zinc-900/60">
      {(
        [
          { id: "viewer" as const, label: "Viewer", icon: Eye },
          { id: "admin" as const, label: "Admin", icon: Shield },
        ] as const
      ).map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setRole(id)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
            role === id
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/25"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

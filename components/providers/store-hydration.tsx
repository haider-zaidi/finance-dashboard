"use client";

import { useEffect } from "react";
import { useFinanceStore } from "@/lib/store";

export function StoreHydration() {
  useEffect(() => {
    useFinanceStore.persist.rehydrate();
  }, []);
  return null;
}

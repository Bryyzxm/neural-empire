// useT — minimal i18n hook backed by zustand's `language` field in gameStore.
//
// Usage:
//   const t = useT();
//   <Text>{t("dashboard.cash")}</Text>
//   <Text>{t("error.cash_insufficient", { amount: 150 })}</Text>
//
// Keys are flat dot-namespaced strings ("domain.subdomain.specific").
// Missing key → falls back to ID value, then to the key itself (so UI never crashes).
// Interpolation: "{name}" in the string, params: { name: "Lumen" }.

import { useMemo, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { STRINGS } from "./strings";
import { STRINGS_LONG } from "./stringsLong";

// Merge chrome (strings.js) and long-form (stringsLong.js) into one dict
// per language. Lookup tries chrome first, then long-form.
const MERGED = {
  id: { ...STRINGS.id, ...STRINGS_LONG.id },
  en: { ...STRINGS.en, ...STRINGS_LONG.en },
};

export function useT() {
  const lang = useGameStore((s) => s.language);
  return useMemo(() => {
    const dict = MERGED[lang] || MERGED.id;
    return (key, params) => {
      if (typeof key !== "string") return String(key);
      let str = dict[key];
      if (str === undefined) str = MERGED.id[key] ?? key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.split("{" + k + "}").join(String(v));
        }
      }
      return str;
    };
  }, [lang]);
}

export function tFor(lang, key, params) {
  const dict = MERGED[lang] || MERGED.id;
  let str = dict[key];
  if (str === undefined) str = MERGED.id[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.split("{" + k + "}").join(String(v));
    }
  }
  return str;
}

// Format a number as currency in the user's locale.
// ID: "Rp 1.500.000", EN: "$1,500.00" — cheap locale switch via language.
export function formatCurrencyLocalized(value, lang) {
  const v = Number(value) || 0;
  if (lang === "en") {
    return "$" + v.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return "Rp " + v.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

// Format a number with thousands separator.
export function formatNumberLocalized(value, lang) {
  const v = Number(value) || 0;
  return v.toLocaleString(lang === "en" ? "en-US" : "id-ID");
}

// Format a date in the user's locale.
export function formatDateLocalized(timestamp, lang) {
  if (!timestamp) return "—";
  try {
    return new Date(timestamp).toLocaleDateString(
      lang === "en" ? "en-US" : "id-ID",
    );
  } catch {
    return "—";
  }
}

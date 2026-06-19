import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import type { Locale } from "@/lib/site";

export const dictionaries = { fr, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}

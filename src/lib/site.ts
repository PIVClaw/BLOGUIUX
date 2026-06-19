export const siteConfig = {
  name: "Naj Tech Journal",
  description:
    "A bilingual premium tech blog sharing insights, experiments, architecture notes, and lessons from real-world IT work.",
  locales: ["fr", "en"] as const,
  defaultLocale: "fr" as const,
};

export type Locale = (typeof siteConfig.locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

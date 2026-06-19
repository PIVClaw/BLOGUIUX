"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/site";
import { siteConfig } from "@/lib/site";

const STORAGE_KEY = "bloguiux-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return siteConfig.defaultLocale;
  const browser = window.navigator.language.toLowerCase();
  return browser.startsWith("fr") ? "fr" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(siteConfig.defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    const next = stored && siteConfig.locales.includes(stored) ? stored : detectBrowserLocale();
    setLocaleState(next);
    document.documentElement.lang = next;
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

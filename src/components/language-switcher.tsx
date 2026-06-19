"use client";

import { localeLabels, localeNames, type Locale } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label="Language switcher">
      {(Object.keys(localeLabels) as Locale[]).map((value) => {
        const active = value === locale;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            className={`language-switcher__button ${active ? "is-active" : ""}`}
            aria-pressed={active}
            title={localeNames[value]}
          >
            <span>{localeLabels[value]}</span>
          </button>
        );
      })}
    </div>
  );
}

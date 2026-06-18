export const siteConfig = {
  name: "Les aventures tech de Naj",
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

export const dictionary: Record<Locale, {
  nav: { home: string; blog: string; about: string; contact: string };
  hero: { eyebrow: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  home: { featured: string; latest: string; readArticle: string; viewAll: string };
  blog: { title: string; subtitle: string; readMore: string };
  about: { title: string; body: string };
  contact: { title: string; body: string; emailLabel: string };
}> = {
  fr: {
    nav: { home: "Accueil", blog: "Blog", about: "À propos", contact: "Contact" },
    hero: {
      eyebrow: "Tech, systèmes & idées utiles",
      title: "Les aventures tech de Naj",
      subtitle:
        "Un blog bilingue, moderne et premium où je partage retours d'expérience, architecture, automatisation et apprentissages concrets.",
      ctaPrimary: "Lire le blog",
      ctaSecondary: "En savoir plus",
    },
    home: {
      featured: "Article en avant",
      latest: "Derniers articles",
      readArticle: "Lire l'article",
      viewAll: "Voir tous les articles",
    },
    blog: {
      title: "Blog",
      subtitle: "Des articles sur la tech, les systèmes, l'automatisation et la construction de produits utiles.",
      readMore: "Lire la suite",
    },
    about: {
      title: "À propos",
      body:
        "Je partage ici mes explorations tech, mes réflexions sur les systèmes, et mes retours d'expérience concrets autour du développement, de l'automatisation et des outils modernes.",
    },
    contact: {
      title: "Contact",
      body: "Tu peux me contacter pour échanger autour de la tech, d'un projet, ou d'une opportunité.",
      emailLabel: "Email",
    },
  },
  en: {
    nav: { home: "Home", blog: "Blog", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Tech, systems & useful ideas",
      title: "Naj's tech adventures",
      subtitle:
        "A modern bilingual premium blog where I share practical insights on architecture, automation, tooling, and real-world engineering lessons.",
      ctaPrimary: "Read the blog",
      ctaSecondary: "About",
    },
    home: {
      featured: "Featured article",
      latest: "Latest articles",
      readArticle: "Read article",
      viewAll: "View all posts",
    },
    blog: {
      title: "Blog",
      subtitle: "Articles about tech, systems, automation, and building useful products.",
      readMore: "Read more",
    },
    about: {
      title: "About",
      body:
        "I use this space to share technical explorations, systems thinking, and practical lessons from software, automation, and modern tooling.",
    },
    contact: {
      title: "Contact",
      body: "Feel free to reach out to talk about tech, a project, or an opportunity.",
      emailLabel: "Email",
    },
  },
};

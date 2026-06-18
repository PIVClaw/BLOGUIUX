# Diff de config entre `blog` (service) et `blogUI` (load direct)

## Vue d'ensemble

| | `blog` (Service) | `blogUI` (Load Direct) |
|---|---|---|
| **Approche contenu** | Fonctions réutilisables dans `src/lib/posts.ts` + `src/lib/site.ts` | Directement dans les composants page (inline `fs`/`matter`) |
| **Routing** | Internacionalisé avec `[locale]` dynamique (`/fr`, `/en`) | Pas d'i18n, routes plates (`/`, `/blog`, `/about`) |
| **Contenu** | Fichiers `.mdx` (MDX compilé avec `next-mdx-remote/rsc`) | Fichiers `.md` bruts (rendus via `dangerouslySetInnerHTML`) |
| **Structure posts** | `content/posts/{locale}/{slug}.mdx` | `content/posts/{slug}.md` |
| **Composants shell** | `SiteShell` (layout nav, locale switcher, blur header, MouseGlow) | `Shell` client component (Header/Footer custom, SunLogo SVG, nav active state) |
| **Style** | Thème cyan/blue (`bg-[#040814]`, text-cyan, glassmorphism) | Thème stone/neutral (`bg-[#0b0b0b]`, `text-stone-*`, minimal) |
| **Composants UI** | `GlowPanel`, `MagneticCard`, `MouseGlow`, `ArticleCard` | `Card`, `Panel`, `Tag`, `Button`, `Flex`, `Grid`, `Text`, `Heading` |
| **Page d'accueil** | `[locale]/page.tsx` — Hero bilingue, featured post, 3 derniers posts | `page.tsx` — Hero "Write. Build. Think.", featured, topics grid, 6 derniers |
| **Font weights** | `Playfair_Display` (défaut), `Inter` (défaut) | `Playfair_Display` (400–700), `Inter` (300–600) |
| **Metadata description** | "A premium bilingual tech blog built with Next.js **and MDX**." | "A premium bilingual tech blog built with Next.js." |
| **Tags/Sujets** | Pas de système de topics prédéfini | 4 topics prédéfinis: Art, Code, Projects, Thoughts |

---

## 1. Architecture de chargement du contenu

### blog (Service) — `src/lib/posts.ts`
```
- Fonctions importables réutilisables
- getAllPosts(locale) → lit {locale}/ slugs .mdx, parse frontmatter, lecture temps, tri
- getFeaturedPost(locale) → premier résultat de getAllPosts
- getPostBySlug(locale, slug) → compile le MDX avec next-mdx-remote/rsc + remarkGfm
- Types PostMeta et Frontmatter centralisés
```

### blogUI (Load Direct) — inline dans page.tsx / blog/page.tsx / blog/[slug]/page.tsx
```
- function loadPosts() dupliquée dans page.tsx et blog/page.tsx
  → lit content/posts/*.md (pas de sous-dossier locale)
  → parse frontmatter avec gray-matter
  → pas de compilation MDX, rendu brut avec dangerouslySetInnerHTML
- function loadPost(slug) dans blog/[slug]/page.tsx
  → lit un seul fichier, renvoie le content HTML brut
- Pas de types partagés (Post défini en inline)
- Pas de reading time
```

---

## 2. Routing & i18n

### blog (Service)
```
src/app/
├── page.tsx           → redirect("/fr")
└── [locale]/          → layout valide locale (fr|en)
    ├── layout.tsx     → SiteShell(locale)
    ├── page.tsx       → HomePage({params.locale})
    ├── about/page.tsx
    ├── contact/page.tsx
    └── blog/
        ├── page.tsx       → BlogPage({params.locale})
        └── [slug]/page.tsx → PostPage({params.locale, slug})
```

### blogUI (Load Direct)
```
src/app/
├── layout.tsx       → RootLayout (pas de locale)
├── page.tsx         → HomePage (loadPosts inline)
├── about/page.tsx
├── contact/page.tsx
└── blog/
    ├── page.tsx       → BlogPage (loadPosts inline + searchParams topic)
    └── [slug]/page.tsx → ArticlePage (loadPost inline)
```

---

## 3. Gestion du contenu (.mdx vs .md)

| | blog | blogUI |
|---|---|---|
| Format | MDX (`.mdx`) | Markdown (`.md`) |
| Parsing | `gray-matter` + `next-mdx-remote/rsc` (compileMDX) | `gray-matter` uniquement |
| Rendu | Composants React compilés (`{post.content}`) | HTML brut (`dangerouslySetInnerHTML`) |
| Plugins | `remark-gfm` (tableaux, strikethrough, etc.) | Aucun plugin remark |
| Reading time | ✅ Calculé avec `reading-time` | ❌ Pas de reading time |
| Organisation | `content/posts/fr/` et `content/posts/en/` | `content/posts/` (plat) |

---

## 4. Composants Shell / Layout

### SiteShell (blog)
- Wrapper complet avec `<MouseGlow>` (effet CIA interactif)
- Background: `bg-[#040814]` avec gradients cyan/blue radiaux
- Header sticky `backdrop-blur-2xl` avec logo "N" badge cyan + nom du site en uppercase
- Nav avec **4 liens traduits** (dictionary + locale)
- **Locale switcher** (FR/EN pills avec glow sur l'actif)
- Footer avec copyright + nom du site
- Exporte aussi `SectionHeading`, `ArticleCard`, `GlowPanel`

### Shell (blogUI)
- **"use client"** (composant client, utilise `usePathname`)
- SunLogo SVG inline (cercle + 8 rayons)
- Background: `bg-[#0a0a0b]` avec stone palette
- Header sans blur, logo **"Once"** (nom différent !)
- Nav avec **4 liens non traduits** (Home, Articles, About, Contact)
- **Pas de locale switcher**
- Footer avec "Once UI"
- Exporte : `Card`, `Panel`, `Tag`, `Button`, `SectionHeading`, `Divider`, `Flex`, `Grid`, `Text`, `Heading`

---

## 5. Design System / Thème CSS

### blog — globals.css
```css
--background: #040814 (dark navy)
--foreground: #f8fafc
Accent: cyan (text-cyan, bg-cyan, shadow-cyan)
Radials: cyan/blue gradients
Grid overlay: SVG grid avec mask
Prose: cyan headings, cyan links, slate-300 text
```

### blogUI — globals.css
```css
--background: #0b0b0b (near-black)
--foreground: #e8e6e3
--accent: #8c8c8c (grey)
--surface: #161616
--border: rgba(255,255,255,0.07)
Radials: grey diffuse élégant (3 ellipses)
Prose: stone palette, italic blockquote, border-radius 0.75rem on images
.once-heading / .once-eyebrow: classes utilitaires custom
```

---

## 6. Fonts

### blog
```ts
Playfair_Display: défaut (400 only sauf si modifié)
Inter: défaut (400 only sauf si modifié)
```

### blogUI
```ts
Playfair_Display: weight 400, 500, 600, 700
Inter: weight 300, 400, 500, 600
```

---

## 7. Résumé des clés de différence

| Aspect | blog (Service) | blogUI (Load Direct) |
|---|---|---|
| **Pattern d'accès données** | Service layer centralisé (`lib/posts.ts`) | Inline fs/matter dans chaque page |
| **Réutilisabilité** | ✅ Fonctions importables partout | ❌ Code dupliqué entre pages |
| **i18n** | ✅ Bilingue FR/EN avec routing dynamique | ❌ Français uniquement |
| **Format contenu** | MDX compilé (composants React) | Markdown brut (dangerouslySetInnerHTML) |
| **Reading time** | ✅ Oui | ❌ Non |
| **Effets visuels** | MouseGlow, MagneticCard, GlowPanel cyan | Minimal, stone/neutral |
| **Site name** | "Les aventures tech de Naj" | "Once" |
| **Locale switcher** | ✅ Oui | ❌ Non |
| **Topics/Tags** | Non géré prédéfini | 4 topics prédéfinis |
| **Image optimization** | MDX components embed | Pas d'image handling |

## 8. Problèmes / Risques identifiés

1. **`blogUI` utilise `dangerouslySetInnerHTML`** pour le contenu markdown → risque XSS si le content est compromis, et pas de vrai rendu Markdown (juste des `<br/>`)
2. **Code dupliqué** dans `blogUI` : `loadPosts()` est défini dans `page.tsx` ET `blog/page.tsx`
3. **`blogUI` charge les fichiers côté client** : le `Shell` est `"use client"` mais `loadPosts()` lit le filesystem → ça ne fonctionne qu'en SSR, et la duplication signifie la même logique est maintenue à 2 endroits
4. **Pas de gestion d'erreur** dans `loadPost` de blogUI au-delà du `notFound()` — si le fichier est corrompu, erreur 500
5. **`blog` a une meilleure séparation des couches** mais le `redirect("/fr")` hardcoded en page racine pourrait poser souci si le defaultLocale change

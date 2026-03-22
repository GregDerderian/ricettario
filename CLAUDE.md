@AGENTS.md

# Ricettario — App de recettes italiennes

## Stack
- Next.js 16.2.1 + App Router (src/ directory)
- React 19
- Tailwind CSS v4 (syntaxe `@import "tailwindcss"`, pas de directives `@tailwind`)
- TypeScript disponible mais fichiers .jsx/.js acceptés

## Conventions
- Server Components par défaut — `'use client'` uniquement si interaction utilisateur nécessaire
- Commentaires en français, noms de variables/fonctions en anglais
- `params` est une **Promise** dans cette version : toujours `await params` dans les pages dynamiques

## Structure
- `src/lib/recettes.js` — données statiques des recettes (12 recettes italiennes)
- `src/hooks/useRecettesLocales.js` — CRUD localStorage (clés : `ricettario_recettes`, `ricettario_supprimes`)
- `src/components/` — composants réutilisables
- `src/app/recettes/[slug]/` — pages dynamiques par recette
- `src/app/recettes/[slug]/editer/` — page édition recette
- `src/app/recettes/nouvelle/` — page création recette
- `src/app/api/unsplash/` — Route Handler proxy Unsplash (clé serveur dans `UNSPLASH_ACCESS_KEY`)

## Features implémentées
- Grille de recettes avec filtres (catégorie, difficulté, recherche)
- Page détail recette (SSG + merge localStorage via `RecetteLocale`)
- Création / édition / suppression de recettes (localStorage)
- Sélecteur d'images Unsplash (recherche par mot-clé, refresh aléatoire)
- Dark mode (toggle soleil/lune, persistance localStorage, classe `.dark` sur `<html>`)

## Images
- Unsplash configuré dans `next.config.ts` via `remotePatterns`
- Toujours fournir `width` et `height` explicites à `next/image`
- Utiliser `unoptimized` pour les images Unsplash

## Dark mode
- Tailwind v4 : `@custom-variant dark (&:where(.dark, .dark *))` dans `globals.css`
- **Ne pas utiliser next-themes** — incompatible Next.js 16 / React 19
- `ThemeToggle.jsx` manipule `document.documentElement.classList` directement
- `mounted` state obligatoire pour éviter le mismatch d'hydration

## Persistence localStorage
- `ricettario_recettes` : `{ [slug]: recette }` — recettes créées/modifiées
- `ricettario_supprimes` : `string[]` — slugs des recettes statiques supprimées
- `RecetteLocale` (Client Component) fusionne données statiques + localStorage sur la page détail
- `RecetteGrid` filtre les slugs supprimés et merge les recettes locales

## Git
- Faire un `git commit` après chaque feature complète et validée par l'utilisateur (test `npm run dev` confirmé)
- Un commit = une feature, message en anglais, style conventionnel (`feat:`, `fix:`, `refactor:`)
- **Toujours stager tous les fichiers modifiés** — vérifier avec `git status` avant de commiter
- Remote en SSH : `git@github.com:GregDerderian/ricettario.git`

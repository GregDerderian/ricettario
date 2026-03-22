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
- `src/lib/recettes.js` — données statiques des recettes
- `src/components/` — composants réutilisables
- `src/app/recettes/[slug]/` — pages dynamiques par recette

## Images
- Unsplash configuré dans `next.config.ts` via `remotePatterns`
- Toujours fournir `width` et `height` explicites à `next/image`

## Git
- Faire un `git commit` après chaque feature complète et validée par l'utilisateur (test `npm run dev` confirmé)
- Un commit = une feature, message en anglais, style conventionnel (`feat:`, `fix:`, `refactor:`)

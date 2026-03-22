"use client";

// Affiche la page détail d'une recette en priorisant localStorage sur les données statiques.
// Cas couverts :
//   1. Recette statique non modifiée → recetteStatique utilisée directement
//   2. Recette statique modifiée → version localStorage prend le dessus
//   3. Recette créée localement (recetteStatique = null) → chargée depuis localStorage
//   4. Slug introuvable partout → message 404

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BoutonEditer from "./BoutonEditer";

const couleurDifficulte = {
  facile: "bg-green-100 text-green-800",
  moyen: "bg-orange-100 text-orange-800",
  difficile: "bg-red-100 text-red-800",
};

export default function RecetteLocale({ slug, recetteStatique }) {
  // Initialise avec la recette statique pour éviter le flash au rendu SSR
  const [recette, setRecette] = useState(recetteStatique ?? undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ricettario_recettes");
      const locales = raw ? JSON.parse(raw) : {};
      if (locales[slug]) {
        // Une version locale existe — elle prend la priorité
        setRecette(locales[slug]);
      } else if (recetteStatique) {
        // Pas de version locale, on garde la statique
        setRecette(recetteStatique);
      } else {
        // Introuvable partout
        setRecette(null);
      }
    } catch {
      setRecette(recetteStatique ?? null);
    }
  }, [slug, recetteStatique]);

  // Chargement initial (recette locale sans fallback statique)
  if (recette === undefined) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 text-sm">Chargement…</p>
      </main>
    );
  }

  // Introuvable ni statique ni locale
  if (recette === null) {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl">🍽</p>
        <p className="text-stone-600 font-medium">Recette introuvable</p>
        <Link href="/" className="text-sm text-green-700 hover:underline">
          Retour aux recettes
        </Link>
      </main>
    );
  }

  const { nom, categorie, difficulte, temps, portions, image, description, ingredients, etapes } =
    recette;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux recettes
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-md group">
          <Image
            src={image}
            alt={nom}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
            unoptimized
          />
          <BoutonEditer slug={slug} />
        </div>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">{nom}</h1>
          <p className="text-stone-500 text-lg leading-relaxed">{description}</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full capitalize">{categorie}</span>
          <span className={`text-sm px-3 py-1.5 rounded-full capitalize font-medium ${couleurDifficulte[difficulte]}`}>{difficulte}</span>
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full">⏱ {temps} min</span>
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full">🍽 {portions} portions</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-10">
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
              Ingrédients
            </h2>
            <ul className="space-y-2">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                  <span className="text-green-500 mt-0.5 font-bold">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
              Préparation
            </h2>
            <ol className="space-y-4">
              {etapes.map((etape, i) => (
                <li key={i} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {etape}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}

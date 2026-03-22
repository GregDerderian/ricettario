"use client";

// Grille de recettes avec filtrage — Client Component
// Reçoit toutes les recettes en props depuis le Server Component parent
// Gère l'état des filtres localement, filtre sans appel serveur

import { useState, useMemo } from "react";
import RecetteCard from "./RecetteCard";
import FiltreBar from "./FiltreBar";
import { useRecettesLocales } from "@/hooks/useRecettesLocales";

export default function RecetteGrid({ recettes }) {
  // Fusionne les recettes statiques avec les recettes créées/modifiées localement
  // Les recettes locales écrasent les statiques si même slug (= édition)
  const { recettesLocales } = useRecettesLocales();
  // État des trois filtres
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("Tout");
  const [difficulte, setDifficulte] = useState("Tout");

  // Recettes fusionnées : statiques + locales (les locales ont priorité)
  const toutesLesRecettes = useMemo(() => {
    const locales = Object.values(recettesLocales);
    const slugsLocaux = new Set(locales.map((r) => r.slug));
    // Nouvelles recettes locales (slug absent des statiques) ajoutées en tête
    const nouvellesLocales = locales.filter(
      (r) => !recettes.some((s) => s.slug === r.slug)
    );
    // Recettes statiques, remplacées par leur version locale si elle existe
    const statiques = recettes.map((r) =>
      slugsLocaux.has(r.slug) ? recettesLocales[r.slug] : r
    );
    return [...nouvellesLocales, ...statiques];
  }, [recettes, recettesLocales]);

  // Calcul des recettes filtrées — recalculé uniquement si les filtres changent
  const recettesFiltrees = useMemo(() => {
    return toutesLesRecettes.filter((r) => {
      // Filtre recherche textuelle sur nom et description
      const termeLower = search.toLowerCase();
      const matchSearch =
        termeLower === "" ||
        r.nom.toLowerCase().includes(termeLower) ||
        r.description.toLowerCase().includes(termeLower);

      // Filtre catégorie
      const matchCategorie = categorie === "Tout" || r.categorie === categorie;

      // Filtre difficulté
      const matchDifficulte =
        difficulte === "Tout" || r.difficulte === difficulte;

      return matchSearch && matchCategorie && matchDifficulte;
    });
  }, [toutesLesRecettes, search, categorie, difficulte]);

  // Réinitialise tous les filtres
  function handleReset() {
    setSearch("");
    setCategorie("Tout");
    setDifficulte("Tout");
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <FiltreBar
        search={search}
        setSearch={setSearch}
        categorie={categorie}
        setCategorie={setCategorie}
        difficulte={difficulte}
        setDifficulte={setDifficulte}
        onReset={handleReset}
        count={recettesFiltrees.length}
        total={toutesLesRecettes.length}
      />

      {/* État vide */}
      {recettesFiltrees.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-5xl mb-4">🍽</p>
          <p className="text-lg font-medium text-stone-500">Aucune recette trouvée</p>
          <p className="text-sm mt-1">Essaie d&apos;autres filtres ou{" "}
            <button
              onClick={handleReset}
              className="text-green-600 hover:underline font-medium"
            >
              réinitialise la recherche
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recettesFiltrees.map((recette) => (
            <RecetteCard key={recette.id} recette={recette} />
          ))}
        </div>
      )}
    </section>
  );
}

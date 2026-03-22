// Page nouvelle recette — Server Component
// Rend uniquement le formulaire vide (Client Component)
import FormulaireRecette from "@/components/FormulaireRecette";

export const metadata = {
  title: "Nouvelle recette – Ricettario",
};

export default function PageNouvelleRecette() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">Nouvelle recette</h1>
        <FormulaireRecette recetteInitiale={null} />
      </div>
    </main>
  );
}

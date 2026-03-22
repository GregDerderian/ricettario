// Page édition recette — Server Component
// Charge la recette statique par slug et la passe au formulaire
// Les recettes locales (localStorage) sont gérées côté client par FormulaireRecette
import { notFound } from "next/navigation";
import { getRecetteBySlug, getAllSlugs } from "@/lib/recettes";
import FormulaireRecette from "@/components/FormulaireRecette";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = getRecetteBySlug(slug);
  if (!recette) return { title: "Recette introuvable – Ricettario" };
  return { title: `Modifier ${recette.nom} – Ricettario` };
}

export default async function PageEditerRecette({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = getRecetteBySlug(slug);

  if (!recette) notFound();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">
          Modifier — {recette.nom}
        </h1>
        {/* recette passée en props pour pré-remplir le formulaire */}
        <FormulaireRecette recetteInitiale={recette} />
      </div>
    </main>
  );
}

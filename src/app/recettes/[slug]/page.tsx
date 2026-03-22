// Page détail d'une recette — Server Component
// Délègue le rendu à RecetteLocale (Client Component) qui fusionne
// les données statiques avec localStorage (priorité aux modifications locales)
import { getRecetteBySlug, getAllSlugs } from "@/lib/recettes";
import RecetteLocale from "@/components/RecetteLocale";

// Pré-génère les pages des recettes statiques au build
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Métadonnées SEO — utilise les données statiques comme fallback
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = getRecetteBySlug(slug);

  if (!recette) return { title: "Ricettario" };

  return {
    title: `${recette.nom} – Ricettario`,
    description: recette.description,
    openGraph: {
      title: `${recette.nom} – Ricettario`,
      description: recette.description,
      images: [{ url: recette.image, width: 800, height: 450, alt: recette.nom }],
    },
  };
}

export default async function PageRecette({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Peut être null si c'est une recette créée localement
  const recetteStatique = getRecetteBySlug(slug);

  // RecetteLocale vérifie localStorage au montage et prend la priorité
  // si une version modifiée existe pour ce slug
  return <RecetteLocale slug={slug} recetteStatique={recetteStatique} />;
}

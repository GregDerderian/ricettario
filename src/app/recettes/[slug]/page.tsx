// Page détail d'une recette — Server Component
// params est une Promise en Next.js 16 : await obligatoire partout
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecetteBySlug, getAllSlugs } from "@/lib/recettes";

// Pré-génère toutes les pages au build (Static Site Generation)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Métadonnées SEO dynamiques par recette
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = getRecetteBySlug(slug);

  if (!recette) return { title: "Recette introuvable – Ricettario" };

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

// Couleurs par difficulté
const couleurDifficulte: Record<string, string> = {
  facile: "bg-green-100 text-green-800",
  moyen: "bg-orange-100 text-orange-800",
  difficile: "bg-red-100 text-red-800",
};

export default async function PageRecette({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = getRecetteBySlug(slug);

  // Renvoie une page 404 si la recette n'existe pas
  if (!recette) notFound();

  const { nom, categorie, difficulte, temps, portions, image, description, ingredients, etapes } =
    recette;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Barre de navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux recettes
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Image principale */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <Image
            src={image}
            alt={nom}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* En-tête */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">{nom}</h1>
          <p className="text-stone-500 text-lg leading-relaxed">{description}</p>
        </header>

        {/* Métadonnées */}
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full capitalize">
            {categorie}
          </span>
          <span
            className={`text-sm px-3 py-1.5 rounded-full capitalize font-medium ${couleurDifficulte[difficulte]}`}
          >
            {difficulte}
          </span>
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {temps} min
          </span>
          <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full">
            🍽 {portions} portions
          </span>
        </div>

        {/* Contenu : ingrédients + étapes */}
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Ingrédients */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
              Ingrédients
            </h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                  <span className="text-green-500 mt-0.5 font-bold">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          {/* Étapes */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
              Préparation
            </h2>
            <ol className="space-y-4">
              {etapes.map((etape: string, i: number) => (
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

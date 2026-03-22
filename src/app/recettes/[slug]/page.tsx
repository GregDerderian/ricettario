// Page détail d'une recette — Server Component
// params est une Promise en Next.js 16 : utiliser await
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import recettes from "@/lib/recettes";

export default async function PageRecette({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = recettes.find((r) => r.slug === slug);

  // Redirection 404 si la recette n'existe pas
  if (!recette) notFound();

  const { nom, categorie, difficulte, temps, portions, image, description, ingredients, etapes } =
    recette;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Lien retour */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← Retour aux recettes
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Image principale */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <Image
            src={image}
            alt={nom}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Titre et description */}
        <h1 className="text-4xl font-bold text-stone-900 mb-2">{nom}</h1>
        <p className="text-stone-500 text-lg mb-6">{description}</p>

        {/* Métadonnées */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm">
          <span className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full capitalize">
            {categorie}
          </span>
          <span className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full capitalize">
            {difficulte}
          </span>
          <span className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full">
            ⏱ {temps} min
          </span>
          <span className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full">
            🍽 {portions} portions
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-10">
          {/* Ingrédients */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Ingrédients</h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600">
                  <span className="text-green-600 mt-0.5">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          {/* Étapes */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Préparation</h2>
            <ol className="space-y-4">
              {etapes.map((etape, i) => (
                <li key={i} className="flex gap-3 text-stone-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center">
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

// Carte recette — Server Component
import Image from "next/image";
import Link from "next/link";

const couleurCategorie = {
  antipasto: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  primo: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  secondo: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  dolce: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
};

const couleurDifficulte = {
  facile: "text-green-600 dark:text-green-400",
  moyen: "text-orange-500 dark:text-orange-400",
  difficile: "text-red-600 dark:text-red-400",
};

export default function RecetteCard({ recette }) {
  const { slug, nom, categorie, difficulte, temps, image, description } = recette;

  return (
    <Link href={`/recettes/${slug}`} className="group block">
      <article className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-stone-950 transition-shadow duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={nom}
            width={400}
            height={260}
            className="w-full object-cover h-52 group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full capitalize ${couleurCategorie[categorie]}`}>
            {categorie}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
            {nom}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 flex-1 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between text-sm border-t border-stone-100 dark:border-stone-800 pt-3 mt-auto">
            <span className={`font-medium capitalize ${couleurDifficulte[difficulte]}`}>
              {difficulte}
            </span>
            <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {temps} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

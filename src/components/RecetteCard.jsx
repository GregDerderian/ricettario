// Carte recette — Server Component
import Image from "next/image";
import Link from "next/link";

// Couleurs par catégorie
const couleurCategorie = {
  antipasto: "bg-amber-100 text-amber-800",
  primo: "bg-green-100 text-green-800",
  secondo: "bg-red-100 text-red-800",
  dolce: "bg-pink-100 text-pink-800",
};

// Couleurs par difficulté
const couleurDifficulte = {
  facile: "text-green-600",
  moyen: "text-orange-500",
  difficile: "text-red-600",
};

export default function RecetteCard({ recette }) {
  const { slug, nom, categorie, difficulte, temps, image, description } = recette;

  return (
    <Link href={`/recettes/${slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image de la recette */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={nom}
            width={400}
            height={260}
            className="w-full object-cover h-52 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge catégorie */}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full capitalize ${couleurCategorie[categorie]}`}
          >
            {categorie}
          </span>
        </div>

        {/* Contenu de la carte */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
            {nom}
          </h2>
          <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{description}</p>

          {/* Métadonnées : difficulté et temps */}
          <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3 mt-auto">
            <span className={`font-medium capitalize ${couleurDifficulte[difficulte]}`}>
              {difficulte}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              {/* Icône horloge (SVG inline, pas de dépendance externe) */}
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
          </div>
        </div>
      </article>
    </Link>
  );
}

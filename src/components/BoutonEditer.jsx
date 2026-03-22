"use client";

// Bouton édition discret superposé sur l'image — Client Component
// Séparé pour ne pas transformer la page détail en Client Component

import Link from "next/link";

export default function BoutonEditer({ slug }) {
  return (
    <Link
      href={`/recettes/${slug}/editer`}
      title="Modifier cette recette"
      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-green-700 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </Link>
  );
}

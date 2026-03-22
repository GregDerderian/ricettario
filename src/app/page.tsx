// Page d'accueil — Server Component
// Charge les recettes statiquement et les passe à RecetteGrid (Client Component)
import Link from "next/link";
import RecetteGrid from "@/components/RecetteGrid";
import recettes from "@/lib/recettes";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* En-tête */}
      <header className="bg-white border-b border-stone-200 py-12 text-center relative">
        <h1 className="text-5xl font-bold text-stone-900 tracking-tight mb-3">
          🍝 Ricettario
        </h1>
        <p className="text-lg text-stone-500 max-w-md mx-auto">
          12 recettes italiennes authentiques — de l&apos;antipasto au dolce.
        </p>
        {/* Bouton nouvelle recette — discret, positionné en haut à droite */}
        <Link
          href="/recettes/nouvelle"
          title="Nouvelle recette"
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 hover:bg-green-100 hover:text-green-700 text-stone-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </header>

      {/* RecetteGrid reçoit les données et gère les filtres + recettes locales côté client */}
      <RecetteGrid recettes={recettes} />
    </main>
  );
}

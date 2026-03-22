// Page d'accueil — Server Component
import Link from "next/link";
import RecetteGrid from "@/components/RecetteGrid";
import ThemeToggle from "@/components/ThemeToggle";
import recettes from "@/lib/recettes";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-12 text-center relative">
        <h1 className="text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-3">
          🍝 Ricettario
        </h1>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          12 recettes italiennes authentiques — de l&apos;antipasto au dolce.
        </p>

        {/* Bouton thème — gauche */}
        <div className="absolute top-6 left-6">
          <ThemeToggle />
        </div>

        {/* Bouton nouvelle recette — droite */}
        <Link
          href="/recettes/nouvelle"
          title="Nouvelle recette"
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400 text-stone-500 dark:text-stone-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </header>

      <RecetteGrid recettes={recettes} />
    </main>
  );
}

// Page d'accueil — Server Component
// Charge les recettes statiquement et les passe à RecetteGrid (Client Component)
import RecetteGrid from "@/components/RecetteGrid";
import recettes from "@/lib/recettes";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* En-tête */}
      <header className="bg-white border-b border-stone-200 py-12 text-center">
        <h1 className="text-5xl font-bold text-stone-900 tracking-tight mb-3">
          🍝 Ricettario
        </h1>
        <p className="text-lg text-stone-500 max-w-md mx-auto">
          12 recettes italiennes authentiques — de l&apos;antipasto au dolce.
        </p>
      </header>

      {/* RecetteGrid reçoit les données et gère les filtres côté client */}
      <RecetteGrid recettes={recettes} />
    </main>
  );
}

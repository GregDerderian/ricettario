"use client";

// Barre de filtres — Client Component
const categories = ["Tout", "antipasto", "primo", "secondo", "dolce"];
const difficultes = ["Tout", "facile", "moyen", "difficile"];
const label = (val) => val.charAt(0).toUpperCase() + val.slice(1);

export default function FiltreBar({ search, setSearch, categorie, setCategorie, difficulte, setDifficulte, onReset, count, total }) {
  const filtresActifs = search !== "" || categorie !== "Tout" || difficulte !== "Tout";

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 p-5 mb-8 space-y-4">
      {/* Recherche */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Catégorie */}
      <div>
        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">Catégorie</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategorie(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categorie === cat
                  ? "bg-green-600 text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >{label(cat)}</button>
          ))}
        </div>
      </div>

      {/* Difficulté */}
      <div>
        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">Difficulté</p>
        <div className="flex flex-wrap gap-2">
          {difficultes.map((diff) => (
            <button key={diff} onClick={() => setDifficulte(diff)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                difficulte === diff
                  ? "bg-green-600 text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >{label(diff)}</button>
          ))}
        </div>
      </div>

      {/* Compteur + reset */}
      <div className="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-stone-800 dark:text-stone-200">{count}</span>
          {" "}recette{count !== 1 ? "s" : ""}
          {filtresActifs && <span className="text-stone-400 dark:text-stone-500"> sur {total}</span>}
        </p>
        {filtresActifs && (
          <button onClick={onReset} className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors">
            ✕ Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

// Sélecteur d'image Unsplash — Client Component
// Recherche par mot-clé → affiche une image aléatoire → refresh pour en voir une autre

import { useState } from "react";
import Image from "next/image";

export default function ImagePicker({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lance la recherche Unsplash via la route API
  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/unsplash?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      if (data.photos.length === 0) throw new Error("Aucune image trouvée");

      setPhotos(data.photos);
      const i = Math.floor(Math.random() * data.photos.length);
      setIndex(i);
      onChange(data.photos[i].url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Pioche une autre image dans les résultats déjà chargés
  function handleRefresh() {
    if (photos.length < 2) return;
    let next;
    do {
      next = Math.floor(Math.random() * photos.length);
    } while (next === index);
    setIndex(next);
    onChange(photos[next].url);
  }

  return (
    <div className="space-y-3">
      {/* Aperçu de l'image actuelle */}
      {value && (
        <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-video">
          <Image
            src={value}
            alt="Image sélectionnée"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Bouton refresh superposé si on a plusieurs résultats */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handleRefresh}
              title="Autre image"
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-stone-700 rounded-full p-2 shadow transition-all"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Champ de recherche — pas de <form> pour éviter l'imbrication avec FormulaireRecette */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ex : risotto, pizza, tiramisu…"
          className="flex-1 px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-stone-800 text-white text-sm rounded-lg hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "…" : "Rechercher"}
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {photos.length > 0 && (
        <p className="text-xs text-stone-400">
          {photos.length} résultat{photos.length > 1 ? "s" : ""} — cliquez ↺ pour voir une autre image
        </p>
      )}
    </div>
  );
}

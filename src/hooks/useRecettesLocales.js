"use client";

// Hook localStorage — CRUD recettes personnalisées
// Recettes modifiées/créées : 'ricettario_recettes' → { [slug]: recette }
// Slugs supprimés : 'ricettario_supprimes' → string[]

import { useState, useEffect } from "react";

const CLE_RECETTES = "ricettario_recettes";
const CLE_SUPPRIMES = "ricettario_supprimes";

function lireRecettes() {
  try {
    const raw = localStorage.getItem(CLE_RECETTES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function lireSupprimes() {
  try {
    const raw = localStorage.getItem(CLE_SUPPRIMES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useRecettesLocales() {
  const [recettesLocales, setRecettesLocales] = useState({});
  const [slugsSupprimes, setSlugsSupprimes] = useState([]);

  useEffect(() => {
    setRecettesLocales(lireRecettes());
    setSlugsSupprimes(lireSupprimes());
  }, []);

  // Sauvegarde ou écrase une recette (nouvelle ou modifiée)
  // Si elle était supprimée, la retire aussi de la liste noire
  function saveRecette(recette) {
    const updatedRecettes = { ...lireRecettes(), [recette.slug]: recette };
    localStorage.setItem(CLE_RECETTES, JSON.stringify(updatedRecettes));
    setRecettesLocales(updatedRecettes);

    const supprimes = lireSupprimes().filter((s) => s !== recette.slug);
    localStorage.setItem(CLE_SUPPRIMES, JSON.stringify(supprimes));
    setSlugsSupprimes(supprimes);
  }

  // Supprime une recette : retire du localStorage ET ajoute à la liste noire
  // La liste noire masque aussi les recettes statiques
  function deleteRecette(slug) {
    const updatedRecettes = { ...lireRecettes() };
    delete updatedRecettes[slug];
    localStorage.setItem(CLE_RECETTES, JSON.stringify(updatedRecettes));
    setRecettesLocales(updatedRecettes);

    const supprimes = [...new Set([...lireSupprimes(), slug])];
    localStorage.setItem(CLE_SUPPRIMES, JSON.stringify(supprimes));
    setSlugsSupprimes(supprimes);
  }

  return {
    recettesLocales,
    slugsSupprimes,
    saveRecette,
    deleteRecette,
  };
}

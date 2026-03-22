"use client";

// Hook localStorage — CRUD recettes personnalisées
// Stockées sous la clé 'ricettario_recettes' : { [slug]: recette }

import { useState, useEffect } from "react";

const CLE_STORAGE = "ricettario_recettes";

function lireStorage() {
  try {
    const raw = localStorage.getItem(CLE_STORAGE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function ecrireStorage(data) {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(data));
}

export function useRecettesLocales() {
  const [recettesLocales, setRecettesLocales] = useState({});

  // Charge depuis localStorage au montage (côté client uniquement)
  useEffect(() => {
    setRecettesLocales(lireStorage());
  }, []);

  // Sauvegarde ou écrase une recette (nouvelle ou modifiée)
  function saveRecette(recette) {
    const updated = { ...lireStorage(), [recette.slug]: recette };
    ecrireStorage(updated);
    setRecettesLocales(updated);
  }

  // Supprime une recette locale par son slug
  function deleteRecette(slug) {
    const updated = { ...lireStorage() };
    delete updated[slug];
    ecrireStorage(updated);
    setRecettesLocales(updated);
  }

  return {
    recettesLocales,
    saveRecette,
    deleteRecette,
  };
}

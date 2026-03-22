"use client";

// Bouton dark mode — implémentation directe sans next-themes
// Manipule document.documentElement.classList directement (plus fiable sur Next.js 16 / React 19)

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [estSombre, setEstSombre] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Lit la préférence sauvegardée ou la préférence système
    const sauvegarde = localStorage.getItem("theme");
    const systemeSombre = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const sombre = sauvegarde ? sauvegarde === "dark" : systemeSombre;
    setEstSombre(sombre);
    appliquer(sombre);
    setMounted(true);
  }, []);

  function appliquer(sombre) {
    document.documentElement.classList.toggle("dark", sombre);
    localStorage.setItem("theme", sombre ? "dark" : "light");
  }

  function basculer() {
    const nouvelEtat = !estSombre;
    setEstSombre(nouvelEtat);
    appliquer(nouvelEtat);
  }

  // Placeholder invisible avant montage — évite le mismatch d'hydration
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={basculer}
      title={estSombre ? "Passer en mode clair" : "Passer en mode sombre"}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 transition-colors"
    >
      {estSombre ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

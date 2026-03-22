"use client";

// Formulaire création/édition recette — Client Component
// Sauvegarde dans localStorage via useRecettesLocales
// Utilisé par /recettes/nouvelle et /recettes/[slug]/editer

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import { useRecettesLocales } from "@/hooks/useRecettesLocales";

const CLE_STORAGE = "ricettario_recettes";

const categories = ["antipasto", "primo", "secondo", "dolce"];
const difficultes = ["facile", "moyen", "difficile"];

// Génère un slug à partir du nom de la recette
function slugifier(nom) {
  return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Valeur initiale pour une nouvelle recette
const valeurVide = {
  nom: "",
  categorie: "primo",
  difficulte: "facile",
  temps: "",
  portions: "",
  description: "",
  image: "",
  ingredients: "",
  etapes: "",
};

export default function FormulaireRecette({ recetteInitiale }) {
  const router = useRouter();
  const { saveRecette, deleteRecette } = useRecettesLocales();

  // Pré-remplit le formulaire si on édite une recette existante
  const [form, setForm] = useState(() => {
    if (!recetteInitiale) return valeurVide;
    return {
      ...recetteInitiale,
      // Convertit les tableaux en texte (une ligne par item)
      ingredients: recetteInitiale.ingredients.join("\n"),
      etapes: recetteInitiale.etapes.join("\n"),
    };
  });

  const [errors, setErrors] = useState({});
  const [confirmerSuppression, setConfirmerSuppression] = useState(false);
  const estEdition = Boolean(recetteInitiale);

  function set(champ, valeur) {
    setForm((prev) => ({ ...prev, [champ]: valeur }));
    if (errors[champ]) setErrors((prev) => ({ ...prev, [champ]: null }));
  }

  // Validation minimale avant sauvegarde
  function valider() {
    const e = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis";
    if (!form.description.trim()) e.description = "La description est requise";
    if (!form.image) e.image = "Choisissez une image";
    if (!form.temps || isNaN(form.temps)) e.temps = "Durée invalide";
    if (!form.portions || isNaN(form.portions)) e.portions = "Portions invalides";
    if (!form.ingredients.trim()) e.ingredients = "Au moins un ingrédient requis";
    if (!form.etapes.trim()) e.etapes = "Au moins une étape requise";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = valider();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }

    // Construit l'objet recette final
    const slug = estEdition ? recetteInitiale.slug : slugifier(form.nom);
    const recette = {
      id: recetteInitiale?.id ?? Date.now(),
      slug,
      nom: form.nom.trim(),
      categorie: form.categorie,
      difficulte: form.difficulte,
      temps: parseInt(form.temps),
      portions: parseInt(form.portions),
      description: form.description.trim(),
      image: form.image,
      // Découpe les textes multi-lignes en tableaux, ignore les lignes vides
      ingredients: form.ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
      etapes: form.etapes.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    saveRecette(recette);
    router.push(`/recettes/${slug}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Image</label>
        <ImagePicker value={form.image} onChange={(url) => set("image", url)} />
        {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
      </div>

      {/* Nom */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Nom de la recette
        </label>
        <input
          type="text"
          value={form.nom}
          onChange={(e) => set("nom", e.target.value)}
          placeholder="Ex : Risotto al Parmigiano"
          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description courte
        </label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={2}
          placeholder="Une phrase qui donne envie…"
          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      {/* Catégorie + Difficulté + Temps + Portions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">
            Catégorie
          </label>
          <select
            value={form.categorie}
            onChange={(e) => set("categorie", e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 capitalize"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">
            Difficulté
          </label>
          <select
            value={form.difficulte}
            onChange={(e) => set("difficulte", e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 capitalize"
          >
            {difficultes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">
            Temps (min)
          </label>
          <input
            type="number"
            min={1}
            value={form.temps}
            onChange={(e) => set("temps", e.target.value)}
            placeholder="30"
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.temps && <p className="text-xs text-red-500 mt-1">{errors.temps}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">
            Portions
          </label>
          <input
            type="number"
            min={1}
            value={form.portions}
            onChange={(e) => set("portions", e.target.value)}
            placeholder="4"
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.portions && <p className="text-xs text-red-500 mt-1">{errors.portions}</p>}
        </div>
      </div>

      {/* Ingrédients */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Ingrédients
          <span className="text-stone-400 font-normal ml-2">— un par ligne</span>
        </label>
        <textarea
          value={form.ingredients}
          onChange={(e) => set("ingredients", e.target.value)}
          rows={6}
          placeholder={"200g de riz Arborio\n1L de bouillon\n60g de parmesan…"}
          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
        />
        {errors.ingredients && <p className="text-xs text-red-500 mt-1">{errors.ingredients}</p>}
      </div>

      {/* Étapes */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Étapes de préparation
          <span className="text-stone-400 font-normal ml-2">— une par ligne</span>
        </label>
        <textarea
          value={form.etapes}
          onChange={(e) => set("etapes", e.target.value)}
          rows={6}
          placeholder={"Faire revenir l'oignon dans l'huile.\nAjouter le riz et nacrer 2 minutes.\n…"}
          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
        />
        {errors.etapes && <p className="text-xs text-red-500 mt-1">{errors.etapes}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {estEdition ? "Enregistrer les modifications" : "Créer la recette"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-xl transition-colors"
          >
            Annuler
          </button>
        </div>

        {/* Bouton supprimer — uniquement en mode édition */}
        {estEdition && (
          <div className="flex items-center gap-3">
            {confirmerSuppression ? (
              <>
                <span className="text-sm text-stone-500">Confirmer ?</span>
                <button
                  type="button"
                  onClick={() => {
                    deleteRecette(recetteInitiale.slug);
                    router.push("/");
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Oui, supprimer
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmerSuppression(false)}
                  className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmerSuppression(true)}
                className="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors"
              >
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

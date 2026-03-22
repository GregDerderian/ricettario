// Route Handler — proxy Unsplash search
// Garde la clé API côté serveur (jamais exposée au client)
// GET /api/unsplash?q=mot-cle → retourne un tableau d'URLs d'images

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return Response.json({ error: "Paramètre q requis" }, { status: 400 });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return Response.json(
      { error: "UNSPLASH_ACCESS_KEY manquant dans .env.local" },
      { status: 500 }
    );
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
    // Ne pas mettre en cache — on veut du frais à chaque recherche
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json({ error: "Erreur Unsplash API" }, { status: res.status });
  }

  const data = await res.json();

  // Retourne uniquement les URLs nécessaires
  const photos = data.results.map((photo: { id: string; urls: { regular: string }; alt_description: string }) => ({
    id: photo.id,
    url: photo.urls.regular,
    alt: photo.alt_description ?? query,
  }));

  return Response.json({ photos });
}

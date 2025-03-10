import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = "tu-api-key";
const API_URL = "https://api.themoviedb.org/3";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie");  // Verifica si es una película
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [credits, setCredits] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const mediaType = isMovie ? "movie" : "tv"; // Distinguir entre película y serie
      axios
        .get(`${API_URL}/${mediaType}/${id}?api_key=${API_KEY}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.error("Error al obtener detalles:", error));

      // Obtener los créditos (actores)
      axios
        .get(`${API_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`)
        .then((response) => {
          setCredits(response.data.cast);
        })
        .catch((error) => console.error("Error al obtener créditos:", error))
        .finally(() => setLoading(false));
    }
  }, [id, isMovie]);

  if (loading) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  if (!data) {
    return <p className="text-center text-white">No se encontró la información.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">{isMovie ? data.title : data.name}</h1>
      <p className="text-gray-400 mt-2">{data.overview}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Actores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {credits.length > 0 ? (
            credits.map((actor) => (
              <div key={actor.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://via.placeholder.com/500"
                  }
                  alt={actor.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{actor.name}</h3>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron actores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

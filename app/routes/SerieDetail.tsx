import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const SerieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la serie desde la URL
  const [serieDetails, setSerieDetails] = useState<any | null>(null);
  const [trailer, setTrailer] = useState<any | null>(null); // Trailer de la serie
  const [cast, setCast] = useState<any[]>([]); // Lista de actores
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Obtener los detalles de la serie
    axios.get(`${API_URL}/tv/${id}?api_key=${API_KEY}`)
      .then((response) => setSerieDetails(response.data))
      .catch((error) => console.error('Error obteniendo detalles de la serie:', error));

    // Obtener el trailer de la serie
    axios.get(`${API_URL}/tv/${id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        const trailerData = response.data.results.find((video: any) => video.type === 'Trailer');
        setTrailer(trailerData);
      })
      .catch((error) => console.error('Error obteniendo trailer de la serie:', error));

    // Obtener el elenco de actores de la serie
    axios.get(`${API_URL}/tv/${id}/credits?api_key=${API_KEY}`)
      .then((response) => {
        // Asegurándonos de que la respuesta tenga la propiedad cast
        if (response.data.cast) {
          setCast(response.data.cast); // Limitar a 4 actores
        }
      })
      .catch((error) => console.error('Error obteniendo elenco de actores:', error))
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) return <p className="text-center text-white">⏳ Cargando...</p>;

  if (!serieDetails) return <p className="text-center text-white">❌ No se encontraron detalles de la serie.</p>;

  return (
    <div className="container mx-auto p-6 text-white bg-gray-900">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
      {/* Título */}
      <h1 className="text-4xl font-bold flex-1">{serieDetails.name}</h1>

      {/* Póster (más pequeño y alineado a la derecha) */}
      <img
        src={`https://image.tmdb.org/t/p/w500${serieDetails.poster_path}`}
        alt={serieDetails.name}
        className="w-40 rounded-lg shadow-lg"
      />
    </div>
      <p className="text-sm text-gray-400">{serieDetails.first_air_date} | {serieDetails.original_language.toUpperCase()}</p>
      <p className="text-yellow-400 font-bold text-lg">⭐ {serieDetails.vote_average} ({serieDetails.vote_count} votos)</p>
      <p className="text-gray-300 mt-4">{serieDetails.overview}</p>

      {/* Trailer */}
      {trailer && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Trailer</h2>
          <div className="mt-4">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Actores */}
      {cast.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Actores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {cast.map((actor: any) => (
              <div key={actor.id} className="text-center">
                <img
                  className="w-32 h-32 rounded-full mx-auto shadow-lg"
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-avatar.png'}
                  alt={actor.name}
                />
                <p className="text-white mt-2">{actor.name}</p>
                {/* Mostrar el personaje que interpretan */}
                {actor.character && (
                  <p className="text-gray-400 text-sm mt-1">{actor.character}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nuevas Temporadas si existen */}
      {serieDetails.seasons && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Temporadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {serieDetails.seasons.map((season: any) => (
              <div key={season.id} className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : '/default-avatar.png'}
                  alt={season.name}
                />
                <p className="text-white mt-2">{season.name}</p>
                <p className="text-gray-400">{season.air_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SerieDetail;

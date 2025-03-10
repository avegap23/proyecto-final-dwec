import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la película desde la URL
  const [movieDetails, setMovieDetails] = useState<any | null>(null);
  const [trailer, setTrailer] = useState<any | null>(null); // Trailer de la película
  const [actors, setActors] = useState<any[]>([]); // Actores de la película
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Obtener los detalles de la película
    axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((response) => setMovieDetails(response.data))
      .catch((error) => console.error('Error obteniendo detalles de la película:', error));

    // Obtener el trailer de la película
    axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        const trailerData = response.data.results.find((video: any) => video.type === 'Trailer');
        setTrailer(trailerData);
      })
      .catch((error) => console.error('Error obteniendo trailer de la película:', error));

    // Obtener los actores de la película
    axios.get(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then((response) => setActors(response.data.cast))
      .catch((error) => console.error('Error obteniendo los actores:', error))
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) return <p className="text-center text-white">⏳ Cargando...</p>;

  if (!movieDetails) return <p className="text-center text-white">❌ No se encontraron detalles de la película.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Título */}
        <h1 className="text-4xl font-bold flex-1">{movieDetails.title}</h1>

        {/* Póster (ajustado más pequeño) */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-30 rounded-lg shadow-lg"
        />
      </div>


        <p className="text-sm text-gray-400 mb-4">{movieDetails.release_date} | {movieDetails.original_language.toUpperCase()}</p>
        <p className="text-yellow-400 font-bold text-lg">⭐ {movieDetails.vote_average} ({movieDetails.vote_count} votos)</p>
        <p className="text-gray-300 mt-4">{movieDetails.overview}</p>

        {/* Trailer */}
        {trailer && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
            <div className="flex justify-center">
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Actores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {actors.map((actor: any) => (
              <div key={actor.id} className="text-center bg-gray-800 p-4 rounded-lg">
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-avatar.png'}
                  alt={actor.name}
                />
                <p className="text-white text-lg">{actor.name}</p>
                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

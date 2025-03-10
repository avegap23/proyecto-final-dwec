import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MoviePoster from '../componentes/MoviePoster';
import MovieTrailer from '../componentes/MovieTrailer';
import MovieActors from '../componentes/MovieActors';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<any | null>(null);
  const [trailer, setTrailer] = useState<any | null>(null);
  const [actors, setActors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, trailerRes, actorsRes] = await Promise.all([
          axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`),
          axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`),
          axios.get(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`),
        ]);

        setMovieDetails(movieRes.data);
        setTrailer(trailerRes.data.results.find((video: any) => video.type === 'Trailer'));
        setActors(actorsRes.data.cast);
      } catch (error) {
        console.error('Error obteniendo los datos de la película:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">⏳ Cargando...</p>;
  if (!movieDetails) return <p className="text-center text-white">❌ No se encontraron detalles de la película.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <h1 className="text-4xl font-bold flex-1">{movieDetails.title}</h1>
          <MoviePoster posterPath={movieDetails.poster_path} title={movieDetails.title} />
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {movieDetails.release_date} | {movieDetails.original_language.toUpperCase()}
        </p>
        <p className="text-yellow-400 font-bold text-lg">
          ⭐ {movieDetails.vote_average} ({movieDetails.vote_count} votos)
        </p>
        <p className="text-gray-300 mt-4">{movieDetails.overview}</p>

        <MovieTrailer trailer={trailer} />
        <MovieActors actors={actors} />
      </div>
    </div>
  );
};

export default MovieDetail;

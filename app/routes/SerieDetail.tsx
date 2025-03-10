import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeriePoster from '../componentes/SeriePoster';
import SerieTrailer from '../componentes/SerieTrailer';
import SerieCast from '../componentes/SerieCast';
import SerieSeasons from '../componentes/SerieSeasons';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const SerieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [serieDetails, setSerieDetails] = useState<any | null>(null);
  const [trailer, setTrailer] = useState<any | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSerieDetails = async () => {
      try {
        const [serieRes, trailerRes, castRes] = await Promise.all([
          axios.get(`${API_URL}/tv/${id}?api_key=${API_KEY}&language=es-ES`),
          axios.get(`${API_URL}/tv/${id}/videos?api_key=${API_KEY}&language=es-ES`),
          axios.get(`${API_URL}/tv/${id}/credits?api_key=${API_KEY}`),
        ]);

        setSerieDetails(serieRes.data);
        setTrailer(trailerRes.data.results.find((video: any) => video.type === 'Trailer'));
        setCast(castRes.data.cast);
      } catch (error) {
        console.error('Error obteniendo los datos de la serie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSerieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">⏳ Cargando...</p>;
  if (!serieDetails) return <p className="text-center text-white">❌ No se encontraron detalles de la serie.</p>;

  return (
    <div className="container mx-auto p-6 text-white bg-gray-900">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <h1 className="text-4xl font-bold flex-1">{serieDetails.name}</h1>
        <SeriePoster posterPath={serieDetails.poster_path} title={serieDetails.name} />
      </div>

      <p className="text-sm text-gray-400">
        {serieDetails.first_air_date} | {serieDetails.original_language.toUpperCase()}
      </p>
      <p className="text-yellow-400 font-bold text-lg">
        ⭐ {serieDetails.vote_average} ({serieDetails.vote_count} votos)
      </p>
      <p className="text-gray-300 mt-4">{serieDetails.overview}</p>

      <SerieTrailer trailer={trailer} />
      <SerieCast cast={cast} />
      <SerieSeasons seasons={serieDetails.seasons} tvid={Number(id)} />
    </div>
  );
};

export default SerieDetail;

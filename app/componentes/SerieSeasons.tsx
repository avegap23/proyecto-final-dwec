import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

interface Season {
  id: number;
  name: string;
  air_date: string;
  poster_path: string | null;
  season_number: number;
}

interface SerieSeasonsProps {
  seasons: Season[];
  tvid: number;
}

const SerieSeasons: React.FC<SerieSeasonsProps> = ({ seasons, tvid }) => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  // Esta función obtiene los episodios de una temporada
  const obtenerEps = async (tvid: number, selectedSeason: Season) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvid}/season/${selectedSeason.season_number}?api_key=${API_KEY}&language=es-ES`
      );
      const fetchedEpisodes = response.data.episodes;
      setEpisodes(fetchedEpisodes);

      // Imprimir los episodios en la consola
      console.log("Episodios de la temporada:", fetchedEpisodes);
    } catch (error) {
      console.error('Error obteniendo los episodios:', error);
    }
  };

  // Esta función se encarga de manejar el clic en cada temporada
  const handleSeasonClick = (season: Season) => {
    setSelectedSeason(season);
    obtenerEps(tvid, season); // Llamamos a la función para obtener los episodios
  };

  if (!seasons || seasons.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white">Temporadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {seasons.map((season) => (
          <div
            key={season.id}
            className="text-center bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-all duration-300"
            onClick={() => handleSeasonClick(season)} // Al hacer clic, se muestra la temporada seleccionada
          >
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

      {/* Mostrar episodios si hay una temporada seleccionada */}
      {selectedSeason && episodes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white">Episodios de la temporada: {selectedSeason.name}</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <div key={episode.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                <h4 className="text-white text-3xl font-bold flex-1">{episode.name}</h4>
                <p className="text-gray-400">{episode.air_date}</p>
                <p className="text-white mt-2">{episode.overview}</p>
                <br />
                <span className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md">⭐ {episode.vote_average} ({episode.vote_count} votos) </span>
                </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



export default SerieSeasons;

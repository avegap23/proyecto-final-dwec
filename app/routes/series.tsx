import React, { useState, useEffect } from 'react';
import Header from '../componentes/header';
import Buscar from '../componentes/buscar';
import Card from '../componentes/card';
import axios from 'axios';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const Series: React.FC = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPopularSeries();
    fetchGenres();
  }, []);

  const fetchPopularSeries = () => {
    setLoading(true);
    axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}`)
      .then((response) => setSeries(response.data.results))
      .catch((error) => console.error('Error obteniendo series:', error))
      .finally(() => setLoading(false));
  };

  const fetchGenres = () => {
    axios.get(`${API_URL}/genre/tv/list?api_key=${API_KEY}`)
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error('Error obteniendo géneros:', error));
  };

  const handleSearch = (searchedSeries: any[], text: string) => {
    setSeries(searchedSeries);
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setLoading(true);

    if (genreId) {
      axios.get(`${API_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`)
        .then((response) => setSeries(response.data.results))
        .catch((error) => console.error('Error obteniendo series:', error))
        .finally(() => setLoading(false));
    } else {
      fetchPopularSeries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto p-6">
        <Buscar onSearch={handleSearch} selectedGenre={selectedGenre} />
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => handleGenreSelect(null)}
            className={`px-4 py-2 rounded-full transition ${
              selectedGenre === null ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            🔄 Todos
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreSelect(genre.id)}
              className={`px-4 py-2 rounded-full transition ${
                selectedGenre === genre.id ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {loading && <p className="text-center mt-4">⏳ Cargando series...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {series.length > 0 ? (
            series.map((serie) => <Card key={serie.id} item={serie} />

        )
          ) : (
            !loading && <p className="text-center col-span-full">❌ No se encontraron series.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Series;

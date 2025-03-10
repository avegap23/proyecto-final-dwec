import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/header';
import Buscar from '../componentes/buscar';
import Card from '../componentes/card';
import axios from 'axios';
import Carrousel from '../componentes/carrousel';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [topmovies, setTopMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
    fetchTopRated();
  }, []);

  const fetchPopularMovies = () => {
    setLoading(true);
    axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error('Error obteniendo películas:', error))
      .finally(() => setLoading(false));
  };

  const fetchTopRated = () => {
    setLoading(true);
    axios.get(`${API_URL}/movie/top_rated?api_key=${API_KEY}`)
      .then((response) => setTopMovies(response.data.results))
      .catch((error) => console.error('Error obteniendo películas:', error))
      .finally(() => setLoading(false));
  };



  const fetchGenres = () => {
    axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error('Error obteniendo géneros:', error));
  };

  const handleSearch = (searchedMovies: any[], text: string) => {
    setMovies(searchedMovies);
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setLoading(true);

    if (genreId) {
      axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error('Error obteniendo películas:', error))
        .finally(() => setLoading(false));
    } else {
      fetchPopularMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />


      <Carrousel />

      <div className="container mx-auto p-6">
        <Buscar onSearch={handleSearch} selectedGenre={selectedGenre} />
        <div className="flex flex-wrap gap-2 mt-4">
          {/* Botón para mostrar todas las películas */}
          <button
            onClick={() => handleGenreSelect(null)}
            className={`px-4 py-2 rounded-full transition ${
              selectedGenre === null ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            🔄 Todos
          </button>
          {/* Mostrar los géneros disponibles */}
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

        {/* Cargando */}
        {loading && <p className="text-center mt-4">⏳ Cargando películas...</p>}

        {/* Mostrar las películas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {movies.length > 0 ? (
            movies.map((movie) => <Card key={movie.id} item={movie} />)
          ) : (
            !loading && <p className="text-center col-span-full">❌ No se encontraron películas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

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
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchAllMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&
        !loadingMore
      ) {
        setLoadingMore(true);
        fetchAllMovies(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loadingMore]);

  const fetchAllMovies = (pageNumber = 1) => {
    setLoading(true);
    axios.get(`${API_URL}/movie?api_key=${API_KEY}&page=${pageNumber}`)
      .then((response) => {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setPage(pageNumber);
      })
      .catch((error) => console.error('Error obteniendo películas:', error))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
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
      fetchAllMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Carrousel />
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
        {loading && <p className="text-center mt-4">⏳ Cargando películas...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {movies.length > 0 ? (
            movies.map((movie) => <Card key={movie.id} item={movie} />)
          ) : (
            !loading && <p className="text-center col-span-full">❌ No se encontraron películas.</p>
          )}
        </div>
        {loadingMore && <p className="text-center mt-4">🔄 Cargando más películas...</p>}
      </div>
    </div>
  );
};

export default Home;

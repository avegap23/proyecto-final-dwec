import React, { useState, useEffect } from 'react';
import Header from '../componentes/header';
import Buscar from '../componentes/buscar';
import Card from '../componentes/card';
import axios from 'axios';
import Carrousel from '../componentes/carrousel';

// Claves de la API de The Movie Database (TMDb)
const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const Peliculas: React.FC = () => {
  // Estados para almacenar películas, géneros, búsqueda y paginación
  const [movies, setMovies] = useState<any[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Efecto para cargar películas populares y géneros al montar el componente
  useEffect(() => {
    fetchPopularMovies(1, selectedGenre);
    fetchGenres();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para obtener películas populares o por género
  const fetchPopularMovies = (pageNumber: number, genreId: number | null = null) => {
    setLoading(true);
    const url = genreId
      ? `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}`
      : `${API_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`;

    axios.get(url)
      .then((response) => {
        setMovies((prevMovies) => {
          // Filtrar películas duplicadas
          const newMovies = response.data.results.filter(
            (movie: any) => !prevMovies.some((m) => m.id === movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
      })
      .catch((error) => console.error('Error obteniendo películas:', error))
      .finally(() => setLoading(false));
  };

  // Función para obtener los géneros de películas
  const fetchGenres = () => {
    axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error('Error obteniendo géneros:', error));
  };

  // Función para manejar la selección de un género
  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setSearchQuery('');
    setSearchedMovies([]);
    setPage(1);
    setMovies([]);
    fetchPopularMovies(1, genreId);
  };

  // Función para manejar la búsqueda de películas
  const handleSearch = (searchedMovies: any[], text: string) => {
    setSearchQuery(text);
    setSearchedMovies(searchedMovies);
  };

  // Función para manejar el scroll infinito
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && !searchQuery) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Efecto para cargar más películas cuando cambia la página
  useEffect(() => {
    if (page > 1 && !searchQuery) {
      fetchPopularMovies(page, selectedGenre);
    }
  }, [page, selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Carrousel />
      <div className="container mx-auto p-6">
        <Buscar onSearch={handleSearch} selectedGenre={selectedGenre} />
        
        {/* Botones de filtro por género */}
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
        
        {/* Mostrar las películas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {(searchQuery ? searchedMovies : movies).map((movie) => <Card key={movie.id} item={movie} />)}
        </div>
        
        {/* Mensaje de carga */}
        {loading && <p className="text-center mt-4">⏳ Cargando más películas...</p>}
      </div>
    </div>
  );
};

export default Peliculas;
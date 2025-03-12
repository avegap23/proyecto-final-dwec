import React, { useState, useEffect } from 'react';
import Header from '../componentes/header';
import Buscar from '../componentes/buscar';
import Card from '../componentes/card';
import axios from 'axios';
import Carrousel from '../componentes/carrouselSeries';

// Claves y URL de la API de The Movie Database
const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

const Series: React.FC = () => {
  // Estados para almacenar datos dinámicos
  const [series, setSeries] = useState<any[]>([]); // Lista de series populares
  const [searchedSeries, setSearchedSeries] = useState<any[]>([]); // Lista de series buscadas
  const [genres, setGenres] = useState<any[]>([]); // Lista de géneros
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null); // Género seleccionado
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [page, setPage] = useState(1); // Página actual para paginación
  const [searchQuery, setSearchQuery] = useState<string>(''); // Consulta de búsqueda

  // Efecto inicial para obtener series y géneros
  useEffect(() => {
    fetchPopularSeries(1);
    fetchGenres();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para obtener series populares con paginación y filtrado por género
  const fetchPopularSeries = (pageNumber: number, genreId: number | null = null) => {
    setLoading(true);
    const url = genreId
      ? `${API_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}`
      : `${API_URL}/tv/popular?api_key=${API_KEY}&page=${pageNumber}`;
    
    axios.get(url)
      .then((response) => {
        setSeries((prevSeries) => {
          const newSeries = response.data.results.filter(
            (serie: any) => !prevSeries.some((s) => s.id === serie.id) // Evitar duplicados
          );
          return [...prevSeries, ...newSeries];
        });
      })
      .catch((error) => console.error('Error obteniendo series:', error))
      .finally(() => setLoading(false));
  };

  // Función para obtener la lista de géneros
  const fetchGenres = () => {
    axios.get(`${API_URL}/genre/tv/list?api_key=${API_KEY}`)
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error('Error obteniendo géneros:', error));
  };

  // Manejar la selección de género
  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setSearchQuery(''); // Limpiar búsqueda
    setSearchedSeries([]); // Limpiar resultados de búsqueda
    setPage(1);
    setSeries([]); // Reiniciar series mostradas
    setLoading(true);
    fetchPopularSeries(1, genreId);
  };

  // Manejar la búsqueda de series
  const handleSearch = (searchedSeries: any[], text: string) => {
    setSearchQuery(text);
    setSearchedSeries(searchedSeries);
  };

  // Detectar el scroll para cargar más series automáticamente
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && !searchQuery) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Efecto para cargar más series cuando cambia la página
  useEffect(() => {
    if (page > 1 && !searchQuery) {
      fetchPopularSeries(page, selectedGenre);
    }
  }, [page, selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Carrousel />
      <div className="container mx-auto p-6">
        <Buscar onSearch={handleSearch} selectedGenre={selectedGenre} />
        {/* Botones de selección de género */}
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
        {/* Grid de series */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {(searchQuery ? searchedSeries : series).map((serie) => <Card key={serie.id} item={serie} />)}
        </div>
        {loading && <p className="text-center mt-4">⏳ Cargando más series...</p>}
      </div>
    </div>
  );
};

export default Series;

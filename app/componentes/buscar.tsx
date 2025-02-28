import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Tipo para los datos de la película
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const TMDB_API_KEY = 'TU_CLAVE_API_AQUI'; // Reemplaza con tu clave de API
const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie';

const Buscar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // Obtener los resultados de la API al cambiar el texto del buscador
  useEffect(() => {
    if (searchText) {
      axios
        .get(TMDB_API_URL, {
          params: {
            api_key: TMDB_API_KEY,
            query: searchText,
          },
        })
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    } else {
      setMovies([]);
    }
  }, [searchText]);

  // Filtrar las películas basadas en el texto de búsqueda
  useEffect(() => {
    setFilteredMovies(movies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, movies]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded"
      />
      <div>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-32"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscar;

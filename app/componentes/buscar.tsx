// buscar.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Tipo para los datos de la película
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const TMDB_API_KEY = 'abf5089fc83b3062f98114c95340c65b'; // Reemplaza con tu clave de API
const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie';

const Buscar: React.FC<{ onSearch: (movies: any[]) => void }> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

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
          onSearch(response.data.results); // Llamamos la función onSearch para pasar las películas
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [searchText, onSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
    </div>
  );
};

export default Buscar; // Asegúrate de que la exportación esté correcta

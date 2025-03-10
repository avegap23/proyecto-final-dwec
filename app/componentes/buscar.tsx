import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_KEY = 'abf5089fc83b3062f98114c95340c65b';
const API_URL = 'https://api.themoviedb.org/3';

type Props = {
  onSearch: (items: any[], text: string) => void;
  selectedGenre: number | null;
};

const Buscar: React.FC<Props> = ({ onSearch, selectedGenre }) => {
  const [searchText, setSearchText] = useState<string>('');
  const location = useLocation();
  const isSeries = location.pathname.includes('/series');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const type = isSeries ? 'tv' : 'movie';
        let url = '';

        if (searchText) {
          // Si hay texto, buscar por nombre
          url = `${API_URL}/search/${type}?api_key=${API_KEY}&query=${searchText}`;
        } else if (selectedGenre) {
          // Si no hay texto pero sí género, filtrar por género
          url = `${API_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${selectedGenre}`;
        } else {
          // Si no hay ni texto ni género, mostrar populares
          url = `${API_URL}/${type}/popular?api_key=${API_KEY}`;
        }

        const response = await axios.get(url);
        let results = response.data.results || [];

        // Si hay nombre y género, filtrar localmente por género
        if (searchText && selectedGenre) {
          results = results.filter((item: any) => item.genre_ids.includes(selectedGenre));
        }

        onSearch(results, searchText);
      } catch (error) {
        console.error('Error buscando:', error);
      }
    };

    fetchItems();
  }, [searchText, selectedGenre, onSearch, isSeries]);

  return (
    <input
      type="text"
      placeholder={isSeries ? "🔍 Buscar serie..." : "🔍 Buscar película..."}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="border p-3 rounded w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Buscar;


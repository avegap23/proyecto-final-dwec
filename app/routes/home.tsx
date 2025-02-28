import React, { useState } from 'react';
import Header from '../componentes/header'; // Componente Header
import Buscar from '../componentes/buscar'; // Componente Buscar
import Card from '../componentes/card'; // Componente Card

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); // Aquí guardaremos las películas que obtenemos

  // Función para actualizar las películas
  const handleSearch = (searchedMovies: any[]) => {
    setMovies(searchedMovies);
  };

  return (
    <div>
      {/* Header: el componente Buscar está dentro del Header */}
      <Header />

      {/* Espacio para las películas debajo del header */}
      <div className="pt-16">
        {/* Pasamos el estado de películas y la función para actualizar a Buscar */}
        <Buscar onSearch={handleSearch} />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Si hay películas, las mostramos; de lo contrario, mostramos un mensaje */}
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

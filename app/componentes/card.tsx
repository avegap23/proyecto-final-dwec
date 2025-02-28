import React, { useState } from 'react';

// Tipo para los datos de la película
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null; // Puede ser null si no existe
  vote_average: number; // Añadimos el rating (votación)
};

const Card: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si se muestra la descripción

  // Función para determinar el color del rating basado en el valor
  const getRatingColor = (rating: number): string => {
    if (rating >= 8) {
      return 'bg-green-500'; // Color verde para ratings altos
    } else if (rating >= 5) {
      return 'bg-yellow-500'; // Color amarillo para ratings medios
    } else {
      return 'bg-red-500'; // Color rojo para ratings bajos
    }
  };

  // Función para convertir el rating en porcentaje
  const getRatingPercentage = (rating: number): number => {
    return (rating / 10) * 100; // Convierte el rating de 1-10 a un porcentaje
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded); // Cambia el estado al hacer clic en la tarjeta
  };

  // Imagen predeterminada en caso de que no haya imagen
  const placeholderImage = "../Logo.png"; // Ruta de la imagen predeterminada

  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick} // Al hacer clic, se cambia el estado
    >
      {/* Verificamos si la imagen existe y usamos la imagen predeterminada si no existe */}
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h3>

        {/* Rating con barra de progreso */}
        <div className="flex items-center mb-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getRatingColor(movie.vote_average)}`}
          >
            <span>{movie.vote_average}</span> {/* Muestra el rating dentro del círculo */}
          </div>
          <div className="ml-4 flex-grow h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${getRatingColor(movie.vote_average)}`}
              style={{ width: `${getRatingPercentage(movie.vote_average)}%` }}
            ></div>
          </div>
        </div>

        {/* Descripción expandida cuando se hace clic */}
        {isExpanded && (
          <p className="text-gray-600 text-sm mt-2">{movie.overview}</p>
        )}
      </div>
    </div>
  );
};

export default Card;

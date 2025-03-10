import React from "react";
import { Link } from "react-router-dom";

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  original_language: string;
  vote_count: number;
};

const Card: React.FC<{ item: MediaItem }> = ({ item }) => {
  const placeholderImage = "../Logo.png";
  const isMovie = item.title; // Verifica si es una película

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img
        src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : placeholderImage}
        alt={item.title || item.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{item.title || item.name}</h3>
        <p className="text-sm text-gray-400">📅 {item.release_date || item.first_air_date} | 🌎 {item.original_language.toUpperCase()}</p>
        <p className="text-yellow-400 font-bold">⭐ {item.vote_average} ({item.vote_count} votos)</p>

        <Link
          to={isMovie ? `/movies/${item.id}` : `/tv/${item.id}`}  // Redirige correctamente
          className="text-blue-400 hover:underline mt-2 inline-block"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default Card;

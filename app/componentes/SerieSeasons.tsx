import React from 'react';

interface Season {
  id: number;
  name: string;
  air_date: string;
  poster_path: string | null;
}

interface SerieSeasonsProps {
  seasons: Season[];
}

const SerieSeasons: React.FC<SerieSeasonsProps> = ({ seasons }) => {
  if (!seasons || seasons.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Temporadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {seasons.map((season) => (
          <div key={season.id} className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : '/default-avatar.png'}
              alt={season.name}
            />
            <p className="text-white mt-2">{season.name}</p>
            <p className="text-gray-400">{season.air_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SerieSeasons;

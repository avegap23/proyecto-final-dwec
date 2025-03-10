import React from 'react';

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface SerieCastProps {
  cast: Actor[];
}

const SerieCast: React.FC<SerieCastProps> = ({ cast }) => {
  if (cast.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Actores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {cast.map((actor) => (
          <div key={actor.id} className="text-center bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-avatar.png'}
              alt={actor.name}
            />
            <p className="text-white mt-2">{actor.name}</p>
            {actor.character && <p className="text-gray-400 text-sm mt-1">{actor.character}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SerieCast;

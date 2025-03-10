import React from 'react';

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface MovieActorsProps {
  actors: Actor[];
}

const MovieActors: React.FC<MovieActorsProps> = ({ actors }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Actores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors.map((actor) => (
          <div key={actor.id} className="text-center bg-gray-800 p-4 rounded-lg">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4"
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-avatar.png'}
              alt={actor.name}
            />
            <p className="text-white text-lg">{actor.name}</p>
            <p className="text-gray-400 text-sm">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieActors;

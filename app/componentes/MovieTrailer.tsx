import React from 'react';

interface MovieTrailerProps {
  trailer: any | null;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ trailer }) => {
  if (!trailer) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
      <div className="flex justify-center">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieTrailer;

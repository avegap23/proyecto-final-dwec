import React from 'react';

interface SerieTrailerProps {
  trailer: any | null;
}

const SerieTrailer: React.FC<SerieTrailerProps> = ({ trailer }) => {
  if (!trailer) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Trailer</h2>
      <div className="mt-4">
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

export default SerieTrailer;

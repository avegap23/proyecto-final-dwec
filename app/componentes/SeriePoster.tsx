import React from 'react';

interface SeriePosterProps {
  posterPath: string;
  title: string;
}

const SeriePoster: React.FC<SeriePosterProps> = ({ posterPath, title }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      alt={title}
      className="w-40 rounded-lg shadow-lg"
    />
  );
};

export default SeriePoster;

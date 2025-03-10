import React from 'react';

interface MoviePosterProps {
  posterPath: string;
  title: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, title }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      alt={title}
      className="w-30 rounded-lg shadow-lg"
    />
  );
};

export default MoviePoster;

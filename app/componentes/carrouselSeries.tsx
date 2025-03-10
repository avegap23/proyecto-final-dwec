import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "abf5089fc83b3062f98114c95340c65b";
const API_URL = "https://api.themoviedb.org/3";

const Carousel: React.FC = () => {
    const [topSeries, setTopSeries] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get(`${API_URL}/tv/top_rated?api_key=${API_KEY}&language=es-ES`)
            .then((response) => setTopSeries(response.data.results.slice(0, 10)))
            .catch((error) => console.error("Error obteniendo series:", error));
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topSeries.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? topSeries.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full h-[550px] overflow-hidden">
            <div className="relative w-full h-full rounded-lg">
                {topSeries.map((serie, index) => (
                    <div
                        key={serie.id}
                        className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 scale-100 block" : "opacity-0 scale-95 hidden"
                            }`}
                    >
                        {/* Link que envuelve toda la serie */}

                        {/* Imagen de fondo con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                        {/* Contenedor de la info */}
                        <div className="absolute inset-0 flex flex-row justify-between p-10 text-white z-10">
                            {/* Información de la serie */}
                            <div className="w-2/3 flex flex-col justify-center">
                                <h2 className="text-5xl font-extrabold drop-shadow-lg">{serie.name}</h2>
                                <p className="mt-4 text-lg max-w-2xl drop-shadow-md">{serie.overview}</p>

                                <div className="mt-4 flex items-center gap-4">
                                    <span className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md">
                                        ⭐ {serie.vote_average.toFixed(1)}
                                    </span>
                                    <span className="px-4 py-2 bg-gray-800 rounded-lg shadow-md">
                                        {new Date(serie.first_air_date).getFullYear()}
                                    </span>
                                </div>
                            </div>

                            {/* Imagen del póster */}

                            <div className="w-1/3 flex justify-end items-center">
                                <Link to={`/tv/${serie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                                        className="h-[400px] w-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                                        alt={serie.name}
                                    />
                                </Link>
                            </div>


                        </div>

                        {/* Imagen de fondo */}
                        <img
                            src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`}
                            className="w-full h-full object-cover"
                            alt={serie.name}
                        />

                    </div>
                ))}
            </div>

            {/* Botón Anterior */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full shadow-lg transition-all"
            >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Botón Siguiente */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full shadow-lg transition-all"
            >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Carousel;

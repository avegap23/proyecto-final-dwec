import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Fondo from "../assets/fondodepantalla.jpg";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Fondo con imagen destacada */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Fondo})`,
          filter: 'blur(2px)',
        }}
      ></div>

      {/* Capa oscura para mejor contraste */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-6xl font-extrabold tracking-wide mb-4 text-white drop-shadow-lg">
          🎬 Bienvenido a <span className="text-red-500">MovieHub</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Explora un mundo de películas y series. Vive la mejor experiencia cinematográfica, todo en un solo lugar.
        </motion.p>

        {/* Botones de navegación */}
        <div className="flex gap-6 justify-center">
          <Link
            to="/movies"
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-lg transition transform hover:scale-105 hover:from-red-600 hover:to-red-800"
          >
            🍿 Ver Películas
          </Link>
          
          <Link
            to="/series"
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transition transform hover:scale-105 hover:from-blue-600 hover:to-blue-800"
          >
            📺 Ver Series
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

import React from 'react';
import Logo from '../assets/tmdblogo.png';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0 z-10">
      {/* Imagen a la izquierda */}
      <div className="flex items-center">
        <img
          src={Logo} // Ruta de la imagen
          alt="Logo"
          className="h-12 mr-4" // Tamaño de la imagen
        />
      
      </div>

      {/* Nav en el centro */}
      <nav className="flex-grow flex flex-wrap justify-end">
        <ul className="flex space-x-6">
          <li><Link to="/" className='hover:text-green-300'>Inicio </Link></li>
          <li><Link to="/movies" className="hover:text-green-300">Peliculas </Link></li>
          <li><Link to="/series" className="hover:text-green-300">Series</Link></li>
        </ul>
      </nav>

   
      
    </header>
  );
};

export default Header;

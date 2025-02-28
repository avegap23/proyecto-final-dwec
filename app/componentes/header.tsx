import React from 'react';
import Buscar from './buscar'; // Importamos el componente Buscar

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0 z-10">
      {/* Imagen a la izquierda */}
      <div className="flex items-center">
        <img
          src="/logo.png" // Ruta de la imagen
          alt="Logo"
          className="w-12 h-12 mr-4" // Tamaño de la imagen
        />
        <span className="text-2xl font-bold">MovieApp</span>
      </div>

      {/* Nav en el centro */}
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-gray-400">Inicio</a></li>
          <li><a href="/about" className="hover:text-gray-400">Acerca</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contacto</a></li>
        </ul>
      </nav>

     
      
    </header>
  );
};

export default Header;

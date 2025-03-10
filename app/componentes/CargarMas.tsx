import React from 'react';

interface CargarMasProps {
  onLoadMore: () => void;
}

const CargarMas: React.FC<CargarMasProps> = ({ onLoadMore }) => {
  return (
    <div className="flex justify-center mt-6">
      <button onClick={onLoadMore} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        🔄 Cargar más
      </button>
    </div>
  );
};

export default CargarMas;

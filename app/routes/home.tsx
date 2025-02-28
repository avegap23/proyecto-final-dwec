// Este es el componente que ya tienes en tu código
import Buscar from "../componentes/buscar"; // Asegúrate de que la ruta es correcta
import { Route } from "react-router-dom"; // Para declarar rutas



export default function Home() {
  return (
    <div>
      <h1>Bienvenido a la página principal</h1>
      
      <Buscar /> {/* Aquí incluimos el componente Buscar */}
    </div>
  );
}

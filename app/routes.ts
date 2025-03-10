import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Asegúrate de que las rutas no tengan id duplicados
export default [
  index("routes/index.tsx"),  // Página de inicio
  route("/series", "routes/series.tsx"), // Página de series
  route("/movies", "routes/home.tsx"),   // Página de películas
  route("/movies/:id", "routes/MovieDetail.tsx"), // Detalles de película (ruta única para películas)
  route("/tv/:id", "routes/SerieDetail.tsx")  // Detalles de serie (ruta única para series)
] satisfies RouteConfig;

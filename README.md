# MovieHub

## Descripción del Sitio Web

El sitio web **MovieHub** ofrece una plataforma para explorar una amplia variedad de películas y series. Al ingresar, los usuarios son recibidos con una interfaz que les permite elegir entre dos opciones principales:

1. **Ver Películas**: Accede a una extensa colección de películas de diversos géneros y épocas.
2. **Ver Series**: Descubre una amplia selección de series, desde las más populares hasta las menos conocidas.

## Toda esta información proviene de la API **TMDB**.
[🔗](https://developer.themoviedb.org/docs/getting-started)

## Funcionalidades Principales

- **Carrusel**: Muestra las opciones más populares de películas y series.
- **Detalles**: Al hacer clic en una película o serie, los usuarios pueden ver detalles como:
  - Tráiler
  - Actores
  - En el caso de las series, la lista de temporadas
  - Al seleccionar una temporada, se despliega la lista de episodios
- **Filtros de Búsqueda**:
  - **Por nombre**
  - **Por género**
  - Ambos filtros pueden usarse simultáneamente

Cada película o serie tiene una tarjeta con información relevante para mejorar la experiencia de usuario.
## Tecnologías Utilizadas
- **React Router** para la gestión de rutas.
- **TypeScript** para una tipificación estática segura.
- **Tailwind CSS** para el estilo de la aplicación.
- **TMDB API** para obtener información sobre películas y series.
- **Axios** para las solicitudes HTTP.


## Estructura del Proyecto

```
app 
│── assets 
│── componentes 
│   │── buscar.tsx 
│   │── card.tsx 
│   │── CargarMas.tsx 
│   │── carrousel.tsx 
│   │── carrouselSeries.tsx 
│   │── header.tsx 
│   │── MovieActors.tsx 
│   │── MoviePoster.tsx 
│   │── MovieTrailer.tsx 
│   │── SerieCast.tsx 
│   │── SeriePoster.tsx 
│   │── SerieSeasons.tsx 
│   │── SerieTrailer.tsx 
│── routes 
│   │── home.tsx 
│   │── index.tsx 
│   │── MovieDetail.tsx 
│   │── SerieDetail.tsx 
│   │── series.tsx 
│── app.css 
│── Logo.png 
│── root.tsx 
│── routes.ts 
```

## Enlace a la Página Web
  [🔗](https://moviehub-beta-ten.vercel.app)
## Enlace a Figma
  [🔗](https://www.figma.com/design/BysSAgRwnXFlEydgkyAqat/Untitled?node-id=0-1&t=4o3E0A6wj6Q2yGp8-1)
## Enlace a GitHub
  [🔗](https://github.com/avegap23/proyecto-final-dwec)
  

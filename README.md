# TMDB Movie Explorer

## Overview

TMDB Movie Explorer is a responsive React application for discovering films using data from The Movie Database (TMDB). It brings category browsing, search, filters, favorites, and movie details into a single client-side interface.

## Features

- **Browse movies:** Explore popular, top-rated, upcoming, and now-playing titles, with dedicated category pages and pagination.
- **Search:** Find movies by title and navigate paginated results. The search query and result page are reflected in the URL.
- **Filter and sort:** Narrow results by genre and TMDB user rating; sort by popularity, rating, release date, or title.
- **Favorites:** Add or remove movies from a personal list. Favorites are stored in the browser's local storage and remain available after a reload when storage is accessible.
- **Movie details:** View a film's poster, overview, release year, runtime, genres, TMDB rating, leading cast, and similar movies when those data are available.
- **Featured carousel:** The home page highlights popular movies with backdrop images, a link to each film, automatic and manual slide changes, and subtle image motion. It respects reduced-motion preferences.
- **Responsive themes:** Layouts adapt to desktop and mobile screens, with light and dark themes and a theme choice saved in local storage when available.
- **Loading and error states:** Skeleton placeholders and a global progress indicator accompany data requests. API errors produce feedback, with Retry controls for recoverable search, category, filter, and detail failures.

## Tech Stack

- React and TypeScript, built with Vite
- React Router for client-side navigation
- Redux Toolkit and RTK Query for favorites state, data fetching, and caching
- Zod for validating TMDB responses and stored favorites
- CSS Modules for component styles
- React Toastify for API error notifications
- pnpm for package management and Oxlint for linting

## Project Architecture

The source is organized by application infrastructure, shared UI, and features:

- `src/app/` contains the app shell, Redux store, TMDB API base query, theme hook, and main page.
- `src/common/` contains shared components, routing, hooks, and TMDB constants.
- `src/features/movies/` contains category browsing, movie cards, ratings, and movie details.
- `src/features/search/`, `src/features/filteredMovies/`, and `src/features/favorites/` contain their respective API, state, and UI code.

RTK Query endpoints share the TMDB base API. Zod schemas validate API responses before the UI uses them.

## Getting Started

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/TheGognacLady/tmdb-project.git
   cd tmdb-project
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy `.env.example` to `.env` and set your TMDB API read access token. On macOS or Linux:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

To create and preview a production build locally:

```bash
pnpm build
pnpm preview
```

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `VITE_TMDB_ACCESS_TOKEN` | TMDB API read access token used as a Bearer token for requests to the TMDB API. |

Set this variable in `.env` for local development and in the deployment environment for production builds. Variables prefixed with `VITE_` are embedded in the client bundle and **are not protected server-side secrets**. Do not treat this token as private in a browser deployment.

## Deployment

Import the repository into Vercel and use these project settings:

- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `dist`
- Environment Variable: `VITE_TMDB_ACCESS_TOKEN`

The root `vercel.json` rewrites incoming paths to `/index.html` so direct visits and refreshes on React Router routes load the SPA.

## Data Attribution

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

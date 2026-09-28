# Pantry & Plate

A recipe search app built with React and React Router, pulling live data from the free [TheMealDB](https://www.themealdb.com/api.php) API.

**Live demo:** <!-- paste your Vercel link here -->

## Screenshots

<!-- Add 2-3 screenshots: home page, search results, recipe detail page -->

## Features

- Search recipes by name, or hit "Surprise me" for random picks
- Recipe grid with images, category, and cuisine tags
- Client-side routing to a full recipe detail page (`/recipe/:id`) with ingredients and method
- Loading, empty, and error states handled explicitly
- Fully responsive layout

## Tech Stack

- React 18
- React Router 6
- Vite
- Hand-written CSS
- TheMealDB API (free tier, no API key required)

## Project Structure

```
src/
├── main.jsx            # App entry point, mounts React into #root
├── App.jsx             # Route definitions
├── api.js              # API calls to TheMealDB
├── components/
│   └── RecipeCard.jsx  # Reusable recipe card
└── pages/
    ├── Home.jsx        # Search and results grid
    └── RecipeDetail.jsx # Full recipe: ingredients and method
```

## Run Locally

```bash
git clone https://github.com/Pavani12-goud/recipe-finder.git
cd recipe-finder
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

# Pantry & Plate

A recipe search app built with React and React Router, pulling live data from the free TheMealDB API.

## Features
- Search recipes by name, or hit "Surprise me" for random picks
- Recipe grid with images, category, and cuisine tags
- Client-side routing to a full recipe detail page (`/recipe/:id`) with ingredients and method
- Loading, empty, and error states handled explicitly
- Fully responsive

## Tech
React 18, React Router 6, Vite, hand-written CSS. No API key required (TheMealDB's free tier).

## Run locally
```
npm install
npm run dev
```

## Deploy (free, ~5 minutes)
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → "Add New Project" → import the repo → Deploy. Vercel auto-detects Vite.
3. Copy the live URL for your resume/GitHub profile.

## What to say about it on your resume
> **Pantry & Plate — Recipe Search App** | React, React Router, REST API
> Built a recipe discovery app that fetches live data from a public REST API, with client-side routing between a search/results view and a recipe detail view using React Router. Implemented loading, empty, and error states, and structured reusable components (search bar, recipe card, detail layout).

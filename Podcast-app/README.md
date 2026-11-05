# Podspace

Podspace is a responsive podcast discovery app built with React and Vite. Browse
podcasts, search by title, filter by genre, sort the catalog, and explore show
seasons and episodes.

## Development

```bash
npm ci
npm run dev
```

The app fetches live data from the Podcast API and needs an internet connection.

## Checks and production build

```bash
npm run lint
npm run build
npm run preview
```

GitHub Actions publishes the production build to GitHub Pages whenever changes
are pushed to the repository's `main` branch.

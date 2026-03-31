# Dev Ecosystem Explorer

A modern React app that lets you search across **GitHub repositories**, **npm packages**, and **1,400+ public APIs** — all in one place.

## ✨ Features

- **Multi-source search** — GitHub, npm, and Public APIs aggregated
- **Smart caching** — Two-tier cache (memory + localStorage) to minimize API calls
- **Rate limiting** — Exponential backoff + request queue to handle API limits gracefully
- **Infinite scroll** — Automatic pagination with Intersection Observer
- **Favorites** — Star any result, persisted across sessions
- **Fuzzy filtering** — Client-side fuzzy search with Fuse.js
- **Dark/Light themes** — Toggle with smooth transitions
- **Keyboard shortcuts** — ⌘K to focus search

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔑 API Keys (Optional)

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Add your GitHub Personal Access Token (optional, increases rate limit):
```
VITE_GITHUB_TOKEN=ghp_your_token_here
```

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Zustand** — State management
- **Fuse.js** — Fuzzy search
- **Vanilla CSS** — Custom design tokens & themes

## 📁 Project Structure

```
src/
  api/          # GitHub, npm, Public APIs integrations
  cache/        # Memory + localStorage + HTTP caching
  ratelimit/    # Backoff + request queue
  hooks/        # useSearch, useDebounce, useInfiniteScroll, etc.
  components/   # Search, Filters, Results, Layout, Feedback
  store/        # Zustand stores (search, filters, favorites)
  utils/        # Constants, normalizers, fuzzy search, logger
  styles/       # Design tokens, themes, global styles
```

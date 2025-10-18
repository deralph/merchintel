# Merchly

Merchly is a tap-to-market platform that brings editorial fashion storytelling together with data-grade analytics. Every NFC tap issues a one-time session, so bookmarked or refreshed scan URLs require a fresh tap before unlocking the experience. The stack ships with a MongoDB Atlas-ready backend, a warm editorial landing page, and full client/admin dashboards for future expansion.

## Getting started

### Requirements

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Local development

Start both the client and the API server:

```bash
# run the Vite client on http://localhost:5173
npm run dev

# in another terminal start the API server on http://localhost:4000
npm run server
```

### Environment variables

Copy `.env.example` to `.env` and set the following variables:

- `PORT` – API server port (defaults to `4000`)
- `CLIENT_URL` – the base URL where the client is served (defaults to `http://localhost:5173`)
- `DATA_BACKEND` – `memory` (default) or `atlas`
- `SESSION_TTL_MINUTES` – lifespan for issued scan tokens (defaults to `5`)
- `DEFAULT_CLIENT_ID` – which demo client to use for the client/admin portals when no auth is configured (defaults to `client-1`)
- `JWT_SECRET` – secret for signing scan/session tokens if you plug in a persistent store
- `MONGODB_DATA_API_URL`, `MONGODB_DATA_SOURCE`, `MONGODB_DATABASE`, `MONGODB_DATA_API_KEY` – optional Atlas Data API credentials
- `VITE_API_BASE_URL` – client-side base URL for API requests (defaults to `http://localhost:4000/api`)

The in-memory store works out-of-the-box. When you are ready to connect Atlas, provide the API URL/key values above and implement the persistence methods in `server/src/services/atlasStore.js`.

## Tap flow overview

1. An NFC tag or QR code points to `GET /api/tags/:tagSlug/scan`.
2. The server issues a single-use token, redirects to `/scan/:clientSlug/:tagUid?session=<token>`, and records the expiry.
3. The React `ScanGateway` page validates the token, collects consent, and posts to `/api/scan-sessions/:token/complete`.
4. Completed tokens cannot be reused. Refreshing the scan page or revisiting a bookmark requires a fresh tap.

## Project structure

- `src/` – React front-end (landing page, dashboards, scan gateway)
- `server/src/` – Express-style API with modular controllers and store services
- `src/index.css` – global design tokens using the Merchly palette and typography

## Scripts

- `npm run dev` – start the Vite development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint
- `npm run server` – run the Merchly API server

## License

Proprietary – Merchly internal tooling.

# Merchly

Merchly is a tap-to-market platform that brings editorial fashion storytelling together with data-grade analytics. Every NFC tap
issues a one-time session, so bookmarked or refreshed scan URLs require a fresh tap before unlocking the experience. The stack
ships with a MongoDB Atlas-ready backend, a warm editorial landing page, and full client/admin dashboards for future expansion.

## Repository layout

- `client/` – Vite + React front-end with Tailwind CSS and the component design system
- `server/` – Express API server with modular controllers, schemas, and data stores

## Getting started

### Requirements

- Node.js 18+
- npm 9+

### Installation

Install dependencies for each workspace:

```bash
# Front-end assets
cd client
npm install

# API server
cd ../server
npm install
```

### Local development

Start the client and API server in separate terminals:

```bash
# Terminal 1 – client
cd client
npm run dev

# Terminal 2 – server
cd server
npm run dev
```

The client runs on [http://localhost:5173](http://localhost:5173) by default and will proxy API calls to the server. The API server
listens on [http://localhost:4000](http://localhost:4000) and exposes REST endpoints under `/api`.

### Environment variables

Each package includes its own `.env.example` file:

- `client/.env.example` – configure `VITE_API_BASE_URL` for front-end requests
- `server/.env.example` – configure API settings such as `PORT`, `CLIENT_URL`, `DATA_BACKEND`, and Atlas credentials

Copy the appropriate file to `.env` within each package and adjust the values for your environment.

## Tap flow overview

1. An NFC tag or QR code points to `GET /api/tags/:tagSlug/scan`.
2. The server issues a single-use token, redirects to `/scan?session=<token>`, and records the expiry.
3. The React `ScanGateway` page validates the token, collects consent, and posts to `/api/scan-sessions/:token/complete`.
4. Completed tokens cannot be reused. Refreshing the scan page or revisiting a bookmark requires a fresh tap.

## Server structure

The server uses Express with dedicated folders for controllers, middleware, routes, models, and schemas. The in-memory store is
ready out of the box, while the Atlas store can be enabled by providing MongoDB Data API credentials.

## Client scripts

Run these commands from the `client` directory:

- `npm run dev` – start the Vite development server
- `npm run build` – create a production build
- `npm run build:dev` – build using the development mode configuration
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint

## License

Proprietary – Merchly internal tooling.

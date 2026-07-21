# Frontend Application

Next.js frontend for the AI-Powered Discovery Engine Dashboard.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Docker

Build and run with Docker:
```bash
docker build -t discovery-engine-frontend .
docker run -p 3000:3000 discovery-engine-frontend
```

## Project Structure

- `src/app/` - Next.js app directory with pages
- `src/components/` - React components
- `src/lib/` - Utility functions and API clients
- `src/store/` - State management (Zustand)
- `src/types/` - TypeScript type definitions

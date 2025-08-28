# 🛡️ GovGuardAI — AI-Powered Misinformation Monitoring Platform

<div align="center">
  <img src="public/logo.svg" alt="GovGuardAI Logo" width="160" />
  <h1>📡 Monitor • 🔍 Analyze • ✅ Verify</h1>

  <p align="center">
    <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status">
    <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20TS-61DAFB?style=for-the-badge&logo=react" alt="Frontend">
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge" alt="FastAPI">
    <img src="https://img.shields.io/badge/DB-PostgreSQL%20%2B%20pgvector-336791?style=for-the-badge&logo=postgresql" alt="DB">
    <img src="https://img.shields.io/badge/Queue-Celery%20%2B%20Redis-FF6F00?style=for-the-badge&logo=redis" alt="Queue">
  </p>
</div>

---

## Features

- **Live Feed of Analyzed Articles**  
  Browse recent articles with computed attributes like `nli_label` and `contradiction_score`.  
  UI: `frontend/src/pages/LiveFeedPage.tsx` using `useClaims()` from `frontend/src/lib/api`.

- **Contradictions Dashboard**  
  View trends of detected contradictions for the last 7 days and browse contradicting claims.  
  UI: `frontend/src/pages/ContradictionsPage.tsx` + `ContradictionsChart`.

- **Search & Filters**  
  Global search from the fixed search bar in `DashboardLayout` filtering claims by title/source.

- **Dark Mode**  
  Toggle in `Navbar.tsx`. Managed via Tailwind’s `dark` class on the root element.

- **Responsive UI**  
  Built with Tailwind, Framer Motion for subtle animations, and Lucide icons.

---

## Architecture Overview

- **Backend (`backend/`)**
  - API: FastAPI (`backend/app/main.py`)
    - `GET /` health
    - `POST /ingest/` ingests latest news from GNews and persists new claims
    - `GET /claims/` returns 20 most recent claims
    - `GET /dashboard/trends` contradiction counts by day (last 7 days)
  - Database: PostgreSQL with `pgvector`
    - Models: `Claim`, `FactCheck` (`backend/app/db/models.py`)
  - ORM & Session: SQLAlchemy (`backend/app/db/session.py`)
  - Background Tasks: Celery worker + beat (`backend/celery_worker.py`)
    - Ingestion scheduled via Celery Beat (Redis broker)
    - NLP pipeline task `analyze_claim_task` enriches claims with:
      - `summary` (text summary)
      - `nli_label` (e.g., contradiction)
      - `contradiction_score`
      - (Embeddings via pgvector for semantic operations)
  - CORS: configured for local frontend dev `http://localhost:5173`

- **Frontend (`frontend/`)**
  - Tooling: Vite, TypeScript, Tailwind
  - Routing: `react-router-dom` (Home, Live Feed, Contradictions)
  - Data fetching: SWR hooks (e.g., `useClaims`, `useTrendData`)
  - Components: `Navbar`, `Sidebar`, `SearchBar`, `ClaimCard`, `ContradictionsChart`, etc.
  - Pages:
    - `HomePage` (hero, metrics, features, how-it-works, about, CTA)
    - `LiveFeedPage`
    - `ContradictionsPage`

- **Infrastructure (`docker-compose.yml`)**
  - Postgres (pgvector): exposed on `5433`
  - Redis: exposed on `6379`

---

## Directory Structure

```
GovGuard-AI/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ db/
│  │  │  ├─ models.py
│  │  │  └─ session.py
│  │  ├─ tasks/
│  │  │  ├─ ingestion_tasks.py
│  │  │  └─ nlp_tasks.py
│  │  └─ services/
│  ├─ celery_worker.py
│  ├─ data/
│  └─ scripts/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ lib/
│  │  ├─ data/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  ├─ index.html
│  └─ package.json
├─ ml_models/
├─ docker-compose.yml
├─ .env.example
└─ README.md
```

Note: This tree is simplified to highlight key directories and files.

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker Desktop (for Postgres + Redis)
- GNews API key

### 1) Environment Variables
Copy the example and update values as needed:
```bash
cp .env.example .env
```
Important keys in `.env`:
- `DATABASE_URL` (default uses localhost:5433)
- `REDIS_URL` (default `redis://localhost:6379`)
- `GNEWS_API_KEY` (your GNews token)

Start infra:
```bash
docker compose up -d
# Postgres on localhost:5433, Redis on localhost:6379
```

### 2) Backend API
Create and activate a virtual environment, then install packages:
```bash
# from GovGuard-AI/backend
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # If not present, install fastapi, uvicorn, sqlalchemy, psycopg2-binary, pgvector, celery, python-dotenv, requests
```

Run the API:
```bash
# from GovGuard-AI/backend
uvicorn app.main:app --reload --port 8000
```

Run Celery worker and beat:
```bash
# from GovGuard-AI/backend
celery -A celery_worker.celery_app worker -l info
celery -A celery_worker.celery_app beat -l info
```

Trigger ingestion (optional, or wait for beat schedule):
```bash
curl -X POST http://localhost:8000/ingest/
```

### 3) Frontend App
Install deps and run dev server:
```bash
# from GovGuard-AI/frontend
npm install
npm run dev
# Vite serves at http://localhost:5173
```

---

## API Endpoints

- `GET /` — health/info
- `POST /ingest/` — fetch recent GNews articles, persist new `Claim`s, enqueue NLP analysis (`analyze_claim_task`)
- `GET /claims/` — latest 20 claims (fields: `title`, `source_name`, `content`, `published_at`, `nli_label`, `contradiction_score`, `summary`, ...)
- `GET /dashboard/trends` — contradiction counts per day for the last 7 days

CORS allows `http://localhost:5173` for local frontend.

---

## Frontend Scripts

From `GovGuard-AI/frontend/package.json`:
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview the build
- `npm run lint` — ESLint

Key dependencies: `react`, `react-router-dom@^7`, `swr`, `tailwindcss`, `framer-motion`, `lucide-react`, `vite`.

---

## Roadmap

- **Topics Classification **
  - Topic modeling and LLM-assisted categorization per claim.
  - Topic filters and topic distribution charts.

- **Bias Detection **
  - Classify source or article bias (e.g., left/center/right, partisan tilt).
  - Source-level bias aggregation and visualization.
  - Confidence calibration and human-in-the-loop review.

- **Sentiment Analysis **
  - Per-article and per-topic sentiment scores.
  - Sentiment-over-time graphs and alerting on unusual spikes.

- **Source Credibility & Fact-Check Integration**
  - Curate/ingest fact-check databases.
  - Use embeddings (pgvector) for semantic matching of claims to fact-checks.
  - Credibility scoring of outlets and authors.

- **User Accounts & Alerts**
  - Saved searches, email alerts for new contradictions or topic spikes.
  - Shareable dashboards and reports.

- **Analytics & Monitoring**
  - Model performance dashboards (precision/recall for NLI).
  - Data drift alerts and retraining hooks.

- **Deployment & DevOps**
  - Dockerized API + Frontend + Workers
  - CI/CD workflows, infra-as-code, secrets management

- **Security & Compliance**
  - API keys & credentials vaulting
  - Rate limiting, logging/audit trails, and PII handling policies

---







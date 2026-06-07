# LexMind — AI Legal Contract Drafting

AI-powered legal contract generator. Describe what you need, and LexMind drafts a professional contract tailored to your jurisdiction.

## Setup

```bash
# 1. Backend
cd backend
python -m venv lexmind-venv
.\lexmind-venv\Scripts\activate
pip install -r requirements.txt

# 2. Environment
copy .env.example .env   # add your GEMINI_API_KEY

# 3. Frontend
cd ../frontend
npm install
npm run build

# 4. Run
cd ../backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8081
```

Open http://localhost:8081

## API

### `POST /api/generate`
Generate a contract.

```json
// Request
{ "prompt": "A lease agreement for an apartment in NYC", "jurisdiction": "us" }

// Response
{
  "title": "Residential Lease Agreement",
  "content": "...",
  "summary": "...",
  "risk_flags": ["..." ]
}
```

### `POST /api/generate/pdf`
Generate and download contract as PDF. Same request body as `/generate`.

### `GET /api/health`
`{ "status": "ok" }`

**Rate limits:** `/generate` = 20/min, `/generate/pdf` = 10/min.

## Jurisdictions
`us`, `uk`, `eu`, `ae`, `sa`, `jo`

## Docker
```bash
docker build -t lexmind .
docker run -p 8081:8081 -e GEMINI_API_KEY=your_key lexmind
```

## Tech
FastAPI, React 18, Tailwind CSS, Google Gemini, ReportLab

## Architecture
```
LexMind/
├── backend/          # FastAPI (port 8081)
│   ├── app/
│   │   ├── main.py           # App setup, CORS, rate limiting
│   │   ├── limiter.py        # Rate limiter config
│   │   ├── models/           # Pydantic schemas
│   │   ├── routes/           # API endpoints
│   │   └── services/         # AI + PDF generation
│   ├── .env.example
│   └── requirements.txt
├── frontend/         # React 18 + CRA + Tailwind
│   ├── src/
│   │   ├── pages/            # LandingPage, ContractPage
│   │   ├── components/       # Header
│   │   └── lib/api.js        # API client
│   └── package.json
└── Dockerfile        # Multi-stage (frontend build + backend)
```

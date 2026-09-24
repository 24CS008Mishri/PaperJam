# Paper Jam Backend

FastAPI service boundary for the metadata-first regulatory RAG described in the project brief.

## Setup

Create a virtual environment and install the dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Run the API from this directory:

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

Health check: `http://localhost:8000/health`

API docs: `http://localhost:8000/docs`

## Admin authentication

Set `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and `JWT_EXPIRE_MINUTES` in `.env`, then seed the development admin once:

```powershell
python scripts/seed_admin.py
```

The seed script stores only a bcrypt password hash and skips an existing email. Admin login is available at `POST /api/auth/admin/login`; protected document routes require its bearer token. The frontend reads `VITE_API_URL` and never receives the admin password, JWT secret, or MongoDB credentials.

## API surface

- `POST /api/rag/query`
- `POST /api/documents/ingest`
- `GET /api/documents`
- `GET /api/documents/{document_id}`
- `GET /api/documents/{document_id}/sources`

The generation provider is Groq, configured with `GROQ_API_KEY` and `GROQ_MODEL`. MongoDB Atlas Vector Search and the embedding worker can be connected behind the document store without putting provider logic in the route handlers.

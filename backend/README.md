# Backend Application

FastAPI backend for the AI-Powered Discovery Engine.

## Setup

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the application:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Development

- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Testing

```bash
pytest tests/
```

## Docker

Build and run with Docker:
```bash
docker build -f docker/Dockerfile -t discovery-engine-backend .
docker run -p 8000:8000 discovery-engine-backend
```

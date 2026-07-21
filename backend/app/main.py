from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1 import data, barriers, needs

app = FastAPI(
    title="AI-Powered Discovery Engine API",
    version="1.0.0",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(data.router, prefix="/api/v1/data", tags=["data"])
app.include_router(barriers.router, prefix="/api/v1/barriers", tags=["barriers"])
app.include_router(needs.router, prefix="/api/v1/needs", tags=["needs"])

@app.get("/")
async def root():
    return {"message": "AI-Powered Discovery Engine API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

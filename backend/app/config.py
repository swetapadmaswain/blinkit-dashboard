from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:password@localhost:5432/discovery_engine"
    mongodb_url: str = "mongodb://localhost:27017/discovery_engine"
    redis_url: str = "redis://localhost:6379/0"
    elasticsearch_url: str = "http://localhost:9200"
    jwt_secret_key: str = "your-jwt-secret-key-change-this"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60
    api_rate_limit: str = "1000/minute"
    cors_origins: str = "http://localhost:3001"
    log_level: str = "INFO"
    
    def get_cors_origins(self) -> List[str]:
        origins = [origin.strip() for origin in self.cors_origins.split(',') if origin.strip()]
        # If "*" is in the list, return it to allow all origins
        if "*" in origins:
            return ["*"]
        return origins
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

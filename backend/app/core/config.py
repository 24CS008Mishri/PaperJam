from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = 'Paper Jam Regulatory API'
    environment: str = 'development'
    api_prefix: str = '/api'
    mongodb_uri: str = 'mongodb://localhost:27017'
    mongodb_database: str = 'paper_jam'
    groq_api_key: str | None = None
    groq_model: str = 'llama-3.1-8b-instant'
    embedding_model: str = 'BAAI/bge-small-en-v1.5'
    rag_top_k: int = 5
    admin_email: str | None = None
    admin_password: str | None = None
    jwt_secret: str | None = None
    jwt_expire_minutes: int = 60

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')


@lru_cache
def get_settings() -> Settings:
    return Settings()

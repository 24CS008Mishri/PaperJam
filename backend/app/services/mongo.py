from functools import lru_cache

from pymongo import ASCENDING, MongoClient

from app.core.config import get_settings


@lru_cache
def get_mongo_client() -> MongoClient:
    settings = get_settings()
    if not settings.mongodb_uri:
        raise RuntimeError('MONGODB_URI is not configured.')
    return MongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)


def get_database():
    settings = get_settings()
    database = get_mongo_client()[settings.mongodb_database]
    database.admins.create_index([('email', ASCENDING)], unique=True)
    database.revoked_tokens.create_index([('expires_at', ASCENDING)], expireAfterSeconds=0)
    database.regulatory_documents.create_index([('document_id', ASCENDING)], unique=True)
    database.regulatory_chunks.create_index([('document_id', ASCENDING)])
    return database

from functools import lru_cache

from app.core.config import get_settings


@lru_cache
def get_embedding_model():
    """Load the configured embedding model once per backend process."""
    from sentence_transformers import SentenceTransformer

    return SentenceTransformer(get_settings().embedding_model)


def embed_text(text: str) -> list[float]:
    vector = get_embedding_model().encode(text, normalize_embeddings=True)
    return vector.tolist()

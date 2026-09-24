from functools import lru_cache

from app.core.config import get_settings


@lru_cache
def get_groq_client():
    settings = get_settings()
    if not settings.groq_api_key:
        return None
    from groq import Groq

    return Groq(api_key=settings.groq_api_key)


def generate_regulatory_answer(question: str, context: str) -> str:
    client = get_groq_client()
    if client is None:
        raise RuntimeError('GROQ_API_KEY is not configured.')

    settings = get_settings()
    response = client.chat.completions.create(
        model=settings.groq_model,
        temperature=0.1,
        max_tokens=350,
        messages=[
            {
                'role': 'system',
                'content': (
                    "You are Paper Jam's Regulatory Explanation Assistant. "
                    'Answer only from the supplied regulatory context. Do not invent regulations. '
                    'Keep the answer concise, explain applicability and required documents when present, '
                    'and say No supporting regulation found in the knowledge base. when evidence is insufficient.'
                ),
            },
            {
                'role': 'user',
                'content': f'Question: {question}\n\nRegulatory context:\n{context}',
            },
        ],
    )
    return response.choices[0].message.content or 'No supporting regulation found in the knowledge base.'

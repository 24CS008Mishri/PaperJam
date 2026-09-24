from typing import Any

from app.services.document_store import document_store
from app.services.embeddings import embed_text
from app.services.mongo import get_database


def ingest_pdf(document_id: str, content: bytes) -> None:
    """Extract page-aware sections/chunks and update the document lifecycle."""
    try:
        import fitz

        pdf = fitz.open(stream=content, filetype='pdf')
        chunks: list[dict[str, Any]] = []
        sections: list[dict[str, Any]] = []
        chunk_index = 0
        document_store.update(document_id, processing_stage='chunking')

        for page_number, page in enumerate(pdf, start=1):
            text = page.get_text('text').strip()
            if not text:
                continue
            section_title = f'Page {page_number}'
            section_number = str(page_number)
            sections.append({
                'section_number': section_number,
                'section_title': section_title,
                'page_number': page_number,
                'chunk_count': 1,
            })
            chunks.append({
                'chunk_id': f'{document_id}-CHUNK-{chunk_index:04d}',
                'section_number': section_number,
                'section_title': section_title,
                'page_number': page_number,
                'chunk_index': chunk_index,
                'chunk_text': text[:5000],
            })
            chunk_index += 1

        document_store.update(document_id, processing_stage='embedding', sections=sections, chunks=chunks)
        chunks_collection = get_database().regulatory_chunks
        chunks_collection.delete_many({'document_id': document_id})
        for chunk in chunks:
            chunks_collection.insert_one({
                **chunk,
                'document_id': document_id,
                'embedding': embed_text(chunk['chunk_text']),
            })
        document_store.update(document_id, processing_stage='indexed', status='ready')
    except Exception as exc:
        document_store.update(document_id, processing_stage='error', status='error', error=str(exc))

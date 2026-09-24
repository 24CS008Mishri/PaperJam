from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile, status

from app.models.schemas import (
    DocumentIngestResponse,
    DocumentSummary,
    RagQueryRequest,
    RagQueryResponse,
)
from app.services.document_store import document_store
from app.services.generation import generate_regulatory_answer
from app.services.ingestion import ingest_pdf
from app.services.auth import require_admin
import re

router = APIRouter()


def normalize_taxonomy(value: str) -> str:
    return re.sub(r'^\d+_', '', value.strip()).upper()


@router.post('/rag/query', response_model=RagQueryResponse)
async def query_regulations(request: RagQueryRequest) -> RagQueryResponse:
    question_terms = set(request.question.lower().split())
    candidates = []
    for document in document_store.list():
        if request.business and request.business.lower() not in ' '.join(document.get('businesses', [])).lower():
            continue
        if request.category and document.get('category') != request.category:
            continue
        if request.subcategory and document.get('subcategory') != request.subcategory:
            continue
        for chunk in document.get('chunks', []):
            score = len(question_terms.intersection(set(chunk['chunk_text'].lower().split())))
            candidates.append((score, document, chunk))

    candidates.sort(key=lambda item: item[0], reverse=True)
    selected = candidates[:request.top_k]
    if not selected:
        return RagQueryResponse(answer='No supporting regulation found in the knowledge base.', sources=[])

    context = '\n\n'.join(
        f"[{document['document_id']}] {document['title']} | {chunk['section_title']} | Page {chunk['page_number']}\n{chunk['chunk_text']}"
        for _, document, chunk in selected
    )
    try:
        answer = generate_regulatory_answer(request.question, context)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc

    sources = [
        {
            'document_id': document['document_id'],
            'document_title': document['title'],
            'category': document['category'],
            'subcategory': document['subcategory'],
            'section': chunk['section_title'],
            'page': chunk['page_number'],
            'chunk_id': chunk['chunk_id'],
        }
        for _, document, chunk in selected
    ]
    return RagQueryResponse(answer=answer, sources=sources)


@router.post('/documents/ingest', response_model=DocumentIngestResponse, status_code=status.HTTP_202_ACCEPTED, dependencies=[Depends(require_admin)])
async def ingest_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    category: str = Form(''),
    subcategory: str = Form(''),
    authority: str = Form(''),
    jurisdiction: str = Form(''),
    document_type: str = Form('PDF'),
    businesses: str = Form(''),
    rag_tags: str = Form(''),
    version: str = Form('1.0'),
    last_verified: str = Form(''),
    binding_status: str = Form('synthetic_demo_non_binding'),
) -> DocumentIngestResponse:
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail='Only PDF files are supported.')

    content = await file.read()
    document = document_store.create(file.filename or 'document.pdf', {
        'category': normalize_taxonomy(category),
        'subcategory': normalize_taxonomy(subcategory),
        'authority': authority,
        'jurisdiction': jurisdiction,
        'document_type': document_type,
        'businesses': [item.strip() for item in businesses.split(',') if item.strip()],
        'rag_tags': [item.strip() for item in rag_tags.split(',') if item.strip()],
        'version': version,
        'last_verified': last_verified,
        'binding_status': binding_status,
    })
    background_tasks.add_task(ingest_pdf, document['document_id'], content)
    return DocumentIngestResponse(
        document_id=document['document_id'],
        status=document['status'],
        processing_stage=document['processing_stage'],
        message=f'{file.filename or "document.pdf"} was processed.',
    )


@router.get('/documents', response_model=list[DocumentSummary], dependencies=[Depends(require_admin)])
async def list_documents() -> list[DocumentSummary]:
    return document_store.list()


@router.get('/documents/{document_id}', response_model=DocumentSummary, dependencies=[Depends(require_admin)])
async def get_document(document_id: str) -> DocumentSummary:
    document = document_store.get(document_id)
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Document {document_id} was not found.')
    return document


@router.get('/documents/{document_id}/sources', dependencies=[Depends(require_admin)])
async def get_document_sources(document_id: str) -> list[dict[str, str]]:
    document = document_store.get(document_id)
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Document {document_id} was not found.')
    return [
        {
            'document_id': document['document_id'],
            'document_title': document['title'],
            'section': chunk['section_title'],
            'page': str(chunk['page_number']),
            'chunk_id': chunk['chunk_id'],
        }
        for chunk in document.get('chunks', [])
    ]

from datetime import datetime, timezone
from threading import Lock
from typing import Any
from uuid import uuid4

from app.services.mongo import get_database


class DocumentStore:
    """Development store with the same document shape used by MongoDB."""

    def __init__(self) -> None:
        self._documents: dict[str, dict[str, Any]] = {}
        self._lock = Lock()

    def create(self, filename: str, metadata: dict[str, Any]) -> dict[str, Any]:
        document_id = f'DOC-{uuid4().hex[:10].upper()}'
        now = datetime.now(timezone.utc).date().isoformat()
        document = {
            'document_id': document_id,
            'title': filename,
            'category': metadata.get('category', ''),
            'subcategory': metadata.get('subcategory', ''),
            'folder_path': metadata.get('folder_path', ''),
            'authority': metadata.get('authority', ''),
            'jurisdiction': metadata.get('jurisdiction', ''),
            'document_type': metadata.get('document_type', 'PDF'),
            'businesses': metadata.get('businesses', []),
            'rag_tags': metadata.get('rag_tags', []),
            'version': metadata.get('version', '1.0'),
            'last_verified': metadata.get('last_verified') or now,
            'binding_status': metadata.get('binding_status', 'synthetic_demo_non_binding'),
            'status': 'processing',
            'processing_stage': 'extracting',
            'sections': [],
            'chunks': [],
            'created_at': datetime.now(timezone.utc).isoformat(),
        }
        with self._lock:
            self._documents[document_id] = document
        get_database().regulatory_documents.insert_one(dict(document))
        return document

    def get(self, document_id: str) -> dict[str, Any] | None:
        with self._lock:
            document = self._documents.get(document_id)
        if document:
            return dict(document)
        document = get_database().regulatory_documents.find_one({'document_id': document_id}, {'_id': 0})
        return document

    def list(self) -> list[dict[str, Any]]:
        documents = list(get_database().regulatory_documents.find({}, {'_id': 0}).sort('created_at', -1))
        with self._lock:
            memory_documents = {document['document_id']: dict(document) for document in self._documents.values()}
        memory_documents.update({document['document_id']: document for document in documents})
        return list(memory_documents.values())

    def update(self, document_id: str, **changes: Any) -> None:
        with self._lock:
            if document_id in self._documents:
                self._documents[document_id].update(changes)
        get_database().regulatory_documents.update_one(
            {'document_id': document_id},
            {'$set': changes},
        )


document_store = DocumentStore()

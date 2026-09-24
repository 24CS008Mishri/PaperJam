from pydantic import BaseModel, Field


class SourceReference(BaseModel):
    document_id: str
    document_title: str
    category: str
    subcategory: str
    section: str
    page: int = Field(ge=1)
    chunk_id: str


class RagQueryRequest(BaseModel):
    question: str = Field(min_length=1)
    business: str | None = None
    category: str | None = None
    subcategory: str | None = None
    document_type: str | None = None
    jurisdiction: str | None = None
    top_k: int = Field(default=5, ge=1, le=10)


class RagQueryResponse(BaseModel):
    answer: str
    sources: list[SourceReference] = Field(default_factory=list)


class DocumentSection(BaseModel):
    section_number: str
    section_title: str
    page_number: int
    chunk_count: int


class DocumentChunk(BaseModel):
    chunk_id: str
    section_number: str
    section_title: str
    page_number: int
    chunk_index: int
    chunk_text: str


class DocumentSummary(BaseModel):
    document_id: str
    title: str
    category: str
    subcategory: str
    folder_path: str
    authority: str
    jurisdiction: str
    document_type: str
    binding_status: str
    version: str
    last_verified: str | None = None
    businesses: list[str] = Field(default_factory=list)
    rag_tags: list[str] = Field(default_factory=list)
    status: str = 'processing'
    processing_stage: str = 'extracting'
    sections: list[DocumentSection] = Field(default_factory=list)
    chunks: list[DocumentChunk] = Field(default_factory=list)


class DocumentIngestResponse(BaseModel):
    document_id: str
    status: str
    processing_stage: str = 'extracting'
    message: str

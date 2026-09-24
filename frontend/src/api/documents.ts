const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
import { getAccessToken } from './auth';

export interface DocumentSummary {
  document_id: string;
  title: string;
  category: string;
  subcategory: string;
  folder_path: string;
  authority: string;
  jurisdiction: string;
  document_type: string;
  binding_status: string;
  version: string;
  last_verified?: string | null;
  status?: string;
  processing_stage?: string;
  sections?: DocumentSection[];
  chunks?: DocumentChunk[];
}

export interface DocumentSection {
  section_number: string;
  section_title: string;
  page_number: number;
  chunk_count: number;
}

export interface DocumentChunk {
  chunk_id: string;
  section_number: string;
  section_title: string;
  page_number: number;
  chunk_index: number;
  chunk_text: string;
}

export interface UploadMetadata {
  category?: string;
  subcategory?: string;
  authority?: string;
  jurisdiction?: string;
  document_type?: string;
  businesses?: string;
  rag_tags?: string;
  version?: string;
  last_verified?: string;
  binding_status?: string;
}

export interface DocumentUploadResponse {
  document_id: string;
  status: string;
  processing_stage?: string;
  message: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const token = getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getDocuments(): Promise<DocumentSummary[]> {
  return request<DocumentSummary[]>('/api/documents');
}

export function getDocument(id: string): Promise<DocumentSummary> {
  return request<DocumentSummary>(`/api/documents/${encodeURIComponent(id)}`);
}

export function getDocumentStatus(id: string): Promise<DocumentSummary> {
  return getDocument(id);
}

export function uploadDocument(file: File, metadata: UploadMetadata = {}): Promise<DocumentUploadResponse> {
  const form = new FormData();
  form.append('file', file);
  Object.entries(metadata).forEach(([key, value]) => {
    if (value) form.append(key, value);
  });
  return request<DocumentUploadResponse>('/api/documents/ingest', { method: 'POST', body: form });
}

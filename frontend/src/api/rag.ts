const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
import { getAccessToken } from './auth';

export interface RagSource {
  document_id: string;
  document_title: string;
  category: string;
  subcategory: string;
  section: string;
  page: number;
  chunk_id: string;
}

export interface RagAnswer {
  answer: string;
  sources: RagSource[];
}

export function askWhyRequired(
  question: string,
  business?: string,
  category?: string,
  subcategory?: string,
): Promise<RagAnswer> {
  const token = getAccessToken();
  return fetch(`${API_BASE_URL}/api/rag/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ question, business, category, subcategory }),
  }).then(async (response) => {
    if (!response.ok) throw new Error((await response.text()) || `Request failed with ${response.status}`);
    return response.json() as Promise<RagAnswer>;
  });
}

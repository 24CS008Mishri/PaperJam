import { useEffect, useState } from 'react';
import { DocumentSummary, getDocument } from '../../api/documents';

interface Props {
  onNavigate: (page: string, documentId?: string) => void;
  documentId?: string;
}

export default function DocumentDetail({ onNavigate, documentId }: Props) {
  const [document, setDocument] = useState<DocumentSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!documentId) {
      setError('Select a document from the Knowledge Library first.');
      return;
    }
    getDocument(documentId).then(setDocument).catch((reason: Error) => setError(reason.message));
  }, [documentId]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={() => onNavigate('admin-knowledge')} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] mb-6">← Knowledge Library</button>
      {error && <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">{error}</div>}
      {document && <>
        <div className="bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4"><div><div className="text-xs text-violet-700 font-semibold uppercase tracking-wide">{document.category} / {document.subcategory || 'Uncategorized'}</div><h1 className="font-display text-2xl font-semibold text-[#1C1B22] mt-2">{document.title}</h1><p className="text-sm text-[#7C7B85] mt-1">{document.document_id}</p></div><span className="text-xs font-semibold text-violet-700 uppercase">{document.processing_stage}</span></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">{[['Authority', document.authority], ['Jurisdiction', document.jurisdiction], ['Businesses', document.businesses?.join(', ') || 'All'], ['Document type', document.document_type], ['Version', document.version]].map(([label, value]) => <div key={label} className="bg-white rounded-xl p-3 border border-white/70"><div className="text-xs text-[#7C7B85]">{label}</div><div className="text-sm font-medium text-[#1C1B22] mt-1">{value || '—'}</div></div>)}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white rounded-2xl border border-[#E8E4DC] p-6"><h2 className="font-semibold text-[#1C1B22] mb-4">Metadata</h2><div className="space-y-3 text-sm"><Info label="Folder path" value={document.folder_path} /><Info label="Last verified" value={document.last_verified || '—'} /><Info label="Binding status" value={document.binding_status} /><Info label="RAG tags" value={document.rag_tags?.join(', ') || '—'} /></div></section>
          <section className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E4DC] p-6"><h2 className="font-semibold text-[#1C1B22] mb-4">Sections and chunks</h2>{document.sections?.length ? <div className="space-y-3">{document.sections.map((section) => <div key={`${section.section_number}-${section.page_number}`} className="border-b border-[#F5F3EE] pb-3"><div className="text-sm font-medium text-[#1C1B22]">Section {section.section_number}: {section.section_title}</div><div className="text-xs text-[#7C7B85] mt-1">Page {section.page_number} · {section.chunk_count} chunks</div></div>)}</div> : <p className="text-sm text-[#7C7B85]">No sections have been extracted yet.</p>}</section>
        </div>
        {document.chunks?.length ? <section className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mt-6"><h2 className="font-semibold text-[#1C1B22] mb-4">Extracted chunks</h2><div className="space-y-4">{document.chunks.map((chunk) => <div key={chunk.chunk_id} className="border-l-2 border-violet-300 pl-4"><div className="text-xs font-mono-code text-[#7C7B85]">{chunk.chunk_id} · Page {chunk.page_number}</div><p className="text-sm text-[#1C1B22] mt-1 whitespace-pre-wrap">{chunk.chunk_text}</p></div>)}</div></section> : null}
      </>}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4"><span className="text-[#7C7B85]">{label}</span><span className="text-right font-medium text-[#1C1B22]">{value}</span></div>;
}

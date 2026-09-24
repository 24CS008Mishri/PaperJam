import { useEffect, useState } from 'react';
import { DocumentSummary, getDocumentStatus, uploadDocument, UploadMetadata } from '../../api/documents';

interface Props {
  onNavigate: (page: string, documentId?: string) => void;
}

const stages = [
  ['extracting', 'Extracting', 'Reading page text with PyMuPDF'],
  ['chunking', 'Chunking', 'Creating section-aware chunks'],
  ['embedding', 'Embedding', 'Preparing vector embeddings'],
  ['indexed', 'Indexed', 'Available for filtered RAG retrieval'],
];

export default function UploadDocument({ onNavigate }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<UploadMetadata>({ binding_status: 'synthetic_demo_non_binding' });
  const [document, setDocument] = useState<DocumentSummary | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!document || document.status === 'ready' || document.status === 'error') return;
    const timer = window.setInterval(() => {
      getDocumentStatus(document.document_id).then(setDocument).catch((reason: Error) => setError(reason.message));
    }, 1200);
    return () => window.clearInterval(timer);
  }, [document]);

  const chooseFile = (nextFile?: File) => {
    if (!nextFile) return;
    if (nextFile.type !== 'application/pdf') {
      setError('Only PDF files can be sent to the regulatory ingestion pipeline.');
      return;
    }
    setError('');
    setFile(nextFile);
  };

  const submit = async () => {
    if (!file) {
      setError('Choose a PDF before uploading.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const response = await uploadDocument(file, metadata);
      const initial = await getDocumentStatus(response.document_id);
      setDocument(initial);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const updateMetadata = (key: keyof UploadMetadata, value: string) => setMetadata((current) => ({ ...current, [key]: value }));
  const activeStage = document?.processing_stage || '';
  const stageIndex = stages.findIndex(([key]) => key === activeStage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6"><button onClick={() => onNavigate('admin-knowledge')} className="text-sm text-[#7C7B85] hover:text-[#6D28D9]">← Knowledge Library</button><span className="text-[#D0CCE0]">/</span><span className="text-sm text-[#1C1B22] font-medium">Upload Document</span></div>
      <div className="mb-6"><h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Upload Document</h1><p className="text-sm text-[#7C7B85] mt-0.5">Ingest a PDF into the metadata-first regulatory knowledge base.</p></div>

      <div className="space-y-5">
        <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }} className={`relative rounded-2xl border-2 border-dashed p-12 text-center ${file ? 'border-emerald-300 bg-emerald-50' : 'border-[#D0CCE0] bg-white hover:border-violet-300'}`}>
          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 text-sm font-bold text-violet-700">PDF</div>
          <div className="font-semibold text-[#1C1B22] mb-1">{file ? file.name : 'Drop a regulatory PDF here'}</div>
          <div className="text-sm text-[#7C7B85] mb-4">{file ? 'Ready for metadata and ingestion' : 'or click to browse'}</div>
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="application/pdf,.pdf" onChange={(event) => chooseFile(event.target.files?.[0])} />
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h2 className="font-semibold text-[#1C1B22] mb-4">Document Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([
              ['category', 'Category', 'NOC'], ['subcategory', 'Subcategory', 'FIRE'],
              ['authority', 'Authority', 'Fire Safety Department'], ['jurisdiction', 'Jurisdiction', 'All India'],
              ['document_type', 'Document type', 'Guideline'], ['businesses', 'Businesses', 'Food, Manufacturing'],
              ['rag_tags', 'RAG tags', 'fire, safety, noc'], ['version', 'Version', '1.0'],
            ] as const).map(([key, label, placeholder]) => <label key={key} className="text-xs font-semibold text-[#1C1B22] uppercase tracking-wide">{label}<input value={metadata[key] || ''} onChange={(event) => updateMetadata(key, event.target.value)} placeholder={placeholder} className="mt-1.5 w-full normal-case tracking-normal bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-violet-300" /></label>)}
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm text-[#1C1B22]"><input type="checkbox" checked={metadata.binding_status === 'synthetic_demo_non_binding'} onChange={(event) => updateMetadata('binding_status', event.target.checked ? 'synthetic_demo_non_binding' : 'official')} /> Mark as synthetic, non-binding demonstration data</label>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{error}</div>}

        {document && <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6"><div className="flex items-center justify-between mb-5"><div><h2 className="font-semibold text-[#1C1B22]">Ingestion status</h2><p className="text-xs text-[#7C7B85] mt-1">{document.document_id}</p></div><span className="text-xs font-semibold text-violet-700 uppercase">{document.status}</span></div><div className="space-y-3">{stages.map(([key, label, description], index) => { const complete = document.processing_stage === 'indexed' || index < stageIndex; const current = key === document.processing_stage; return <div key={key} className="flex items-center gap-3"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${complete ? 'bg-emerald-100 text-emerald-700' : current ? 'bg-violet-100 text-violet-700' : 'bg-[#F5F3EE] text-[#B0ADB8]'}`}>{complete ? '✓' : index + 1}</div><div><div className="text-sm font-medium text-[#1C1B22]">{label}</div><div className="text-xs text-[#7C7B85]">{description}</div></div></div>; })}</div>{document.status === 'ready' && <button onClick={() => onNavigate('admin-document-detail', document.document_id)} className="w-full mt-5 bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold">View Document</button>}</div>}

        {!document && <button disabled={uploading} onClick={submit} className="w-full bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#5B21B6] disabled:opacity-50">{uploading ? 'Uploading...' : 'Upload and ingest PDF'}</button>}
      </div>
    </div>
  );
}

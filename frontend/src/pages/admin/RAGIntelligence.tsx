import { useEffect, useState } from 'react';
import { DocumentSummary, getDocuments } from '../../api/documents';

export default function RAGIntelligence() {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [activeTab, setActiveTab] = useState<'activity' | 'sources'>('sources');
  const [error, setError] = useState('');

  useEffect(() => { getDocuments().then(setDocuments).catch((reason: Error) => setError(reason.message)); }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6"><div><h1 className="font-display text-2xl font-semibold text-[#1C1B22]">RAG & Intelligence</h1><p className="text-sm text-[#7C7B85] mt-0.5">Live regulatory sources available to the application workflow.</p></div><div className="bg-white border border-[#E8E4DC] rounded-xl px-4 py-2.5 text-center"><div className="font-display text-lg font-bold text-[#1C1B22]">{documents.filter((document) => document.processing_stage === 'indexed').length}</div><div className="text-[10px] text-[#7C7B85]">Indexed sources</div></div></div>
      <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-amber-50 border border-violet-200 rounded-2xl p-6 mb-6"><div className="text-sm font-semibold text-[#1C1B22] mb-4">RAG Pipeline</div><div className="grid grid-cols-4 gap-3">{['Question', 'Metadata filter', 'Top chunks', 'Answer + sources'].map((stage, index) => <div key={stage} className="rounded-xl p-3 text-center border border-violet-200 bg-white/70"><div className="text-xl font-display text-violet-700 mb-1">{index + 1}</div><div className="text-xs font-semibold text-[#1C1B22]">{stage}</div></div>)}</div></div>
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-sm text-red-700">Could not load RAG sources: {error}</div>}
      <div className="flex gap-1 bg-[#F5F3EE] p-1 rounded-xl mb-6 w-fit"><button onClick={() => setActiveTab('activity')} className={`px-5 py-2 rounded-lg text-sm font-medium ${activeTab === 'activity' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`}>RAG Activity</button><button onClick={() => setActiveTab('sources')} className={`px-5 py-2 rounded-lg text-sm font-medium ${activeTab === 'sources' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`}>Sources</button></div>
      {activeTab === 'activity' ? <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 text-sm text-[#7C7B85]">RAG activity will appear here as application users ask regulatory questions.</div> : <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden"><div className="px-6 py-4 border-b border-[#E8E4DC] text-sm font-semibold text-[#1C1B22]">RAG Sources ({documents.length})</div><table className="w-full"><thead><tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">{['Document', 'Category', 'Authority', 'Index Status', 'Sections'].map((heading) => <th key={heading} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{heading}</th>)}</tr></thead><tbody>{documents.map((document) => <tr key={document.document_id} className="border-b border-[#F5F3EE] last:border-0"><td className="px-5 py-3.5 text-sm font-medium text-[#1C1B22]">{document.title}</td><td className="px-5 py-3.5 text-sm text-[#7C7B85]">{document.category} / {document.subcategory}</td><td className="px-5 py-3.5 text-sm text-[#7C7B85]">{document.authority || '—'}</td><td className="px-5 py-3.5 text-xs text-[#7C7B85]">{document.processing_stage}</td><td className="px-5 py-3.5 text-xs text-[#7C7B85]">{document.sections?.length || 0}</td></tr>)}</tbody></table>{!documents.length && <div className="p-10 text-center text-sm text-[#7C7B85]">No indexed sources yet.</div>}</div>}
    </div>
  );
}

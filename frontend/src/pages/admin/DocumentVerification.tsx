import { useEffect, useState } from 'react';
import { DocumentSummary, getDocuments } from '../../api/documents';
import { StatusBadge } from '../../components/StatusBadge';

type FilterStatus = 'All' | 'Verified' | 'Under Review';

export default function DocumentVerification() {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [selected, setSelected] = useState<DocumentSummary | null>(null);
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { getDocuments().then(setDocuments).catch((reason: Error) => setError(reason.message)); }, []);

  const statusFor = (document: DocumentSummary) => document.status === 'ready' ? 'Verified' : 'Under Review';
  const filtered = documents.filter((document) => filter === 'All' || statusFor(document) === filter);
  const count = (status: FilterStatus) => status === 'All' ? documents.length : documents.filter((document) => statusFor(document) === status).length;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-6"><h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Document Verification</h1><p className="text-sm text-[#7C7B85] mt-0.5">Review documents currently stored by the regulatory API.</p></div>
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-sm text-red-700">Could not load documents: {error}</div>}
      <div className="grid grid-cols-3 gap-3 mb-6">{(['All', 'Verified', 'Under Review'] as FilterStatus[]).map((status) => <button key={status} onClick={() => setFilter(status)} className={`rounded-2xl p-4 text-left border ${filter === status ? 'bg-[#1C1B22] text-white' : 'bg-white border-[#E8E4DC]'}`}><div className="text-2xl font-display font-bold">{count(status)}</div><div className="text-xs mt-0.5 opacity-80">{status}</div></button>)}</div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">{filtered.map((document) => <button key={document.document_id} onClick={() => setSelected(document)} className={`w-full text-left rounded-xl border p-4 transition-all ${selected?.document_id === document.document_id ? 'border-violet-300 bg-violet-50' : 'border-[#E8E4DC] bg-white hover:border-violet-200'}`}><div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">PDF</div><div className="flex-1 min-w-0"><div className="text-xs font-semibold text-[#1C1B22] truncate mb-1">{document.title}</div><div className="text-[10px] text-[#7C7B85] mb-2">{document.authority || 'No authority set'}</div><StatusBadge status={statusFor(document)} /></div></div></button>)}</div>
        <div className="col-span-2">{selected ? <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6"><div className="text-xs font-mono-code text-violet-600 mb-1">{selected.document_id}</div><h2 className="font-display text-xl font-semibold text-[#1C1B22] mb-2">{selected.title}</h2><StatusBadge status={statusFor(selected)} /><div className="grid grid-cols-3 gap-3 my-5">{[['Category', selected.category], ['Subcategory', selected.subcategory], ['Authority', selected.authority], ['Type', selected.document_type], ['Version', selected.version], ['Binding', selected.binding_status]].map(([label, value]) => <div key={label} className="bg-[#FEFCF8] rounded-xl p-2.5 border border-[#E8E4DC]"><div className="text-[10px] text-[#7C7B85]">{label}</div><div className="text-xs font-medium text-[#1C1B22] mt-1">{value || '—'}</div></div>)}</div><textarea value={remark} onChange={(event) => setRemark(event.target.value)} rows={3} className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none mb-4" placeholder="Add verification notes..." /><div className="flex gap-2"><button className="flex-1 bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-semibold">Verify</button><button className="flex-1 bg-amber-500 text-white rounded-xl py-2.5 text-sm font-semibold">Request Correction</button><button className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold">Reject</button></div></div> : <div className="bg-white rounded-2xl border border-[#E8E4DC] h-64 flex items-center justify-center text-sm text-[#7C7B85]">Select a document to verify</div>}</div>
      </div>
    </div>
  );
}

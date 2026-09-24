import { documents } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

interface Props {
  onNavigate: (page: string) => void;
}

const doc = documents[0];

const knowledgeChecks = [
  { label: 'Text Extracted', done: true },
  { label: 'Chunks Created', done: true, detail: '42 semantic chunks' },
  { label: 'Indexed', done: true, detail: 'Vector store: ChromaDB' },
  { label: 'RAG Ready', done: true },
];

export default function DocumentDetail({ onNavigate }: Props) {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={() => onNavigate('admin-knowledge')} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Knowledge Library
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* Document preview / main */}
        <div className="col-span-2 space-y-4">
          {/* Doc header */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
            <div className="flex items-start gap-4">
              {/* Physical file visual */}
              <div className="relative flex-shrink-0">
                <div className="absolute top-1 left-1 w-20 h-24 rounded-lg bg-violet-100 border border-violet-200" />
                <div className="absolute top-0.5 left-0.5 w-20 h-24 rounded-lg bg-violet-200 border border-violet-300" />
                <div className="relative w-20 h-24 rounded-lg bg-white border-2 border-violet-400 shadow-md flex flex-col items-center justify-center gap-1 p-2">
                  <span className="text-2xl">📄</span>
                  <div className="text-[8px] text-violet-600 font-mono-code text-center leading-tight">PDF</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono-code text-violet-600 mb-1">{doc.id}</div>
                    <h1 className="font-display text-xl font-semibold text-[#1C1B22] mb-2">{doc.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={doc.status} />
                      <span className="text-xs bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-full">{doc.type}</span>
                      <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">{doc.version}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
            <h3 className="font-semibold text-[#1C1B22] mb-4">Document Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Authority', val: doc.authority },
                { label: 'Type', val: doc.type },
                { label: 'Version', val: doc.version },
                { label: 'Effective Date', val: doc.effectiveDate },
                { label: 'Folder', val: doc.folder },
                { label: 'File Size', val: doc.size },
                { label: 'Source', val: 'labour.gov.in/acts' },
                { label: 'Jurisdiction', val: 'All India' },
              ].map(f => (
                <div key={f.label} className="bg-[#FEFCF8] rounded-xl p-3 border border-[#E8E4DC]">
                  <div className="text-[10px] text-[#7C7B85] uppercase tracking-wide mb-1">{f.label}</div>
                  <div className="text-sm font-medium text-[#1C1B22]">{f.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Document preview */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1C1B22]">Document Preview</span>
              <button className="text-xs text-violet-600 font-medium">Open full screen ↗</button>
            </div>
            <div className="p-6">
              <div className="bg-[#FEFCF8] rounded-xl border border-[#E8E4DC] p-6 space-y-4 font-mono-code text-xs text-[#7C7B85]">
                <div className="text-center text-sm font-semibold text-[#1C1B22] mb-4">{doc.name}</div>
                <div className="text-center text-xs text-[#7C7B85] mb-6">As amended up to {doc.effectiveDate}</div>
                {[
                  'CHAPTER I — PRELIMINARY',
                  '1. Short title, extent and commencement — (1) This Act may be called the Factories Act, 1948. (2) It extends to the whole of India.',
                  '2. Interpretation — In this Act, unless there is anything repugnant in the subject or context...',
                  '(m) "factory" means any premises including the precincts thereof—',
                  '  (i) whereon ten or more workers are working, or were working on any day of the preceding twelve months, and in any part of which a manufacturing process is being carried on with the aid of power...',
                ].map((line, i) => (
                  <div key={i} className={`${line.startsWith('CHAPTER') ? 'font-bold text-[#1C1B22] text-xs' : 'text-[10px] leading-relaxed'}`}>{line}</div>
                ))}
                <div className="text-[10px] text-[#B0ADB8] text-center pt-4">— Page 1 of 84 —</div>
              </div>
            </div>
          </div>

          {/* Knowledge Usage */}
          <div className="bg-gradient-to-br from-violet-50 to-amber-50 rounded-2xl border border-violet-200 p-6">
            <h3 className="font-semibold text-[#1C1B22] mb-1">Knowledge Usage</h3>
            <div className="text-3xl font-display font-bold text-[#6D28D9] mb-1">{doc.usage}</div>
            <div className="text-sm text-[#7C7B85] mb-4">RAG responses sourced from this document</div>
            <div className="space-y-2">
              {[
                'What documents are needed for factory license?',
                'Penalty for safety violation under Factories Act',
                'Working hours allowed in factories',
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-[#E8E4DC] text-xs text-[#1C1B22]">
                  <span className="text-violet-600 font-mono-code mr-2">Q:</span>{q}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
            <div className="text-sm font-semibold text-[#1C1B22] mb-3">Actions</div>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 justify-center bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5B21B6]">
                <span>👁</span> Preview
              </button>
              <button className="w-full flex items-center gap-2 justify-center bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#E8E4DC]">
                <span>⬇</span> Download
              </button>
              <button className="w-full flex items-center gap-2 justify-center bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#E8E4DC]">
                <span>🔄</span> Re-index
              </button>
              <button className="w-full flex items-center gap-2 justify-center bg-amber-50 text-amber-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-amber-100 border border-amber-200">
                <span>📤</span> Replace Version
              </button>
              <button className="w-full flex items-center gap-2 justify-center bg-red-50 text-red-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-red-100 border border-red-200">
                <span>🗃</span> Archive
              </button>
            </div>
          </div>

          {/* Knowledge status */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
            <div className="text-sm font-semibold text-[#1C1B22] mb-4">Knowledge Status</div>
            <div className="space-y-3">
              {knowledgeChecks.map(k => (
                <div key={k.label} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#1C1B22]">{k.label}</div>
                    {k.detail && <div className="text-[10px] text-[#7C7B85]">{k.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
            <div className="text-sm font-semibold text-[#1C1B22] mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {['Factory', 'Manufacturing', 'Labour Law', 'Safety', 'Central Act'].map(tag => (
                <span key={tag} className="text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

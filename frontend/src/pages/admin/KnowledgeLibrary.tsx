import { useEffect, useMemo, useState } from 'react';
import { DocumentSummary, getDocuments } from '../../api/documents';
import { StatusBadge } from '../../components/StatusBadge';

interface Props {
  onNavigate: (page: string, documentId?: string) => void;
}

const categoryNames = [
  'REGISTRATIONS', 'LICENSES', 'PERMISSIONS', 'NOC',
  'INSPECTIONS', 'RENEWALS', 'ENVIRONMENT',
  'TECH_DATA_CYBERSECURITY', 'PRODUCT_COMPLIANCE', 'LABOUR',
  'INTELLECTUAL_PROPERTY', 'SCHEMES_INCENTIVES',
];

const categoryStyles = [
  ['#7C3AED', '#F5F3FF', '#DDD6FE'], ['#D97706', '#FFFBEB', '#FDE68A'],
  ['#2563EB', '#EFF6FF', '#BFDBFE'], ['#E11D48', '#FFF1F2', '#FECDD3'],
  ['#0F766E', '#F0FDFA', '#99F6E4'], ['#EA580C', '#FFF7ED', '#FED7AA'],
  ['#059669', '#ECFDF5', '#A7F3D0'], ['#6D28D9', '#EDE9FE', '#C4B5FD'],
  ['#B45309', '#FFFBEB', '#FCD34D'], ['#475569', '#F8FAFC', '#CBD5E1'],
  ['#9333EA', '#FAF5FF', '#E9D5FF'], ['#CA8A04', '#FEFCE8', '#FDE68A'],
] as const;

interface FolderView {
  name: string;
  files: DocumentSummary[];
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

function FolderCard({ folder, onClick }: { folder: FolderView; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative cursor-pointer group text-left w-full" style={{ paddingTop: '28px' }}>
      <div className="absolute top-0 left-4 right-4 flex justify-center" style={{ height: '36px', zIndex: 1 }}>
        {[0, 1, 2].map((layer) => (
          <div key={layer} className="absolute rounded-lg border shadow-sm" style={{
            backgroundColor: folder.bgColor,
            borderColor: folder.borderColor,
            transform: `translateY(${layer * 4}px) rotate(${[-3, 0, 3][layer]}deg)`,
            height: `${28 - layer * 4}px`,
            left: `${8 + layer * 12}px`,
            right: `${8 + (2 - layer) * 12}px`,
          }} />
        ))}
      </div>
      <div className="relative rounded-2xl border-2 p-5 transition-all group-hover:shadow-xl group-hover:-translate-y-1" style={{
        backgroundColor: folder.bgColor,
        borderColor: folder.borderColor,
        zIndex: 2,
        boxShadow: `0 4px 16px 0 ${folder.accentColor}18`,
      }}>
        <div className="absolute -top-px left-5 px-4 py-1 rounded-t-xl text-[10px] font-semibold bg-white/80" style={{ color: folder.accentColor }}>
          {folder.files.length} files
        </div>
        <h3 className="font-display text-base font-semibold mt-2 mb-1 leading-tight" style={{ color: folder.accentColor }}>{folder.name}</h3>
        <div className="flex items-center justify-between">
          <div className="text-xs text-[#7C7B85]">{folder.files.length ? 'Live from regulatory API' : 'No documents yet'}</div>
          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100" style={{ color: folder.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" /></svg>
        </div>
      </div>
    </button>
  );
}

export default function KnowledgeLibrary({ onNavigate }: Props) {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [viewMode, setViewMode] = useState<'folder' | 'list'>('folder');
  const [selectedFolder, setSelectedFolder] = useState<FolderView | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDocuments = () => {
    setLoading(true);
    getDocuments().then(setDocuments).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };

  useEffect(loadDocuments, []);

  const folders = useMemo<FolderView[]>(() => categoryNames.map((name, index) => {
    const [accentColor, bgColor, borderColor] = categoryStyles[index];
    const files = documents.filter((document) => document.category === name || document.folder_path.startsWith(name));
    return { name, files, accentColor, bgColor, borderColor };
  }), [documents]);

  const filteredFolders = folders.filter((folder) => folder.name.toLowerCase().includes(search.toLowerCase()));
  const filteredDocuments = documents.filter((document) => [document.title, document.category, document.subcategory, document.authority]
    .some((value) => value.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-display text-3xl font-semibold text-[#1C1B22]">Knowledge Library</h1>
            <p className="text-[#7C7B85] mt-1 text-base italic font-display">Your regulatory desk, neatly organized.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#F5F3EE] rounded-xl p-1">
              <button onClick={() => setViewMode('folder')} className={`p-2 rounded-lg ${viewMode === 'folder' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`} title="Folder view">▦</button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`} title="List view">☷</button>
            </div>
            <button onClick={() => onNavigate('admin-upload')} className="flex items-center gap-2 bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">Upload</button>
          </div>
        </div>
        <div className="relative max-w-md mt-4">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search regulations, acts, circulars..." className="w-full pl-4 pr-4 py-3 text-sm bg-white border border-[#E8E4DC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm" />
        </div>
      </div>

      <div className="flex gap-6 mb-8 pb-6 border-b border-[#E8E4DC]">
        <div><div className="font-display text-2xl font-bold text-[#1C1B22]">{documents.length}</div><div className="text-xs text-[#7C7B85]">Documents from API</div></div>
        <div><div className="font-display text-2xl font-bold text-[#1C1B22]">{folders.filter((folder) => folder.files.length > 0).length}</div><div className="text-xs text-[#7C7B85]">Active folders</div></div>
        <div><div className="font-display text-2xl font-bold text-[#1C1B22]">{documents.filter((document) => document.processing_stage === 'indexed').length}</div><div className="text-xs text-[#7C7B85]">RAG indexed</div></div>
      </div>

      {loading && <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 text-sm text-[#7C7B85]">Loading regulatory documents...</div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-sm text-red-700">Could not load the regulatory API: {error}</div>}

      {!loading && viewMode === 'folder' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredFolders.map((folder) => <FolderCard key={folder.name} folder={folder} onClick={() => setSelectedFolder(folder)} />)}
        </div>
      )}

      {!loading && viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
          <table className="w-full"><thead><tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
            {['Document', 'Category', 'Authority', 'Type', 'Version', 'Status'].map((heading) => <th key={heading} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{heading}</th>)}
          </tr></thead><tbody>
            {filteredDocuments.map((document) => <tr key={document.document_id} onClick={() => onNavigate('admin-document-detail', document.document_id)} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] cursor-pointer">
              <td className="px-5 py-3.5 text-sm font-medium text-[#1C1B22]">{document.title}</td><td className="px-5 py-3.5 text-sm text-[#7C7B85]">{document.category}</td><td className="px-5 py-3.5 text-sm text-[#7C7B85]">{document.authority || '—'}</td><td className="px-5 py-3.5 text-sm text-[#7C7B85]">{document.document_type}</td><td className="px-5 py-3.5 text-xs text-[#7C7B85]">{document.version}</td><td className="px-5 py-3.5"><StatusBadge status={document.status === 'ready' ? 'Verified' : 'Under Review'} /></td>
            </tr>)}
          </tbody></table>
          {!filteredDocuments.length && <div className="p-10 text-center text-sm text-[#7C7B85]">No documents have been ingested yet.</div>}
        </div>
      )}

      {selectedFolder && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="p-6 rounded-t-3xl" style={{ backgroundColor: selectedFolder.bgColor, borderBottom: `1px solid ${selectedFolder.borderColor}` }}>
              <div className="flex items-center justify-between"><div><div className="text-xs font-medium mb-1" style={{ color: selectedFolder.accentColor }}>Knowledge Folder</div><h2 className="font-display text-xl font-semibold text-[#1C1B22]">{selectedFolder.name}</h2><div className="text-sm text-[#7C7B85] mt-1">{selectedFolder.files.length} documents</div></div><button onClick={() => setSelectedFolder(null)} className="p-2 rounded-xl hover:bg-black/5 text-[#7C7B85]">×</button></div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {selectedFolder.files.map((document) => <button key={document.document_id} onClick={() => onNavigate('admin-document-detail', document.document_id)} className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#E8E4DC] bg-[#FEFCF8] hover:bg-white text-left"><div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm">PDF</div><div className="flex-1 min-w-0"><div className="text-sm font-medium text-[#1C1B22] truncate">{document.title}</div><div className="text-xs text-[#7C7B85]">{document.subcategory || 'Uncategorized'} · {document.version}</div></div><StatusBadge status={document.status === 'ready' ? 'Verified' : 'Under Review'} /></button>)}
              {!selectedFolder.files.length && <div className="text-sm text-[#7C7B85]">No documents in this folder yet.</div>}
            </div>
            <div className="p-4 border-t border-[#E8E4DC]"><button onClick={() => onNavigate('admin-upload')} className="w-full bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5B21B6]">Upload to Folder</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

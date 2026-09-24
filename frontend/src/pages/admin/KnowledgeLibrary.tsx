import { useState } from 'react';
import { knowledgeFolders, documents } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

interface Props {
  onNavigate: (page: string) => void;
}

function FolderCard({ folder, onClick }: { folder: typeof knowledgeFolders[0]; onClick: () => void }) {
  const { name, files, lastUpdated, accentColor, borderColor, bgColor, docColors } = folder;

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ paddingTop: '28px' }}
    >
      {/* Layered document previews peeking from top */}
      <div className="absolute top-0 left-4 right-4 flex gap-2 justify-center" style={{ height: '36px', zIndex: 1 }}>
        {docColors.map((color, i) => (
          <div
            key={i}
            className="rounded-lg border shadow-sm flex-1"
            style={{
              backgroundColor: color,
              borderColor: borderColor,
              transform: `translateY(${i * 4}px) rotate(${[-3, 0, 3][i] ?? 0}deg)`,
              height: `${28 - i * 4}px`,
              position: 'absolute',
              left: `${8 + i * 12}px`,
              right: `${8 + (docColors.length - 1 - i) * 12}px`,
            }}
          >
            {/* Mini document lines */}
            <div className="p-1.5 space-y-1">
              <div className="h-0.5 rounded-full opacity-40" style={{ backgroundColor: accentColor, width: '60%' }} />
              <div className="h-0.5 rounded-full opacity-30" style={{ backgroundColor: accentColor, width: '80%' }} />
              <div className="h-0.5 rounded-full opacity-20" style={{ backgroundColor: accentColor, width: '45%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main folder card */}
      <div
        className="relative rounded-2xl border-2 p-5 transition-all group-hover:shadow-xl group-hover:-translate-y-1"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          zIndex: 2,
          boxShadow: `0 4px 16px 0 ${accentColor}18`,
        }}
      >
        {/* Folder tab at top */}
        <div
          className="absolute -top-px left-5 px-4 py-1 rounded-t-xl text-[10px] font-semibold"
          style={{ backgroundColor: accentColor, color: 'white' }}
        >
          {files} files
        </div>

        {/* Stationery decoration: corner clip */}
        <div className="absolute top-3 right-3 opacity-30">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 2C8 2 4 2 4 6V14C4 18 8 18 8 18C8 18 12 18 12 14V6C12 2 8 2 8 2Z" stroke={accentColor} strokeWidth="1.5" fill="none"/>
            <line x1="2" y1="6" x2="14" y2="6" stroke={accentColor} strokeWidth="1.5"/>
            <line x1="2" y1="14" x2="14" y2="14" stroke={accentColor} strokeWidth="1.5"/>
          </svg>
        </div>

        <h3 className="font-display text-base font-semibold mt-2 mb-1 leading-tight pr-6" style={{ color: accentColor }}>
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-xs text-[#7C7B85]">Updated {lastUpdated}</div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeLibrary({ onNavigate }: Props) {
  const [viewMode, setViewMode] = useState<'folder' | 'list'>('folder');
  const [selectedFolder, setSelectedFolder] = useState<typeof knowledgeFolders[0] | null>(null);
  const [search, setSearch] = useState('');

  const filteredFolders = knowledgeFolders.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-display text-3xl font-semibold text-[#1C1B22]">Knowledge Library</h1>
            <p className="text-[#7C7B85] mt-1 text-base italic font-display">Your regulatory desk, neatly organized.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#F5F3EE] rounded-xl p-1">
              <button onClick={() => setViewMode('folder')} className={`p-2 rounded-lg transition-all ${viewMode === 'folder' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`} title="Folder view">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`} title="List view">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
            <button onClick={() => onNavigate('admin-upload')} className="flex items-center gap-2 bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mt-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search regulations, acts, circulars..."
            className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-[#E8E4DC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm"
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex gap-6 mb-8 pb-6 border-b border-[#E8E4DC]">
        {[
          { label: 'Total Documents', val: knowledgeFolders.reduce((s, f) => s + f.files, 0).toLocaleString() },
          { label: 'Folders', val: knowledgeFolders.length.toString() },
          { label: 'RAG Indexed', val: '892' },
          { label: 'Last Upload', val: 'Sep 22, 2026' },
        ].map(s => (
          <div key={s.label}>
            <div className="font-display text-2xl font-bold text-[#1C1B22]">{s.val}</div>
            <div className="text-xs text-[#7C7B85]">{s.label}</div>
          </div>
        ))}
      </div>

      {viewMode === 'folder' ? (
        <>
          {/* Asymmetric masonry-inspired folder grid */}
          <div className="grid grid-cols-12 gap-5">
            {/* Row 1: two wide, one narrow */}
            <div className="col-span-5">
              <FolderCard folder={filteredFolders[0]} onClick={() => setSelectedFolder(filteredFolders[0])} />
            </div>
            <div className="col-span-4">
              <FolderCard folder={filteredFolders[1]} onClick={() => setSelectedFolder(filteredFolders[1])} />
            </div>
            <div className="col-span-3">
              <FolderCard folder={filteredFolders[2]} onClick={() => setSelectedFolder(filteredFolders[2])} />
            </div>

            {/* Row 2: narrow, wide, narrow */}
            <div className="col-span-3">
              <FolderCard folder={filteredFolders[3]} onClick={() => setSelectedFolder(filteredFolders[3])} />
            </div>
            <div className="col-span-6">
              <FolderCard folder={filteredFolders[4]} onClick={() => setSelectedFolder(filteredFolders[4])} />
            </div>
            <div className="col-span-3">
              <FolderCard folder={filteredFolders[5]} onClick={() => setSelectedFolder(filteredFolders[5])} />
            </div>

            {/* Row 3: two equal */}
            {filteredFolders.slice(6).map(f => (
              <div key={f.id} className="col-span-6">
                <FolderCard folder={f} onClick={() => setSelectedFolder(f)} />
              </div>
            ))}
          </div>

          {/* Folder detail drawer */}
          {selectedFolder && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end md:items-center justify-end md:justify-center p-4 md:p-6">
              <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
                <div
                  className="p-6 rounded-t-3xl"
                  style={{ backgroundColor: selectedFolder.bgColor, borderBottom: `1px solid ${selectedFolder.borderColor}` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: selectedFolder.accentColor }}>Knowledge Folder</div>
                      <h2 className="font-display text-xl font-semibold text-[#1C1B22]">{selectedFolder.name}</h2>
                      <div className="text-sm text-[#7C7B85] mt-1">{selectedFolder.files} files · Updated {selectedFolder.lastUpdated}</div>
                    </div>
                    <button onClick={() => setSelectedFolder(null)} className="p-2 rounded-xl hover:bg-black/5 text-[#7C7B85]">✕</button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
                  <div className="space-y-3">
                    {documents.slice(0, 4).map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E4DC] bg-[#FEFCF8] hover:bg-white cursor-pointer transition-all" onClick={() => { setSelectedFolder(null); onNavigate('admin-document-detail'); }}>
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm flex-shrink-0">📄</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#1C1B22] truncate">{doc.name}</div>
                          <div className="text-xs text-[#7C7B85]">{doc.type} · {doc.version}</div>
                        </div>
                        <StatusBadge status={doc.status} />
                      </div>
                    ))}
                    <button className="w-full text-sm text-violet-600 font-medium py-2 hover:text-violet-800">View all {selectedFolder.files} files →</button>
                  </div>
                </div>

                <div className="p-4 border-t border-[#E8E4DC] flex gap-3">
                  <button onClick={() => onNavigate('admin-upload')} className="flex-1 bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5B21B6]">Upload to Folder</button>
                  <button onClick={() => setSelectedFolder(null)} className="flex-1 bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#E8E4DC]">Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="text-sm font-semibold text-[#1C1B22]">All Documents</div>
            <div className="text-xs text-[#7C7B85]">{documents.length} documents shown</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
                {['Document', 'Folder', 'Authority', 'Type', 'Version', 'Status', 'RAG Usage'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} onClick={() => onNavigate('admin-document-detail')} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm flex-shrink-0">📄</div>
                      <div className="text-sm font-medium text-[#1C1B22]">{doc.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{doc.folder}</td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{doc.authority}</td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{doc.type}</td>
                  <td className="px-5 py-3.5 text-xs font-mono-code text-[#7C7B85]">{doc.version}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={doc.status} /></td>
                  <td className="px-5 py-3.5">
                    {doc.indexed ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-xs text-[#1C1B22]">{doc.usage} uses</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#B0ADB8]">Not indexed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

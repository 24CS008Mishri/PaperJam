import { useState } from 'react';
import { knowledgeFolders } from '../../data';

type UploadStage = 'idle' | 'uploading' | 'extracting' | 'chunking' | 'indexing' | 'ready';

const stages: { key: UploadStage; label: string; desc: string }[] = [
  { key: 'uploading', label: 'Uploading', desc: 'Transferring file to server' },
  { key: 'extracting', label: 'Text Extraction', desc: 'Parsing document content' },
  { key: 'chunking', label: 'Chunking', desc: 'Splitting into semantic chunks' },
  { key: 'indexing', label: 'Indexing', desc: 'Building vector embeddings' },
  { key: 'ready', label: 'Knowledge Ready', desc: 'Available for RAG queries' },
];

const stageOrder: UploadStage[] = ['uploading', 'extracting', 'chunking', 'indexing', 'ready'];

interface Props {
  onNavigate: (page: string) => void;
}

export default function UploadDocument({ onNavigate }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [stage, setStage] = useState<UploadStage>('idle');
  const [useForRAG, setUseForRAG] = useState(true);

  const simulateUpload = () => {
    if (!fileName) {
      setFileName('FSSAI_Licensing_Regulations_2024.pdf');
    }
    let i = 0;
    const advance = () => {
      if (i < stageOrder.length) {
        setStage(stageOrder[i]);
        i++;
        setTimeout(advance, 1000);
      }
    };
    setStage('uploading');
    setTimeout(advance, 800);
  };

  const stageIdx = stageOrder.indexOf(stage);
  const isProcessing = stage !== 'idle' && stage !== 'ready';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => onNavigate('admin-knowledge')} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Knowledge Library
        </button>
        <span className="text-[#D0CCE0]">/</span>
        <span className="text-sm text-[#1C1B22] font-medium">Upload Document</span>
      </div>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Upload Document</h1>
        <p className="text-sm text-[#7C7B85] mt-0.5">Add regulatory documents to the Knowledge Library</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Upload area */}
        <div className="col-span-2 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setFileName(f.name); }}
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-violet-400 bg-violet-50'
                : fileName
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-[#D0CCE0] bg-white hover:border-violet-300 hover:bg-violet-50'
            }`}
          >
            {fileName ? (
              <div>
                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 text-3xl">📄</div>
                <div className="font-semibold text-[#1C1B22] mb-1">{fileName}</div>
                <div className="text-sm text-emerald-600 mb-4">File ready to upload</div>
                <button onClick={() => setFileName('')} className="text-xs text-[#7C7B85] underline">Remove file</button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#F5F3EE] flex items-center justify-center mx-auto mb-4 text-3xl">📁</div>
                <div className="font-semibold text-[#1C1B22] mb-1">Drop your document here</div>
                <div className="text-sm text-[#7C7B85] mb-4">or click to browse</div>
                <div className="inline-flex items-center gap-4 text-xs text-[#B0ADB8]">
                  <span className="bg-[#F5F3EE] px-3 py-1 rounded-full">PDF</span>
                  <span className="bg-[#F5F3EE] px-3 py-1 rounded-full">DOCX</span>
                  <span className="bg-[#F5F3EE] px-3 py-1 rounded-full">TXT</span>
                </div>
              </div>
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.docx,.txt"
              onChange={e => { const f = e.target.files?.[0]; if (f) setFileName(f.name); }}
            />
          </div>

          {/* Metadata form */}
          {(fileName || true) && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-4">Document Metadata</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Folder</label>
                  <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                    {knowledgeFolders.map(f => <option key={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Authority</label>
                  <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="e.g. Ministry of Labour" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Document Type</label>
                  <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                    <option>Act</option>
                    <option>Regulation</option>
                    <option>Notification</option>
                    <option>Circular</option>
                    <option>SOP</option>
                    <option>Template</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Sector</label>
                  <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                    <option>All Sectors</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>Food & Beverage</option>
                    <option>Construction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Effective Date</label>
                  <input type="date" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Expiry Date</label>
                  <input type="date" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="Leave blank if no expiry" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Version</label>
                  <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="e.g. v2.0" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">State/Jurisdiction</label>
                  <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                    <option>All India</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Source URL (optional)</label>
                <input type="url" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="https://..." />
              </div>

              {/* RAG toggle */}
              <div className="mt-4 flex items-center gap-3 p-4 bg-violet-50 border border-violet-200 rounded-xl">
                <div
                  onClick={() => setUseForRAG(!useForRAG)}
                  className={`w-10 h-6 rounded-full cursor-pointer transition-colors relative ${useForRAG ? 'bg-violet-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${useForRAG ? 'left-4' : 'left-0.5'}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1C1B22]">Use for regulatory guidance</div>
                  <div className="text-xs text-[#7C7B85]">This document will be indexed and used to answer user queries via RAG</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Upload button / status */}
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
            {stage === 'idle' ? (
              <button
                onClick={simulateUpload}
                className="w-full bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Upload & Process
              </button>
            ) : stage === 'ready' ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-sm font-semibold text-emerald-700 mb-1">Knowledge Ready!</div>
                <div className="text-xs text-[#7C7B85] mb-4">Document indexed and available for RAG</div>
                <button onClick={() => onNavigate('admin-document-detail')} className="w-full bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold">View Document</button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <svg className="w-6 h-6 text-violet-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <div className="text-sm font-semibold text-[#1C1B22] mb-1">Processing...</div>
                <div className="text-xs text-[#7C7B85]">Please wait</div>
              </div>
            )}
          </div>

          {/* Processing pipeline */}
          {stage !== 'idle' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
              <div className="text-sm font-semibold text-[#1C1B22] mb-4">Processing Pipeline</div>
              <div className="space-y-3">
                {stages.map((s, i) => {
                  const done = stageIdx > i;
                  const current = stageOrder[stageIdx] === s.key;
                  return (
                    <div key={s.key} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        done ? 'bg-emerald-100' : current ? 'bg-violet-100 animate-pulse' : 'bg-[#F5F3EE]'
                      }`}>
                        {done ? (
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : current ? (
                          <div className="w-2 h-2 rounded-full bg-violet-600" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#D0CCE0]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-medium ${done ? 'text-emerald-700' : current ? 'text-violet-700' : 'text-[#7C7B85]'}`}>{s.label}</div>
                        <div className="text-[10px] text-[#B0ADB8]">{s.desc}</div>
                      </div>
                      {done && <span className="text-emerald-500 text-xs">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
            <div className="text-sm font-semibold text-amber-800 mb-2">💡 Upload Tips</div>
            <ul className="space-y-1.5 text-xs text-amber-700">
              <li>• Use original government portal PDFs for best accuracy</li>
              <li>• Include the official version number in metadata</li>
              <li>• Set accurate effective dates for regulatory compliance</li>
              <li>• Enable RAG for documents with Q&A applicability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

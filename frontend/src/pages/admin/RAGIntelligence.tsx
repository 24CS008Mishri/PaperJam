import { useState } from 'react';
import { ragActivity, documents } from '../../data';

export default function RAGIntelligence() {
  const [activeTab, setActiveTab] = useState<'activity' | 'sources'>('activity');
  const [expandedRag, setExpandedRag] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">RAG & Intelligence</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Retrieval-Augmented Generation activity and knowledge sources</p>
        </div>
        <div className="flex gap-2">
          {[
            { val: '1,247', label: 'Total Queries' },
            { val: '892', label: 'Docs Indexed' },
            { val: '98.2%', label: 'Accuracy Rate' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E8E4DC] rounded-xl px-4 py-2.5 text-center">
              <div className="font-display text-lg font-bold text-[#1C1B22]">{s.val}</div>
              <div className="text-[10px] text-[#7C7B85]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RAG pipeline visual */}
      <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-amber-50 border border-violet-200 rounded-2xl p-6 mb-6">
        <div className="text-sm font-semibold text-[#1C1B22] mb-4">RAG Pipeline</div>
        <div className="flex items-center gap-3">
          {[
            { label: 'User Question', icon: '💬', color: '#6D28D9', bg: '#EDE9FE' },
            { label: 'Retrieve Sources', icon: '🔍', color: '#D97706', bg: '#FEF3C7' },
            { label: 'Relevant Chunks', icon: '✂', color: '#E11D48', bg: '#FFE4E6' },
            { label: 'Generate Guidance', icon: '✨', color: '#059669', bg: '#D1FAE5' },
          ].map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-3 flex-1">
              <div className="flex-1 rounded-xl p-3 text-center border" style={{ backgroundColor: stage.bg, borderColor: stage.color + '40' }}>
                <div className="text-xl mb-1">{stage.icon}</div>
                <div className="text-[10px] font-semibold" style={{ color: stage.color }}>{stage.label}</div>
              </div>
              {i < 3 && (
                <svg className="w-5 h-5 text-[#D0CCE0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5F3EE] p-1 rounded-xl mb-6 w-fit">
        <button onClick={() => setActiveTab('activity')} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'activity' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85] hover:text-[#1C1B22]'}`}>RAG Activity</button>
        <button onClick={() => setActiveTab('sources')} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'sources' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85] hover:text-[#1C1B22]'}`}>Sources</button>
      </div>

      {activeTab === 'activity' && (
        <div className="space-y-4">
          {ragActivity.map(rag => (
            <div key={rag.id} className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden hover:shadow-md transition-all">
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedRag(expandedRag === rag.id ? null : rag.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Query</span>
                      <span className="text-xs text-[#7C7B85]">{rag.timestamp}</span>
                      <span className="text-xs text-[#7C7B85]">· {rag.business}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#1C1B22] mb-2">
                      <span className="text-violet-600 font-mono-code mr-2">Q:</span>{rag.question}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#7C7B85]">
                      <span>{rag.sources.length} source{rag.sources.length !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>{rag.chunks} chunks</span>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-[#7C7B85] flex-shrink-0 transition-transform ${expandedRag === rag.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {expandedRag === rag.id && (
                <div className="border-t border-[#E8E4DC] p-5 bg-[#FEFCF8]">
                  {/* Sources used */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-[#7C7B85] uppercase tracking-wide mb-2">Sources Retrieved</div>
                    <div className="flex flex-wrap gap-2">
                      {rag.sources.map(s => (
                        <div key={s} className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
                          <span className="text-xs">📄</span>
                          <span className="text-xs text-amber-800 font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated guidance */}
                  <div>
                    <div className="text-xs font-semibold text-[#7C7B85] uppercase tracking-wide mb-2">Generated Guidance</div>
                    <div className="bg-white border border-[#E8E4DC] rounded-xl p-4">
                      <div className="text-sm text-[#1C1B22] leading-relaxed">{rag.guidance}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="text-sm font-semibold text-[#1C1B22]">RAG Sources</div>
            <div className="text-xs text-[#7C7B85]">{documents.filter(d => d.indexed).length} active sources</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
                {['Document', 'Folder', 'Authority', 'Index Status', 'Usage Count'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-xs flex-shrink-0">📄</div>
                      <div className="text-sm font-medium text-[#1C1B22]">{doc.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{doc.folder}</td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{doc.authority}</td>
                  <td className="px-5 py-3.5">
                    {doc.indexed ? (
                      <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">✓ Indexed</span>
                    ) : (
                      <span className="text-xs bg-[#F5F3EE] text-[#7C7B85] border border-[#E8E4DC] px-2 py-0.5 rounded-full">Pending</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#F5F3EE] rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-violet-500 to-amber-500 h-1.5 rounded-full" style={{ width: `${Math.min((doc.usage / 210) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-[#1C1B22] font-medium">{doc.usage}</span>
                    </div>
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

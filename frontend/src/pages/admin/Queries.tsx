import { useState } from 'react';
import { queries } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

export default function Queries() {
  const [selected, setSelected] = useState<typeof queries[0] | null>(null);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState<'All' | 'Open' | 'Pending Reply' | 'Resolved'>('All');

  const filtered = queries.filter(q => filter === 'All' || q.status === filter);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Queries & Communication</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Manage queries between applicants and departments</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#F5F3EE] p-1 rounded-xl mb-6 w-fit">
        {['All', 'Open', 'Pending Reply', 'Resolved'].map(f => (
          <button key={f} onClick={() => setFilter(f as typeof filter)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85] hover:text-[#1C1B22]'}`}>
            {f}
            <span className="ml-2 text-[10px] opacity-70">{queries.filter(q => f === 'All' || q.status === f).length}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Query list */}
        <div className="col-span-2 space-y-3">
          {filtered.map(q => (
            <div
              key={q.id}
              onClick={() => setSelected(q)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${selected?.id === q.id ? 'border-violet-300 bg-violet-50/50' : 'border-[#E8E4DC] hover:border-violet-200'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-mono-code text-violet-600">{q.id}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${q.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : q.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{q.priority}</span>
                </div>
              </div>
              <div className="text-sm font-medium text-[#1C1B22] mb-1 line-clamp-2">{q.subject}</div>
              <div className="text-xs text-[#7C7B85] mb-2">{q.business}</div>
              <div className="flex items-center justify-between">
                <StatusBadge status={q.status} />
                <span className="text-[10px] text-[#B0ADB8]">{q.created}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Query detail */}
        <div className="col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-[#E8E4DC]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono-code text-violet-600 mb-1">{selected.id}</div>
                    <h3 className="font-semibold text-[#1C1B22] text-sm mb-2">{selected.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#7C7B85]">
                      <span>{selected.business}</span>
                      <span>·</span>
                      <span>{selected.application}</span>
                      <span>·</span>
                      <span>{selected.department}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selected.status} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${selected.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : selected.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{selected.priority}</span>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="p-5 space-y-4 bg-[#FEFCF8] min-h-48">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700 flex-shrink-0">BD</div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-[#E8E4DC] flex-1 max-w-sm">
                    <div className="text-xs text-[#7C7B85] mb-1">{selected.business} · {selected.created}</div>
                    <div className="text-sm text-[#1C1B22]">{selected.subject}. Please clarify what additional information is needed to proceed.</div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-violet-600 rounded-2xl rounded-tr-none p-4 flex-1 max-w-sm">
                    <div className="text-xs text-violet-200 mb-1">{selected.assigned} · {selected.department}</div>
                    <div className="text-sm text-white">Thank you for your application. We need additional documentation to proceed with the review. Please refer to the checklist provided.</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700 flex-shrink-0">
                    {selected.assigned.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Internal Note */}
              <div className="px-5 py-3 bg-amber-50 border-t border-amber-200">
                <div className="text-xs font-semibold text-amber-800 mb-1">Internal Note</div>
                <div className="text-xs text-amber-700">Site plan needs architect countersignature per the 2024 Building Code Amendment.</div>
              </div>

              {/* Reply box */}
              <div className="p-5 border-t border-[#E8E4DC]">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  rows={3}
                  placeholder="Type your reply..."
                  className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none mb-3"
                />
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5B21B6]">Send Reply</button>
                  <button className="px-4 bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-emerald-700">Resolve</button>
                  <button className="px-4 bg-[#F5F3EE] text-[#7C7B85] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#E8E4DC]">Add Note</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <div className="text-sm font-medium text-[#1C1B22]">Select a query to view</div>
                <div className="text-xs text-[#7C7B85] mt-1">Click any query from the list</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

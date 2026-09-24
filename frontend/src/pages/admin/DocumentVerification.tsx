import { useState } from 'react';
import { documents } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

const allDocs = [
  ...documents,
  { id: 'DOC-006', name: 'MSME Development Act 2006', folder: 'Acts & Rules', authority: 'MSME Ministry', type: 'Act', version: 'v1.0', effectiveDate: 'Oct 2, 2006', status: 'Under Review' as const, size: '1.1 MB', indexed: false, usage: 0 },
  { id: 'DOC-007', name: 'Urban Land Ceiling Notification', folder: 'Department Notifications', authority: 'Urban Development', type: 'Notification', version: 'v3.0', effectiveDate: 'Apr 1, 2021', status: 'Needs Correction' as const, size: '450 KB', indexed: false, usage: 0 },
];

type FilterStatus = 'All' | 'Verified' | 'Under Review' | 'Needs Correction' | 'Rejected';

export default function DocumentVerification() {
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [selected, setSelected] = useState<typeof allDocs[0] | null>(null);
  const [remark, setRemark] = useState('');

  const filtered = allDocs.filter(d => filter === 'All' || d.status === filter);

  const statusCount = (s: string) => allDocs.filter(d => d.status === s).length;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Document Verification</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Review and verify uploaded regulatory documents</p>
        </div>
      </div>

      {/* Status filter cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: 'All', count: allDocs.length, color: 'bg-[#F5F3EE]', active: 'bg-[#1C1B22] text-white' },
          { label: 'Verified', count: statusCount('Verified'), color: 'bg-emerald-50 text-emerald-700 border-emerald-200', active: 'bg-emerald-600 text-white' },
          { label: 'Under Review', count: statusCount('Under Review'), color: 'bg-amber-50 text-amber-700 border-amber-200', active: 'bg-amber-600 text-white' },
          { label: 'Needs Correction', count: statusCount('Needs Correction'), color: 'bg-orange-50 text-orange-700 border-orange-200', active: 'bg-orange-600 text-white' },
          { label: 'Rejected', count: statusCount('Rejected'), color: 'bg-red-50 text-red-700 border-red-200', active: 'bg-red-600 text-white' },
        ].map(s => (
          <button
            key={s.label}
            onClick={() => setFilter(s.label as FilterStatus)}
            className={`rounded-2xl p-4 text-left border transition-all ${filter === s.label ? s.active : `${s.color} border-[#E8E4DC] hover:shadow-sm`}`}
          >
            <div className="text-2xl font-display font-bold">{s.count}</div>
            <div className="text-xs mt-0.5 opacity-80">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Document list */}
        <div className="col-span-1 space-y-2">
          {filtered.map(doc => (
            <div
              key={doc.id}
              onClick={() => setSelected(doc)}
              className={`rounded-xl border p-4 cursor-pointer transition-all ${selected?.id === doc.id ? 'border-violet-300 bg-violet-50' : 'border-[#E8E4DC] bg-white hover:border-violet-200 hover:bg-[#FEFCF8]'}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm flex-shrink-0">📄</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#1C1B22] truncate mb-1">{doc.name}</div>
                  <div className="text-[10px] text-[#7C7B85] mb-2">{doc.authority}</div>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="col-span-2">
          {selected ? (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs font-mono-code text-violet-600 mb-1">{selected.id}</div>
                    <h2 className="font-display text-xl font-semibold text-[#1C1B22] mb-2">{selected.name}</h2>
                    <StatusBadge status={selected.status} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Authority', val: selected.authority },
                    { label: 'Type', val: selected.type },
                    { label: 'Version', val: selected.version },
                    { label: 'Folder', val: selected.folder },
                    { label: 'Effective', val: selected.effectiveDate },
                    { label: 'Size', val: selected.size },
                  ].map(f => (
                    <div key={f.label} className="bg-[#FEFCF8] rounded-xl p-2.5 border border-[#E8E4DC]">
                      <div className="text-[10px] text-[#7C7B85] mb-0.5">{f.label}</div>
                      <div className="text-xs font-medium text-[#1C1B22]">{f.val}</div>
                    </div>
                  ))}
                </div>

                {/* Verification actions */}
                <div>
                  <div className="text-xs font-semibold text-[#7C7B85] uppercase tracking-wide mb-2">Remarks</div>
                  <textarea
                    value={remark}
                    onChange={e => setRemark(e.target.value)}
                    rows={3}
                    className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none mb-4"
                    placeholder="Add verification notes or correction instructions..."
                  />
                  <div className="flex gap-2">
                    <button className="flex-1 bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-emerald-700">✓ Verify</button>
                    <button className="flex-1 bg-amber-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-amber-600">Request Correction</button>
                    <button className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-red-700">✕ Reject</button>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
                <div className="text-sm font-semibold text-[#1C1B22] mb-3">Verification History</div>
                <div className="space-y-2">
                  {[
                    { action: 'Uploaded', by: 'System Import', when: 'Sep 20, 2026' },
                    { action: 'Sent for Review', by: 'Arjun Mehta', when: 'Sep 21, 2026' },
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span className="text-[#1C1B22] font-medium">{h.action}</span>
                      <span className="text-[#7C7B85]">by {h.by}</span>
                      <span className="text-[#B0ADB8] ml-auto">{h.when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">📋</div>
                <div className="text-sm font-medium text-[#1C1B22]">Select a document to verify</div>
                <div className="text-xs text-[#7C7B85] mt-1">Click any document from the list to review it</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

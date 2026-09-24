import { useState } from 'react';
import { approvals } from '../../data';

const sectorBadge: Record<string, string> = {
  'Manufacturing': 'bg-violet-100 text-violet-700',
  'Food & Beverage': 'bg-amber-100 text-amber-700',
  'Healthcare/Pharma': 'bg-blue-100 text-blue-700',
  'Retail/Commercial': 'bg-emerald-100 text-emerald-700',
  'All': 'bg-gray-100 text-gray-600',
  'Energy': 'bg-yellow-100 text-yellow-700',
};

export default function Approvals() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof approvals[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = approvals.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Approval Catalogue</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Manage all government approvals and their requirements</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">+ Add Approval</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search approvals..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300" />
        </div>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85]">
          <option>All Sectors</option>
          <option>Manufacturing</option>
          <option>Healthcare</option>
          <option>Food & Beverage</option>
        </select>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85]">
          <option>All Departments</option>
          <option>Industries Department</option>
          <option>Food Safety</option>
          <option>Municipal Corporation</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(apr => (
          <div key={apr.id} onClick={() => setSelected(apr)} className="bg-white rounded-2xl border border-[#E8E4DC] hover:shadow-lg hover:border-violet-200 cursor-pointer transition-all overflow-hidden group">
            {/* Card top accent */}
            <div className="h-1 bg-gradient-to-r from-violet-500 to-amber-400" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-amber-50 flex items-center justify-center text-lg">✅</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sectorBadge[apr.sector] ?? 'bg-gray-100 text-gray-600'}`}>{apr.sector}</span>
              </div>

              <h3 className="font-semibold text-[#1C1B22] text-sm mb-1">{apr.name}</h3>
              <div className="text-xs text-[#7C7B85] mb-4">{apr.department}</div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F5F3EE] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#7C7B85]">SLA</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{apr.sla}</div>
                </div>
                <div className="bg-[#F5F3EE] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#7C7B85]">Fee</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{apr.fee}</div>
                </div>
                <div className="bg-[#F5F3EE] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#7C7B85]">Renewal</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{apr.renewal}</div>
                </div>
                <div className="bg-[#F5F3EE] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#7C7B85]">Location</div>
                  <div className="text-xs font-semibold text-[#1C1B22] truncate">{apr.location}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[10px] text-[#7C7B85] uppercase tracking-wide mb-1.5">Required Documents ({apr.docs.length})</div>
                <div className="flex flex-wrap gap-1">
                  {apr.docs.slice(0, 3).map(doc => (
                    <span key={doc} className="text-[10px] bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-full">{doc}</span>
                  ))}
                  {apr.docs.length > 3 && (
                    <span className="text-[10px] bg-[#F5F3EE] text-[#7C7B85] px-2 py-0.5 rounded-full">+{apr.docs.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-xs font-medium py-2 rounded-xl bg-[#F5F3EE] text-[#1C1B22] hover:bg-violet-50 hover:text-violet-700 transition-colors">Edit</button>
                <button className="flex-1 text-xs font-medium py-2 rounded-xl bg-[#F5F3EE] text-[#1C1B22] hover:bg-amber-50 hover:text-amber-700 transition-colors">Archive</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Approval Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-[#1C1B22]">Add New Approval</h2>
              <button onClick={() => setShowModal(false)} className="text-[#7C7B85] hover:text-[#1C1B22] p-2 rounded-xl hover:bg-[#F5F3EE]">✕</button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Approval Name', type: 'text', placeholder: 'e.g. Factory License' },
                { label: 'Department', type: 'text', placeholder: 'e.g. Industries Department' },
                { label: 'Sector', type: 'text', placeholder: 'e.g. Manufacturing' },
                { label: 'SLA (days)', type: 'number', placeholder: '30' },
                { label: 'Fee Range', type: 'text', placeholder: 'e.g. ₹5,000–₹50,000' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-3 text-sm font-semibold hover:bg-[#E8E4DC]">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#5B21B6]">Save Approval</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

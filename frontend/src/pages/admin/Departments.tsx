import { useState } from 'react';
import { departments } from '../../data';

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  purple: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', accent: '#7C3AED' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: '#D97706' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', accent: '#E11D48' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: '#0F766E' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', accent: '#EA580C' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: '#2563EB' },
};

export default function Departments() {
  const [selected, setSelected] = useState<typeof departments[0] | null>(null);

  if (selected) {
    return <DepartmentDetail dept={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Departments</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">{departments.length} government departments on platform</p>
        </div>
        <button className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">+ Add Department</button>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Pending', value: departments.reduce((s, d) => s + d.pending, 0).toString(), color: 'from-violet-50 to-violet-100', border: 'border-violet-200' },
          { label: 'Processed This Month', value: departments.reduce((s, d) => s + d.processed, 0).toString(), color: 'from-emerald-50 to-green-100', border: 'border-emerald-200' },
          { label: 'SLA At Risk', value: departments.reduce((s, d) => s + d.slaRisk, 0).toString(), color: 'from-red-50 to-rose-100', border: 'border-red-200' },
          { label: 'Total Officers', value: departments.reduce((s, d) => s + d.officers, 0).toString(), color: 'from-amber-50 to-amber-100', border: 'border-amber-200' },
        ].map(k => (
          <div key={k.label} className={`bg-gradient-to-br ${k.color} border ${k.border} rounded-2xl p-5`}>
            <div className="font-display text-3xl font-bold text-[#1C1B22] mb-1">{k.value}</div>
            <div className="text-xs text-[#7C7B85]">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map(dept => {
          const c = colorMap[dept.color] ?? colorMap.purple;
          return (
            <div key={dept.id} onClick={() => setSelected(dept)} className={`bg-white rounded-2xl border ${c.border} hover:shadow-lg cursor-pointer transition-all overflow-hidden`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-lg`}>🏛️</div>
                  {dept.slaRisk > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {dept.slaRisk} at risk
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-[#1C1B22] mb-0.5">{dept.name}</h3>
                <div className="text-xs text-[#7C7B85] mb-4">{dept.state}</div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="font-display text-xl font-bold" style={{ color: c.accent }}>{dept.pending}</div>
                    <div className="text-[10px] text-[#7C7B85]">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-xl font-bold text-emerald-600">{dept.processed}</div>
                    <div className="text-[10px] text-[#7C7B85]">Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-xl font-bold text-[#1C1B22]">{dept.officers}</div>
                    <div className="text-[10px] text-[#7C7B85]">Officers</div>
                  </div>
                </div>

                {/* Workload bar */}
                <div className="w-full bg-[#F5F3EE] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${(dept.pending / 42) * 100}%`, backgroundColor: c.accent }} />
                </div>
                <div className="text-[10px] text-[#7C7B85] mt-1 text-right">{Math.round((dept.pending / 42) * 100)}% capacity</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DepartmentDetail({ dept, onBack }: { dept: typeof departments[0]; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('applications');
  const c = colorMap[dept.color] ?? colorMap.purple;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Departments
      </button>

      <div className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-6 mb-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm`}>🏛️</div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">{dept.name}</h1>
            <div className="text-sm text-[#7C7B85] mt-0.5">{dept.state} · {dept.officers} Officers</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Applications Pending', val: dept.pending.toString(), highlight: true },
            { label: 'Processed', val: dept.processed.toString() },
            { label: 'SLA At Risk', val: dept.slaRisk.toString(), alert: dept.slaRisk > 0 },
            { label: 'Officers', val: dept.officers.toString() },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3 border border-white/50 shadow-sm">
              <div className="font-display text-2xl font-bold text-[#1C1B22]">{s.val}</div>
              <div className="text-xs text-[#7C7B85] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 bg-[#F5F3EE] p-1 rounded-xl mb-6 w-fit">
        {['applications', 'documents', 'queries', 'approvals', 'activity'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === t ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85] hover:text-[#1C1B22]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
        <div className="text-sm text-[#7C7B85]">
          {activeTab === 'applications' && 'Applications assigned to this department will appear here.'}
          {activeTab === 'documents' && 'Documents submitted to this department will appear here.'}
          {activeTab === 'queries' && 'Queries raised by this department will appear here.'}
          {activeTab === 'approvals' && 'Approval catalogue for this department will appear here.'}
          {activeTab === 'activity' && 'Recent activity log for this department will appear here.'}
        </div>
      </div>
    </div>
  );
}

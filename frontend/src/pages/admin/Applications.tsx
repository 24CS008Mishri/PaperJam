import { useState } from 'react';
import { applications } from '../../data';
import { StatusBadge, SLABadge } from '../../components/StatusBadge';

interface Props { onNavigate: (page: string) => void; }

const statuses = ['All', 'Submitted', 'Document Check', 'Department Review', 'Query', 'Approved', 'Rejected'];
const sectors = ['All Sectors', 'Manufacturing', 'Food & Beverage', 'Construction', 'Healthcare', 'Retail', 'Energy', 'Education'];

const timeline = [
  { stage: 'Application Submitted', date: 'Sep 20, 2026', time: '9:12 AM', actor: 'TechVentures Pvt Ltd', done: true, color: '#7C3AED' },
  { stage: 'Documents Received', date: 'Sep 20, 2026', time: '9:15 AM', actor: 'System', done: true, color: '#7C3AED' },
  { stage: 'Document Check', date: 'Sep 21, 2026', time: '11:00 AM', actor: 'Anita Kumar', done: true, color: '#D97706' },
  { stage: 'Forwarded to Department', date: 'Sep 22, 2026', time: '2:30 PM', actor: 'System', done: true, color: '#2563EB' },
  { stage: 'Department Review', date: 'Sep 22, 2026', time: '3:00 PM', actor: 'Industries Dept.', done: false, current: true, color: '#2563EB' },
  { stage: 'Approval', date: '—', time: '—', actor: '—', done: false, color: '#059669' },
];

export default function Applications({ onNavigate }: Props) {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);
  const [searchQ, setSearchQ] = useState('');

  const filtered = applications.filter(a =>
    (selectedStatus === 'All' || a.status === selectedStatus) &&
    (a.business.toLowerCase().includes(searchQ.toLowerCase()) || a.id.toLowerCase().includes(searchQ.toLowerCase()))
  );

  if (selectedApp) {
    return <ApplicationDetail app={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Applications</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">{applications.length} total applications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#F5F3EE] rounded-xl p-1">
            <button onClick={() => setViewMode('card')} className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#6D28D9]' : 'text-[#7C7B85]'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48 max-w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search applications..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300" />
        </div>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85] focus:outline-none focus:ring-2 focus:ring-violet-300">
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85] focus:outline-none focus:ring-2 focus:ring-violet-300">
          <option>All States</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
          <option>Delhi</option>
        </select>
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setSelectedStatus(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${selectedStatus === s ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-[#7C7B85] border-[#E8E4DC] hover:border-violet-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Card View */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(app => (
            <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-white rounded-2xl border border-[#E8E4DC] p-5 hover:shadow-lg hover:border-violet-200 cursor-pointer transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono-code font-medium text-violet-600 mb-1">{app.id}</div>
                  <div className="font-semibold text-[#1C1B22] text-sm">{app.business}</div>
                  <div className="text-xs text-[#7C7B85]">{app.sector} · {app.location}</div>
                </div>
                <StatusBadge status={app.status} />
              </div>

              <div className="bg-[#F5F3EE] rounded-xl p-3 mb-4">
                <div className="text-xs font-semibold text-[#1C1B22] mb-0.5">{app.approval}</div>
                <div className="text-xs text-[#7C7B85]">{app.department}</div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-[#7C7B85] mb-1.5">
                  <span>Documents</span>
                  <span className="font-medium text-[#1C1B22]">{app.documents.submitted}/{app.documents.total}</span>
                </div>
                <div className="w-full bg-[#F5F3EE] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-amber-500" style={{ width: `${(app.documents.submitted / app.documents.total) * 100}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <SLABadge days={app.sla} />
                <span className="text-[10px] text-[#7C7B85]">{app.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
                {['ID', 'Business', 'Approval', 'Department', 'Status', 'Docs', 'SLA', 'Updated'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id} onClick={() => setSelectedApp(app)} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] cursor-pointer">
                  <td className="px-5 py-3.5 text-xs font-mono-code text-violet-700">{app.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-[#1C1B22]">{app.business}</div>
                    <div className="text-xs text-[#7C7B85]">{app.sector}</div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#1C1B22]">{app.approval}</td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{app.department}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{app.documents.submitted}/{app.documents.total}</td>
                  <td className="px-5 py-3.5"><SLABadge days={app.sla} /></td>
                  <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{app.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ApplicationDetail({ app, onBack }: { app: typeof applications[0]; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'documents', 'timeline', 'queries', 'audit'];

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Applications
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-mono-code text-violet-600 mb-1">{app.id}</div>
            <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">{app.business}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-[#7C7B85]">{app.approval}</span>
              <span className="text-[#D0CCE0]">·</span>
              <span className="text-sm text-[#7C7B85]">{app.department}</span>
              <span className="text-[#D0CCE0]">·</span>
              <span className="text-sm text-[#7C7B85]">{app.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={app.status} />
            <SLABadge days={app.sla} />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E8E4DC]">
          {[
            { label: 'Documents Submitted', val: `${app.documents.submitted}/${app.documents.total}` },
            { label: 'Sector', val: app.sector },
            { label: 'Application Fee', val: app.fee },
            { label: 'Last Updated', val: app.lastUpdated },
          ].map(s => (
            <div key={s.label}>
              <div className="text-xs text-[#7C7B85] mb-1">{s.label}</div>
              <div className="text-sm font-semibold text-[#1C1B22]">{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5F3EE] p-1 rounded-xl mb-6 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === t ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-[#7C7B85] hover:text-[#1C1B22]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-2 space-y-4">
          {activeTab === 'overview' && (
            <>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h3 className="font-semibold text-[#1C1B22] mb-4">Business Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Business Name', val: app.business },
                    { label: 'Sector', val: app.sector },
                    { label: 'Location', val: app.location },
                    { label: 'Application ID', val: app.id },
                  ].map(f => (
                    <div key={f.label}>
                      <div className="text-xs text-[#7C7B85] mb-1">{f.label}</div>
                      <div className="text-sm text-[#1C1B22] font-medium">{f.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h3 className="font-semibold text-[#1C1B22] mb-4">Document Progress</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 bg-[#F5F3EE] rounded-full h-3">
                    <div className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-amber-500" style={{ width: `${(app.documents.submitted / app.documents.total) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-[#1C1B22]">{app.documents.submitted}/{app.documents.total}</span>
                </div>
                <div className="text-xs text-[#7C7B85]">{app.documents.total - app.documents.submitted} documents still needed</div>
              </div>
            </>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-6">Application Journey</h3>
              <div className="relative">
                {timeline.map((t, i) => (
                  <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${t.done ? 'border-violet-600 bg-violet-600 text-white' : t.current ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-[#E8E4DC] bg-white text-[#B0ADB8]'}`}>
                        {t.done ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          : t.current ? <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          : <div className="w-2 h-2 rounded-full bg-[#D0CCE0]" />}
                      </div>
                      {i < timeline.length - 1 && <div className={`w-0.5 flex-1 mt-1 ${t.done ? 'bg-violet-200' : 'bg-[#E8E4DC]'}`} style={{ minHeight: '24px' }} />}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className={`text-sm font-semibold ${t.current ? 'text-amber-700' : t.done ? 'text-[#1C1B22]' : 'text-[#7C7B85]'}`}>{t.stage}</div>
                      <div className="text-xs text-[#7C7B85] mt-0.5">{t.actor} · {t.date} {t.time !== '—' ? `at ${t.time}` : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              {[
                { name: 'Incorporation Certificate', status: 'Submitted', size: '240 KB' },
                { name: 'Land Records', status: 'Submitted', size: '1.2 MB' },
                { name: 'Pollution Board NOC', status: 'Submitted', size: '560 KB' },
                { name: 'Building Plan', status: 'Missing', size: '—' },
                { name: 'Fire NOC', status: 'Submitted', size: '180 KB' },
                { name: 'Power of Attorney', status: 'Missing', size: '—' },
              ].map(doc => (
                <div key={doc.name} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${doc.status === 'Missing' ? 'border-red-200 bg-red-50/50' : 'border-[#E8E4DC]'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.status === 'Missing' ? 'bg-red-100' : 'bg-violet-100'}`}>
                    <span className="text-sm">{doc.status === 'Missing' ? '⚠' : '📄'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#1C1B22]">{doc.name}</div>
                    <div className="text-xs text-[#7C7B85]">{doc.size}</div>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'queries' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl border border-orange-200 bg-orange-50/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Open Query</span>
                  <span className="text-xs text-[#7C7B85]">Sep 23, 2026</span>
                </div>
                <div className="text-sm font-medium text-[#1C1B22] mb-2">Additional documents required for Zone A factory classification</div>
                <div className="text-xs text-[#7C7B85]">Raised by: Industries Department · Assigned to: Arjun Mehta</div>
                <div className="mt-3 bg-white rounded-xl p-3 border border-[#E8E4DC]">
                  <div className="text-xs text-[#7C7B85] mb-1">Department Note:</div>
                  <div className="text-xs text-[#1C1B22]">Please provide the Structural Stability Certificate from a registered structural engineer for the manufacturing floor area.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8E4DC] text-sm font-semibold text-[#1C1B22]">Audit History</div>
              {[
                { action: 'Status changed to Department Review', by: 'System', when: 'Sep 22, 2026 2:30 PM' },
                { action: 'Document Check completed', by: 'Anita Kumar', when: 'Sep 21, 2026 11:00 AM' },
                { action: 'Application received', by: 'System', when: 'Sep 20, 2026 9:12 AM' },
              ].map((a, i) => (
                <div key={i} className="px-5 py-3 border-b border-[#F5F3EE] last:border-0 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  <div className="flex-1 text-sm text-[#1C1B22]">{a.action}</div>
                  <div className="text-xs text-[#7C7B85]">{a.by}</div>
                  <div className="text-xs text-[#7C7B85]">{a.when}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-4">
            <div className="text-sm font-semibold text-[#1C1B22] mb-3">Actions</div>
            <div className="space-y-2">
              <button className="w-full bg-[#6D28D9] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5B21B6] transition-colors">Approve Application</button>
              <button className="w-full bg-amber-50 text-amber-700 border border-amber-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-amber-100 transition-colors">Request Documents</button>
              <button className="w-full bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#E8E4DC] transition-colors">Add Query</button>
              <button className="w-full bg-red-50 text-red-700 border border-red-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-red-100 transition-colors">Reject</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-200 rounded-2xl p-4">
            <div className="text-sm font-semibold text-[#1C1B22] mb-2">SLA Status</div>
            <div className="font-display text-3xl font-bold text-[#6D28D9] mb-1">{app.sla > 0 ? `${app.sla}d` : '✓'}</div>
            <div className="text-xs text-[#7C7B85]">{app.sla > 0 ? 'days remaining' : 'Completed within SLA'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

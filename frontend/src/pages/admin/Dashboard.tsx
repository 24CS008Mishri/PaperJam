import { applications, departments, queries } from '../../data';
import { StatusBadge, SLABadge } from '../../components/StatusBadge';

interface Props {
  onNavigate: (page: string) => void;
}

const kpis = [
  { label: 'Total Applications', value: '342', delta: '+12 this week', color: 'violet', gradient: 'from-violet-50 to-violet-100', border: 'border-violet-200', icon: '📋' },
  { label: 'Pending Review', value: '48', delta: '6 new today', color: 'amber', gradient: 'from-amber-50 to-amber-100', border: 'border-amber-200', icon: '⏳' },
  { label: 'Under Processing', value: '73', delta: '8 updated today', color: 'blue', gradient: 'from-blue-50 to-indigo-100', border: 'border-blue-200', icon: '⚙️' },
  { label: 'Approved', value: '189', delta: '+5 today', color: 'emerald', gradient: 'from-emerald-50 to-green-100', border: 'border-emerald-200', icon: '✅' },
  { label: 'SLA At Risk', value: '11', delta: '3 critical', color: 'red', gradient: 'from-red-50 to-rose-100', border: 'border-red-200', icon: '⚠️' },
  { label: 'Active Businesses', value: '1,204', delta: '+28 this month', color: 'violet', gradient: 'from-purple-50 to-violet-100', border: 'border-purple-200', icon: '🏢' },
];

const stages = ['Submitted', 'Document Check', 'Dept. Review', 'Query', 'Approval'];
const stageCounts = [48, 31, 73, 12, 189];
const stageColors = ['#DDD6FE', '#FDE68A', '#BFDBFE', '#FED7AA', '#A7F3D0'];
const stageActive = ['#7C3AED', '#D97706', '#2563EB', '#EA580C', '#059669'];

export default function Dashboard({ onNavigate }: Props) {
  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-[#7C7B85] mb-1">Thursday, Sep 24, 2026 · 10:45 AM</div>
          <h1 className="font-display text-3xl font-semibold text-[#1C1B22]">Good morning, Arjun 👋</h1>
          <p className="text-[#7C7B85] mt-1">Here's what's happening across your platform today.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate('admin-applications')} className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6] transition-colors">
            View All Applications
          </button>
        </div>
      </div>

      {/* KPI Cards - asymmetric editorial grid */}
      <div className="grid grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className={`${i === 0 ? 'col-span-2' : i === 4 ? 'col-span-2' : 'col-span-1'} bg-gradient-to-br ${kpi.gradient} border ${kpi.border} rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              {kpi.label === 'SLA At Risk' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            </div>
            <div className="font-display text-3xl font-bold text-[#1C1B22] mb-1">{kpi.value}</div>
            <div className="text-xs text-[#7C7B85] font-medium mb-1">{kpi.label}</div>
            <div className="text-[10px] text-[#B0ADB8]">{kpi.delta}</div>
          </div>
        ))}
      </div>

      {/* Application pipeline + Recent Applications */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pipeline workflow */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold text-[#1C1B22]">Application Pipeline</h2>
            <span className="text-xs text-[#7C7B85]">Live · updated now</span>
          </div>

          {/* Visual workflow */}
          <div className="flex items-center gap-2 mb-6">
            {stages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2 flex-1">
                <div className="flex-1">
                  <div
                    className="rounded-xl p-3 text-center border cursor-pointer hover:shadow-md transition-all"
                    style={{ backgroundColor: stageColors[i], borderColor: stageActive[i] + '40' }}
                  >
                    <div className="text-xl font-display font-bold" style={{ color: stageActive[i] }}>{stageCounts[i]}</div>
                    <div className="text-[10px] font-medium mt-0.5" style={{ color: stageActive[i] }}>{stage}</div>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <svg className="w-4 h-4 flex-shrink-0 text-[#D0CCE0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                )}
              </div>
            ))}
          </div>

          {/* Department workload */}
          <div>
            <div className="text-xs font-semibold text-[#7C7B85] uppercase tracking-wide mb-3">Department Workload</div>
            <div className="space-y-3">
              {departments.slice(0, 4).map(dept => (
                <div key={dept.id} className="flex items-center gap-3">
                  <div className="text-xs text-[#1C1B22] font-medium w-36 truncate">{dept.name}</div>
                  <div className="flex-1 bg-[#F5F3EE] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(dept.pending / 42) * 100}%`,
                        background: dept.slaRisk > 3 ? 'linear-gradient(to right, #7C3AED, #EA580C)' : 'linear-gradient(to right, #7C3AED, #D97706)',
                      }}
                    />
                  </div>
                  <div className="text-xs text-[#7C7B85] w-16 text-right">{dept.pending} pending</div>
                  {dept.slaRisk > 0 && (
                    <div className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200">{dept.slaRisk} at risk</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-1 space-y-4">
          {/* SLA Alerts */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-800">SLA Alerts</span>
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">11 at risk</span>
            </div>
            <div className="space-y-2">
              {applications.filter(a => a.sla <= 3 && a.sla > 0).map(app => (
                <div key={app.id} className="bg-white rounded-xl p-3 border border-red-100">
                  <div className="text-xs font-semibold text-[#1C1B22]">{app.id}</div>
                  <div className="text-[10px] text-[#7C7B85] mt-0.5">{app.business}</div>
                  <div className="text-[10px] font-medium text-red-600 mt-1">⚠ {app.sla} day{app.sla !== 1 ? 's' : ''} SLA remaining</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Queries */}
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-4">
            <div className="text-sm font-semibold text-[#1C1B22] mb-3">Recent Queries</div>
            <div className="space-y-2">
              {queries.slice(0, 2).map(q => (
                <div key={q.id} className="border border-[#E8E4DC] rounded-xl p-3 hover:bg-[#FEFCF8] cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono-code text-[#7C7B85]">{q.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${q.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{q.priority}</span>
                  </div>
                  <div className="text-xs text-[#1C1B22] line-clamp-2">{q.subject}</div>
                  <div className="text-[10px] text-[#7C7B85] mt-1">{q.business}</div>
                </div>
              ))}
              <button onClick={() => onNavigate('admin-queries')} className="text-xs text-violet-600 font-medium hover:text-violet-800 w-full text-center py-1">View all queries →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications table */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC]">
          <h2 className="font-display text-lg font-semibold text-[#1C1B22]">Recent Applications</h2>
          <button onClick={() => onNavigate('admin-applications')} className="text-sm text-violet-600 font-medium hover:text-violet-800">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
                {['Application ID', 'Business', 'Approval', 'Department', 'Status', 'Documents', 'SLA', 'Updated'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={app.id} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] cursor-pointer transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono-code font-medium text-violet-700">{app.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-[#1C1B22]">{app.business}</div>
                    <div className="text-xs text-[#7C7B85]">{app.sector}</div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#1C1B22]">{app.approval}</td>
                  <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{app.department}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#F5F3EE] rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-violet-500 to-amber-500 h-1.5 rounded-full" style={{ width: `${(app.documents.submitted / app.documents.total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-[#7C7B85]">{app.documents.submitted}/{app.documents.total}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><SLABadge days={app.sla} /></td>
                  <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{app.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

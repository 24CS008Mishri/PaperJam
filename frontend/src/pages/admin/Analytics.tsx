const barData = [
  { label: 'Submitted', count: 48, color: '#7C3AED' },
  { label: 'Doc Check', count: 31, color: '#D97706' },
  { label: 'Dept Review', count: 73, color: '#2563EB' },
  { label: 'Query', count: 12, color: '#EA580C' },
  { label: 'Approved', count: 189, color: '#059669' },
  { label: 'Rejected', count: 8, color: '#DC2626' },
];
const maxCount = Math.max(...barData.map(b => b.count));

const slaData = [
  { dept: 'Industries Dept', onTime: 89, atRisk: 11 },
  { dept: 'Food Safety', onTime: 95, atRisk: 5 },
  { dept: 'Urban Dev', onTime: 72, atRisk: 28 },
  { dept: 'Health Dept', onTime: 98, atRisk: 2 },
  { dept: 'Municipal Corp', onTime: 81, atRisk: 19 },
];

const topApprovals = [
  { name: 'Trade License', count: 312 },
  { name: 'FSSAI License', count: 203 },
  { name: 'Factory License', count: 156 },
  { name: 'Drug License', count: 89 },
  { name: 'Env. Clearance', count: 67 },
];

const weeklyTrend = [42, 38, 55, 61, 48, 73, 67];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Analytics() {
  const weekMax = Math.max(...weeklyTrend);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Analytics</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Platform performance and trends overview</p>
        </div>
        <div className="flex gap-2">
          {['7 Days', '30 Days', '90 Days', 'All Time'].map((p, i) => (
            <button key={p} className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${i === 1 ? 'bg-[#6D28D9] text-white border-[#6D28D9]' : 'bg-white text-[#7C7B85] border-[#E8E4DC] hover:border-violet-300'}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Applications This Month', val: '127', delta: '+12%', up: true },
          { label: 'Avg. Processing Time', val: '14.3 days', delta: '-2.1 days', up: true },
          { label: 'SLA Compliance Rate', val: '87.4%', delta: '+3.2%', up: true },
          { label: 'Document Queries', val: '1,247', delta: '+28%', up: true },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-[#E8E4DC] p-5">
            <div className="text-xs text-[#7C7B85] mb-2">{k.label}</div>
            <div className="font-display text-2xl font-bold text-[#1C1B22] mb-1">{k.val}</div>
            <div className={`text-xs font-medium ${k.up ? 'text-emerald-600' : 'text-red-600'}`}>{k.delta} from last month</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Applications by Status bar chart */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h3 className="font-semibold text-[#1C1B22] mb-1">Applications by Status</h3>
          <p className="text-xs text-[#7C7B85] mb-6">Current pipeline distribution</p>
          <div className="flex items-end gap-4 h-40">
            {barData.map(b => (
              <div key={b.label} className="flex flex-col items-center gap-2 flex-1">
                <div className="text-xs font-bold text-[#1C1B22]">{b.count}</div>
                <div
                  className="w-full rounded-t-xl transition-all hover:opacity-80 cursor-default"
                  style={{
                    height: `${(b.count / maxCount) * 120}px`,
                    background: `linear-gradient(to top, ${b.color}ee, ${b.color}99)`,
                  }}
                />
                <div className="text-[9px] text-[#7C7B85] text-center leading-tight">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly trend sparkline */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h3 className="font-semibold text-[#1C1B22] mb-1">Weekly Applications</h3>
          <p className="text-xs text-[#7C7B85] mb-4">New applications this week</p>
          <div className="flex items-end gap-2 h-24 mb-3">
            {weeklyTrend.map((v, i) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-1">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${(v / weekMax) * 80}px`,
                    background: i === 5 ? 'linear-gradient(to top, #7C3AED, #A78BFA)' : 'linear-gradient(to top, #DDD6FE, #EDE9FE)',
                  }}
                />
                <div className="text-[9px] text-[#7C7B85]">{weekDays[i]}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-[#6D28D9]">384</div>
            <div className="text-xs text-[#7C7B85]">total this week</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* SLA Performance */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h3 className="font-semibold text-[#1C1B22] mb-1">SLA Performance by Department</h3>
          <p className="text-xs text-[#7C7B85] mb-5">On-time processing rates</p>
          <div className="space-y-4">
            {slaData.map(s => (
              <div key={s.dept}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#1C1B22] font-medium">{s.dept}</span>
                  <span className="text-[#7C7B85]">{s.onTime}% on time</span>
                </div>
                <div className="w-full bg-[#F5F3EE] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${s.onTime}%`,
                      background: s.onTime >= 90 ? 'linear-gradient(to right, #059669, #34D399)' :
                        s.onTime >= 80 ? 'linear-gradient(to right, #D97706, #FCD34D)' :
                        'linear-gradient(to right, #DC2626, #F87171)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Approvals */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h3 className="font-semibold text-[#1C1B22] mb-1">Most Requested Approvals</h3>
          <p className="text-xs text-[#7C7B85] mb-5">By application count, all time</p>
          <div className="space-y-3">
            {topApprovals.map((a, i) => (
              <div key={a.name} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-violet-100 text-violet-700' : 'bg-[#F5F3EE] text-[#7C7B85]'}`}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#1C1B22]">{a.name}</span>
                    <span className="text-[#7C7B85]">{a.count}</span>
                  </div>
                  <div className="w-full bg-[#F5F3EE] rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-amber-400"
                      style={{ width: `${(a.count / topApprovals[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

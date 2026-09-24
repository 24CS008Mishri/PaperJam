import { useState } from 'react';
import { auditLogs } from '../../data';

export default function AuditLogs() {
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.entity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Audit Logs</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Complete activity trail for compliance and review</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-[#E8E4DC] text-[#1C1B22] px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-violet-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export CSV
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300" />
        </div>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85]">
          <option>All Actions</option>
          <option>Application Status Change</option>
          <option>Document Verified</option>
          <option>User Created</option>
          <option>Query Created</option>
        </select>
        <select className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85]">
          <option>All Users</option>
          <option>Arjun Mehta</option>
          <option>Priya Menon</option>
          <option>System</option>
        </select>
        <input type="date" className="bg-white border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm text-[#7C7B85] focus:outline-none" />
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="text-sm font-semibold text-[#1C1B22]">Activity Log</div>
          <div className="text-xs text-[#7C7B85]">{filtered.length} entries</div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
              {['User', 'Action', 'Entity', 'Previous Value', 'New Value', 'IP Address', 'Timestamp'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${log.user === 'System' ? 'bg-gray-100 text-gray-600' : 'bg-gradient-to-br from-violet-400 to-amber-400 text-white'}`}>
                      {log.user === 'System' ? '⚙' : log.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-[#1C1B22]">{log.user}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-[#1C1B22]">{log.action}</td>
                <td className="px-5 py-3.5 text-sm font-mono-code text-violet-700">{log.entity}</td>
                <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{log.prev}</td>
                <td className="px-5 py-3.5 text-xs font-medium text-[#1C1B22]">{log.next}</td>
                <td className="px-5 py-3.5 text-xs font-mono-code text-[#7C7B85]">{log.ip}</td>
                <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

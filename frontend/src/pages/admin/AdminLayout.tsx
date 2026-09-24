import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navGroups = [
  {
    label: 'Overview',
    items: [
      { id: 'admin-dashboard', label: 'Overview', icon: '⬡' },
      { id: 'admin-applications', label: 'Applications', icon: '📋' },
      { id: 'admin-businesses', label: 'Businesses', icon: '🏢' },
      { id: 'admin-approvals', label: 'Approvals', icon: '✅' },
      { id: 'admin-departments', label: 'Departments', icon: '🏛️' },
    ],
  },
  {
    label: 'Documents',
    items: [
      { id: 'admin-knowledge', label: 'Knowledge Library', icon: '📚' },
      { id: 'admin-upload', label: 'Upload Documents', icon: '⬆' },
      { id: 'admin-verification', label: 'Doc Verification', icon: '🔍' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'admin-rag', label: 'RAG & Intelligence', icon: '🧠' },
      { id: 'admin-schemes', label: 'Schemes & Incentives', icon: '🎁' },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'admin-analytics', label: 'Analytics', icon: '📊' },
      { id: 'admin-queries', label: 'Queries', icon: '💬' },
      { id: 'admin-users', label: 'Users', icon: '👤' },
      { id: 'admin-audit', label: 'Audit Logs', icon: '🗒' },
      { id: 'admin-settings', label: 'Settings', icon: '⚙' },
    ],
  },
];

export default function AdminLayout({ children, currentPage, onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentLabel = navGroups.flatMap(g => g.items).find(i => i.id === currentPage)?.label ?? 'Overview';

  return (
    <div className="flex h-screen bg-[#FEFCF8] overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 flex flex-col bg-white border-r border-[#E8E4DC] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'}`}>
        {/* Logo */}
        <div className="px-4 h-16 flex items-center border-b border-[#E8E4DC] gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">P</div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="font-display font-semibold text-[#1C1B22] text-sm leading-tight truncate">Paper Jam</div>
              <div className="text-[10px] text-[#7C7B85] truncate">Admin Portal</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 hide-scrollbar">
          {navGroups.map(group => (
            <div key={group.label} className="mb-4">
              {sidebarOpen && (
                <div className="px-4 mb-1 text-[10px] font-semibold text-[#B0ADB8] uppercase tracking-widest">{group.label}</div>
              )}
              {group.items.map(item => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={!sidebarOpen ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all relative group ${
                      active
                        ? 'text-[#6D28D9] bg-violet-50'
                        : 'text-[#7C7B85] hover:text-[#1C1B22] hover:bg-[#F5F3EE]'
                    }`}
                  >
                    {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-violet-600 rounded-r" />}
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-[#1C1B22] text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="border-t border-[#E8E4DC] p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AM</div>
            {sidebarOpen && (
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#1C1B22] truncate">Arjun Mehta</div>
                <div className="text-[10px] text-[#7C7B85] truncate">Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-[#E8E4DC] flex items-center gap-4 px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#7C7B85] hover:text-[#1C1B22] p-1 rounded-lg hover:bg-[#F5F3EE] transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-[#7C7B85]">Admin</span>
            <span className="text-[#D0CCE0]">/</span>
            <span className="text-[#1C1B22] font-medium">{currentLabel}</span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden md:block w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F5F3EE] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-xl hover:bg-[#F5F3EE] text-[#7C7B85] hover:text-[#1C1B22] transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-[#E8E4DC] shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E8E4DC] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1C1B22]">Notifications</span>
                  <span className="text-xs text-violet-600 font-medium">3 new</span>
                </div>
                {[
                  { title: 'SLA Alert: APP-2024-003', time: '2 min ago', type: 'alert', color: 'bg-red-50 text-red-700' },
                  { title: 'New application: AutoParts Hub', time: '20 min ago', type: 'info', color: 'bg-violet-50 text-violet-700' },
                  { title: 'Document verified: Factories Act', time: '1 hour ago', type: 'success', color: 'bg-emerald-50 text-emerald-700' },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${n.color}`}>{n.type}</div>
                      <div>
                        <div className="text-xs font-medium text-[#1C1B22]">{n.title}</div>
                        <div className="text-[10px] text-[#7C7B85] mt-0.5">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-[#E8E4DC]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold">AM</div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-[#1C1B22]">Arjun Mehta</div>
              <div className="text-[10px] text-[#7C7B85]">Super Admin</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#FEFCF8]">
          {children}
        </main>
      </div>
    </div>
  );
}

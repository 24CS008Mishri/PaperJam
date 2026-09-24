import { useState } from 'react';
import { users } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

const roleColors: Record<string, string> = {
  'Admin': 'bg-violet-100 text-violet-700 border-violet-200',
  'Department Officer': 'bg-blue-100 text-blue-700 border-blue-200',
  'Entrepreneur': 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState('All');

  const filtered = users.filter(u => filterRole === 'All' || u.role === filterRole);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Users & Roles</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">{users.length} platform users</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">+ Add User</button>
      </div>

      {/* Role filter */}
      <div className="flex gap-2 mb-6">
        {['All', 'Admin', 'Department Officer', 'Entrepreneur'].map(r => (
          <button key={r} onClick={() => setFilterRole(r)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${filterRole === r ? 'bg-[#6D28D9] text-white border-[#6D28D9]' : 'bg-white text-[#7C7B85] border-[#E8E4DC] hover:border-violet-300'}`}>
            {r}
            <span className="ml-1.5 text-[10px] opacity-60">{users.filter(u => r === 'All' || u.role === r).length}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FEFCF8] border-b border-[#E8E4DC]">
              {['User', 'Role', 'Department', 'Status', 'Last Active', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#7C7B85] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-b border-[#F5F3EE] last:border-0 hover:bg-[#FEFCF8] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1C1B22]">{user.name}</div>
                      <div className="text-xs text-[#7C7B85]">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${roleColors[user.role] ?? 'bg-gray-100 text-gray-600'}`}>{user.role}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-[#7C7B85]">{user.department}</td>
                <td className="px-5 py-3.5"><StatusBadge status={user.status} /></td>
                <td className="px-5 py-3.5 text-xs text-[#7C7B85]">{user.lastActive}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-violet-600 font-medium hover:text-violet-800 px-2 py-1 rounded-lg hover:bg-violet-50">Edit</button>
                    <button className="text-xs text-[#7C7B85] font-medium hover:text-[#1C1B22] px-2 py-1 rounded-lg hover:bg-[#F5F3EE]">Reset Access</button>
                    <button className="text-xs text-red-600 font-medium hover:text-red-800 px-2 py-1 rounded-lg hover:bg-red-50">
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-2xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-[#1C1B22]">Add New User</h2>
              <button onClick={() => setShowModal(false)} className="text-[#7C7B85] p-2 rounded-xl hover:bg-[#F5F3EE]">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Full Name</label>
                <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="e.g. Rahul Verma" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Email</label>
                <input type="email" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder="rahul@gov.in" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Role</label>
                <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                  <option>Department Officer</option>
                  <option>Admin</option>
                  <option>Entrepreneur</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Department</label>
                <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300">
                  <option>Select Department</option>
                  <option>Industries Department</option>
                  <option>Food Safety</option>
                  <option>Urban Development</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-3 text-sm font-semibold">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold">Create User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

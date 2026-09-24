import { useState } from 'react';

const settingsSections = ['Profile', 'Organization', 'Departments', 'Approval Config', 'Notifications', 'RAG Config', 'Document Storage', 'Security', 'Role Permissions'];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [ragEnabled, setRagEnabled] = useState(true);
  const [autoIndex, setAutoIndex] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [slaAlerts, setSlaAlerts] = useState(true);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Settings</h1>
        <p className="text-sm text-[#7C7B85] mt-0.5">Manage platform configuration and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Settings sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {settingsSections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === s ? 'bg-violet-50 text-violet-700' : 'text-[#7C7B85] hover:bg-[#F5F3EE] hover:text-[#1C1B22]'}`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings content */}
        <div className="flex-1 space-y-4">
          {activeSection === 'Profile' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-6">Admin Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-2xl font-bold text-white">AM</div>
                <div>
                  <div className="font-display text-lg font-semibold text-[#1C1B22]">Arjun Mehta</div>
                  <div className="text-sm text-[#7C7B85]">Super Admin · Platform Admin</div>
                  <button className="text-xs text-violet-600 font-medium mt-1 hover:text-violet-800">Change Photo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'First Name', val: 'Arjun' },
                  { label: 'Last Name', val: 'Mehta' },
                  { label: 'Email', val: 'arjun.mehta@paperjam.gov.in' },
                  { label: 'Phone', val: '+91 98765 00001' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input defaultValue={f.val} className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">Save Changes</button>
              </div>
            </div>
          )}

          {activeSection === 'RAG Config' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-6">RAG Configuration</h3>
              <div className="space-y-5">
                {[
                  { label: 'Enable RAG Intelligence', desc: 'Allow the platform to answer user queries using indexed documents', val: ragEnabled, set: setRagEnabled },
                  { label: 'Auto-index on Upload', desc: 'Automatically index documents when they are uploaded and verified', val: autoIndex, set: setAutoIndex },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-4 p-4 bg-[#FEFCF8] rounded-xl border border-[#E8E4DC]">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1C1B22]">{s.label}</div>
                      <div className="text-xs text-[#7C7B85] mt-0.5">{s.desc}</div>
                    </div>
                    <div onClick={() => s.set(!s.val)} className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${s.val ? 'bg-violet-600' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${s.val ? 'left-5' : 'left-0.5'}`} />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Chunk Size (tokens)', val: '512' },
                    { label: 'Chunk Overlap', val: '64' },
                    { label: 'Top-K Retrieval', val: '5' },
                    { label: 'Min Similarity Score', val: '0.75' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">{f.label}</label>
                      <input defaultValue={f.val} type="number" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button className="bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">Save RAG Config</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates via email', val: emailNotif, set: setEmailNotif },
                  { label: 'SLA Alerts', desc: 'Get alerted when applications approach SLA deadline', val: slaAlerts, set: setSlaAlerts },
                  { label: 'New Application Alerts', desc: 'Notify when a new application is submitted', val: true, set: () => {} },
                  { label: 'Department Updates', desc: 'Receive department activity summaries', val: false, set: () => {} },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-4 p-4 bg-[#FEFCF8] rounded-xl border border-[#E8E4DC]">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1C1B22]">{s.label}</div>
                      <div className="text-xs text-[#7C7B85] mt-0.5">{s.desc}</div>
                    </div>
                    <div onClick={() => s.set(!s.val)} className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${s.val ? 'bg-violet-600' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${s.val ? 'left-5' : 'left-0.5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Security' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-6">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="text-sm font-semibold text-amber-800 mb-1">Two-Factor Authentication</div>
                  <div className="text-xs text-amber-700 mb-3">Add an extra layer of security to your account</div>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-700">Enable 2FA</button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Session Timeout (minutes)</label>
                  <input defaultValue="30" type="number" className="w-48 bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="text-sm font-semibold text-red-800 mb-1">Change Password</div>
                  <div className="space-y-3">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(p => (
                      <input key={p} type="password" placeholder={p} className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                    ))}
                    <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700">Update Password</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!['Profile', 'RAG Config', 'Notifications', 'Security'].includes(activeSection) && (
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <h3 className="font-semibold text-[#1C1B22] mb-4">{activeSection}</h3>
              <div className="text-sm text-[#7C7B85]">{activeSection} configuration options will appear here.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

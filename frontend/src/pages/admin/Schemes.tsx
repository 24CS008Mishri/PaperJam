import { useState } from 'react';
import { schemes } from '../../data';

export default function Schemes() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Schemes & Incentives</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">Government schemes, subsidies, and incentive programs</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">+ Add Scheme</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {schemes.map((scheme, i) => {
          const colors = [
            { grad: 'from-violet-50 to-purple-100', border: 'border-violet-200', accent: '#6D28D9', badge: 'bg-violet-100 text-violet-700' },
            { grad: 'from-amber-50 to-yellow-100', border: 'border-amber-200', accent: '#D97706', badge: 'bg-amber-100 text-amber-700' },
            { grad: 'from-emerald-50 to-green-100', border: 'border-emerald-200', accent: '#059669', badge: 'bg-emerald-100 text-emerald-700' },
            { grad: 'from-blue-50 to-indigo-100', border: 'border-blue-200', accent: '#2563EB', badge: 'bg-blue-100 text-blue-700' },
          ][i % 4];
          return (
            <div key={scheme.id} className={`bg-gradient-to-br ${colors.grad} border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-all group`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono-code text-[#7C7B85] mb-1">{scheme.id}</div>
                  <h3 className="font-display text-lg font-semibold text-[#1C1B22]">{scheme.name}</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-200">{scheme.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/70 rounded-xl p-3 border border-white/50">
                  <div className="text-[10px] text-[#7C7B85] mb-0.5">Sector</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{scheme.sector}</div>
                </div>
                <div className="bg-white/70 rounded-xl p-3 border border-white/50">
                  <div className="text-[10px] text-[#7C7B85] mb-0.5">Location</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{scheme.location}</div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-3 border border-white/50 mb-3">
                <div className="text-[10px] text-[#7C7B85] mb-1">Benefit</div>
                <div className="text-sm font-semibold" style={{ color: colors.accent }}>{scheme.benefit}</div>
              </div>

              <div className="mb-4">
                <div className="text-[10px] text-[#7C7B85] mb-1">Eligibility</div>
                <div className="text-xs text-[#1C1B22]">{scheme.eligibility}</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#7C7B85]">Deadline</div>
                  <div className="text-xs font-semibold text-[#1C1B22]">{scheme.deadline}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-white/70 border border-white/50 px-3 py-1.5 rounded-xl font-medium text-[#1C1B22] hover:bg-white">Edit</button>
                  <button className="text-xs bg-white/70 border border-white/50 px-3 py-1.5 rounded-xl font-medium text-[#7C7B85] hover:bg-white">Archive</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-[#1C1B22]">Add New Scheme</h2>
              <button onClick={() => setShowModal(false)} className="text-[#7C7B85] p-2 rounded-xl hover:bg-[#F5F3EE]">✕</button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Scheme Name', placeholder: 'e.g. PLI Scheme for Textiles' },
                { label: 'Benefit', placeholder: 'e.g. 6% incentive on incremental sales' },
                { label: 'Eligibility', placeholder: 'e.g. Companies with ₹100 Cr+ turnover' },
                { label: 'Application Deadline', placeholder: 'e.g. Dec 31, 2026' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" placeholder={f.placeholder} />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#F5F3EE] text-[#1C1B22] rounded-xl py-3 text-sm font-semibold">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#6D28D9] text-white rounded-xl py-3 text-sm font-semibold">Save Scheme</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

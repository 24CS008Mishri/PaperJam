import { useState } from 'react';
import { applications, businesses } from '../../data';
import { StatusBadge } from '../../components/StatusBadge';

type Business = (typeof businesses)[number];

const sectorStyles: Record<string, string> = {
  Manufacturing: 'bg-violet-50 text-violet-700 border-violet-200',
  'Food & Beverage': 'bg-amber-50 text-amber-700 border-amber-200',
  Construction: 'bg-orange-50 text-orange-700 border-orange-200',
  Healthcare: 'bg-rose-50 text-rose-700 border-rose-200',
  Retail: 'bg-blue-50 text-blue-700 border-blue-200',
  Energy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function Businesses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Business | null>(null);

  const filteredBusinesses = businesses.filter((business) => {
    const query = searchQuery.toLowerCase();
    return [business.name, business.sector, business.location, business.type]
      .some((value) => value.toLowerCase().includes(query));
  });

  if (selected) {
    return <BusinessDetail business={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">Businesses</h1>
          <p className="text-sm text-[#7C7B85] mt-0.5">{businesses.length} businesses registered on the platform</p>
        </div>
        <button className="bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5B21B6]">
          + Add Business
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Businesses', value: businesses.length, color: 'from-violet-50 to-violet-100', border: 'border-violet-200' },
          { label: 'Active Applications', value: businesses.reduce((total, business) => total + business.activeApps, 0), color: 'from-amber-50 to-amber-100', border: 'border-amber-200' },
          { label: 'Compliant', value: businesses.filter((business) => business.status === 'Compliant').length, color: 'from-emerald-50 to-green-100', border: 'border-emerald-200' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-5`}>
            <div className="font-display text-3xl font-bold text-[#1C1B22]">{stat.value}</div>
            <div className="text-xs text-[#7C7B85] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0ADB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search businesses, sectors, or locations..."
          className="w-full bg-white border border-[#E8E4DC] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBusinesses.map((business) => (
          <button
            key={business.id}
            onClick={() => setSelected(business)}
            className="text-left bg-white rounded-2xl border border-[#E8E4DC] p-5 hover:border-violet-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-amber-100 flex items-center justify-center text-lg font-bold text-violet-700">
                {business.name.charAt(0)}
              </div>
              <StatusBadge status={business.status} />
            </div>

            <h2 className="font-semibold text-[#1C1B22]">{business.name}</h2>
            <p className="text-xs text-[#7C7B85] mt-1">{business.type} · {business.location}</p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F5F3EE]">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${sectorStyles[business.sector] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                {business.sector}
              </span>
              <span className="text-xs text-[#7C7B85]">{business.activeApps} active {business.activeApps === 1 ? 'application' : 'applications'}</span>
            </div>
          </button>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="bg-white border border-dashed border-[#D8D3CA] rounded-2xl p-12 text-center text-sm text-[#7C7B85]">
          No businesses match your search.
        </div>
      )}
    </div>
  );
}

function BusinessDetail({ business, onBack }: { business: Business; onBack: () => void }) {
  const relatedApplications = applications.filter((application) => application.business === business.name);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#7C7B85] hover:text-[#6D28D9] mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
        </svg>
        Back to Businesses
      </button>

      <div className="bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl font-bold text-violet-700 shadow-sm">
            {business.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#1C1B22]">{business.name}</h1>
            <p className="text-sm text-[#7C7B85] mt-1">{business.type} · {business.location}</p>
          </div>
          <div className="sm:ml-auto"><StatusBadge status={business.status} /></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Active Applications', value: business.activeApps },
            { label: 'Founded', value: business.founded },
            { label: 'Employees', value: business.employees },
            { label: 'Sector', value: business.sector },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-3 border border-white/70 shadow-sm">
              <div className="font-semibold text-[#1C1B22] text-sm">{item.value}</div>
              <div className="text-xs text-[#7C7B85] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <h2 className="font-semibold text-[#1C1B22] mb-4">Business Information</h2>
          <div className="space-y-3 text-sm">
            <InfoRow label="GSTIN" value={business.gst} />
            <InfoRow label="PAN" value={business.pan} />
            <InfoRow label="Location" value={business.location} />
            <InfoRow label="Legal structure" value={business.type} />
          </div>
        </section>

        <section className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E4DC] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1C1B22]">Applications</h2>
            <span className="text-xs text-[#7C7B85]">{relatedApplications.length} total</span>
          </div>
          <div className="space-y-3">
            {relatedApplications.length > 0 ? relatedApplications.map((application) => (
              <div key={application.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#F5F3EE] last:border-0 pb-3 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-[#1C1B22]">{application.approval}</div>
                  <div className="text-xs text-[#7C7B85] mt-0.5">{application.id} · {application.department}</div>
                </div>
                <StatusBadge status={application.status} />
              </div>
            )) : <p className="text-sm text-[#7C7B85]">No applications recorded for this business.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[#7C7B85]">{label}</span>
      <span className="text-right font-medium text-[#1C1B22]">{value}</span>
    </div>
  );
}

interface Props {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: '🔍',
    title: 'Approval Discovery',
    desc: 'Instantly discover every approval your business needs based on sector, size, and location.',
    gradient: 'from-violet-50 to-violet-100',
    border: 'border-violet-200',
    accent: 'text-violet-700',
  },
  {
    icon: '📄',
    title: 'Document Readiness',
    desc: 'Know exactly which documents you need — and get guided templates to prepare them.',
    gradient: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    accent: 'text-amber-700',
  },
  {
    icon: '⚖️',
    title: 'Smart Regulatory Guidance',
    desc: 'AI-powered answers from verified regulatory documents, acts, and government circulars.',
    gradient: 'from-rose-50 to-pink-100',
    border: 'border-rose-200',
    accent: 'text-rose-700',
  },
  {
    icon: '📍',
    title: 'Application Tracking',
    desc: 'Real-time status updates and SLA tracking across all your government applications.',
    gradient: 'from-violet-50 to-purple-100',
    border: 'border-purple-200',
    accent: 'text-purple-700',
  },
  {
    icon: '🏛️',
    title: 'Department Coordination',
    desc: 'Seamlessly coordinate across multiple government departments from one unified workspace.',
    gradient: 'from-amber-50 to-orange-100',
    border: 'border-orange-200',
    accent: 'text-orange-700',
  },
  {
    icon: '🎁',
    title: 'Schemes & Incentives',
    desc: 'Discover government schemes, subsidies, and incentives tailored to your business profile.',
    gradient: 'from-emerald-50 to-teal-100',
    border: 'border-emerald-200',
    accent: 'text-emerald-700',
  },
];

const steps = [
  { step: '01', label: 'Business Details', desc: 'Tell us about your venture', color: '#7C3AED' },
  { step: '02', label: 'Approval Discovery', desc: 'Find what approvals you need', color: '#D97706' },
  { step: '03', label: 'Documents', desc: 'Prepare required documents', color: '#E11D48' },
  { step: '04', label: 'Application', desc: 'Submit your application', color: '#7C3AED' },
  { step: '05', label: 'Dept. Review', desc: 'Departments review your file', color: '#D97706' },
  { step: '06', label: 'Approval', desc: 'Receive your approval', color: '#059669' },
];

export default function Landing({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-[#FEFCF8] font-sans overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold">P</div>
            <span className="font-display font-semibold text-[#1C1B22] text-lg tracking-tight">Paper Jam</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#7C7B85]">
            <a href="#features" className="hover:text-[#6D28D9] transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-[#6D28D9] transition-colors">How it Works</a>
            <a href="#departments" className="hover:text-[#6D28D9] transition-colors">For Departments</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('login')} className="text-sm font-medium text-[#1C1B22] hover:text-[#6D28D9] transition-colors px-4 py-2">Login</button>
            <button onClick={() => onNavigate('signup')} className="text-sm font-medium bg-[#6D28D9] text-white px-4 py-2 rounded-xl hover:bg-[#5B21B6] transition-colors">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-200 rounded-full opacity-25 blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/2 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 text-xs font-medium text-violet-700 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Trusted by 4,200+ businesses across India
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-[#1C1B22] leading-[1.1] tracking-tight mb-6">
              Unjam the<br />
              <span className="italic text-[#6D28D9]">Paperwork.</span>
              <br />
              <span className="bg-gradient-to-r from-[#D97706] via-[#F97316] to-[#E11D48] bg-clip-text text-transparent">Move Business Forward.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#7C7B85] max-w-2xl mx-auto leading-relaxed mb-10">
              Paper Jam helps businesses discover the approvals they need, prepare the right documents, submit applications, and track government approvals — all from one intelligent workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate('signup')} className="inline-flex items-center gap-2 bg-[#6D28D9] text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-[#5B21B6] hover:shadow-lg hover:shadow-violet-200 transition-all group">
                Start Your Application
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <button className="inline-flex items-center gap-2 bg-white border border-[#E8E4DC] text-[#1C1B22] px-8 py-4 rounded-2xl font-semibold text-base hover:border-[#6D28D9] hover:text-[#6D28D9] transition-all">
                Explore How It Works
              </button>
            </div>
          </div>

          {/* Browser Mockup Hero Visual */}
          <div className="relative mx-auto max-w-5xl">
            {/* Floating cards around the mockup */}
            <div className="absolute -left-8 top-16 z-10 animate-float-up">
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8E4DC] p-4 w-52">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-700 text-sm">📋</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1C1B22]">Factory License</div>
                    <div className="text-[10px] text-[#7C7B85]">Industries Dept</div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                  <div className="bg-gradient-to-r from-violet-500 to-amber-500 h-1.5 rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="text-[10px] text-[#7C7B85]">8 of 10 documents ready</div>
              </div>
            </div>

            <div className="absolute -right-6 top-8 z-10 animate-float-down" style={{ animationDelay: '1s' }}>
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8E4DC] p-4 w-48">
                <div className="text-xs text-[#7C7B85] mb-1">Application Status</div>
                <div className="text-sm font-semibold text-emerald-600 mb-2">✓ Approved</div>
                <div className="text-[10px] text-[#7C7B85]">MediCare Labs · Drug License</div>
                <div className="text-[10px] text-violet-600 font-medium mt-1">Sep 18, 2026</div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-20 z-10 animate-float-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-xl p-4 w-44 text-white">
                <div className="text-xs font-medium opacity-80 mb-1">SLA Alert</div>
                <div className="text-sm font-bold mb-0.5">APP-2024-003</div>
                <div className="text-[10px] opacity-80">1 day remaining</div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-12 z-10 animate-float-down" style={{ animationDelay: '1.5s' }}>
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8E4DC] p-3 w-40">
                <div className="text-[10px] text-[#7C7B85] mb-2">Approval Found</div>
                <div className="flex flex-col gap-1">
                  {['Trade License','GST Registration','MSME Udyam'].map(a => (
                    <div key={a} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full border-2 border-violet-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-violet-400" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1B22]">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main browser frame */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#E8E4DC] overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-[#F5F3EE] border-b border-[#E8E4DC] px-6 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-xs text-[#7C7B85] border border-[#E8E4DC]">
                  app.paperjam.gov.in/dashboard
                </div>
              </div>

              {/* App preview inside browser */}
              <div className="p-6 bg-[#FEFCF8] min-h-64">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-[#7C7B85]">Good morning, Kavitha</div>
                    <div className="text-xl font-display font-semibold text-[#1C1B22]">Your Business Dashboard</div>
                  </div>
                  <button className="bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-medium">+ New Application</button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Active Applications', val: '3', color: 'violet' },
                    { label: 'Documents Ready', val: '18/22', color: 'amber' },
                    { label: 'Approvals Received', val: '7', color: 'emerald' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-[#E8E4DC] p-4">
                      <div className="text-2xl font-display font-bold text-[#1C1B22]">{s.val}</div>
                      <div className="text-xs text-[#7C7B85] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Mini application list */}
                <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E8E4DC] text-sm font-semibold text-[#1C1B22]">Recent Applications</div>
                  {[
                    { name: 'Factory License', dept: 'Industries Dept', status: 'Department Review', color: 'bg-blue-100 text-blue-700' },
                    { name: 'FSSAI License', dept: 'Food Safety', status: 'Document Check', color: 'bg-amber-100 text-amber-700' },
                    { name: 'Trade License', dept: 'Municipal Corp', status: 'Approved', color: 'bg-emerald-100 text-emerald-700' },
                  ].map((app, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-[#F5F3EE] last:border-0">
                      <div>
                        <div className="text-xs font-semibold text-[#1C1B22]">{app.name}</div>
                        <div className="text-[10px] text-[#7C7B85]">{app.dept}</div>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${app.color}`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-medium text-amber-700 mb-4">Everything in one place</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1C1B22] mb-4">Built for the business journey</h2>
            <p className="text-lg text-[#7C7B85] max-w-xl mx-auto">From discovering what approvals you need to getting them — Paper Jam covers the entire lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className={`rounded-2xl border ${f.border} bg-gradient-to-br ${f.gradient} p-6 hover:shadow-lg transition-all group cursor-default`}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className={`font-display text-lg font-semibold ${f.accent} mb-2`}>{f.title}</h3>
                <p className="text-sm text-[#7C7B85] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-[#FEFCF8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1C1B22] mb-4">How it works</h2>
            <p className="text-lg text-[#7C7B85] max-w-xl mx-auto">Six steps from idea to approval — guided every step of the way.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 text-center hover:shadow-md transition-all">
                  <div className="font-mono-code text-xs text-[#7C7B85] mb-3">{s.step}</div>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: s.color }}>
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold text-[#1C1B22] mb-1">{s.label}</div>
                  <div className="text-xs text-[#7C7B85]">{s.desc}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 z-10">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" stroke="#DDD6FE" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#D97706] rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Ready to unjam?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Join thousands of businesses that have simplified their regulatory journey with Paper Jam.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => onNavigate('signup')} className="bg-white text-[#6D28D9] px-8 py-4 rounded-2xl font-semibold hover:bg-[#FEFCF8] transition-colors">
                  Start for Free
                </button>
                <button onClick={() => onNavigate('login')} className="bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                  Login to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8E4DC] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold">P</div>
            <span className="font-display font-semibold text-[#1C1B22]">Paper Jam</span>
            <span className="text-[#7C7B85] text-sm">· Unjam the Paperwork.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-[#7C7B85]">
            <a href="#" className="hover:text-[#6D28D9] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#6D28D9] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#6D28D9] transition-colors">Support</a>
          </div>
          <div className="text-xs text-[#7C7B85]">© 2026 Paper Jam. Government of India Initiative.</div>
        </div>
      </footer>
    </div>
  );
}

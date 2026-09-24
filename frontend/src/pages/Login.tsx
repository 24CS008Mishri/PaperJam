import { useState } from 'react';
import { loginAdmin } from '../api/auth';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      await loginAdmin(email, password, remember);
      onNavigate('admin-dashboard');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCF8] flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#D97706] p-12">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 mb-16">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg">P</div>
            <span className="font-display font-semibold text-white text-xl">Paper Jam</span>
          </button>

          <div className="flex-1">
            <h2 className="font-display text-4xl font-semibold text-white mb-4 leading-tight">
              Your regulatory<br />
              <span className="italic">desk awaits.</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-12 max-w-sm">
              Manage business approvals, track applications, and access verified regulatory guidance — all from one workspace.
            </p>
          </div>
        </div>

        {/* Floating document cards */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="relative w-80">
            {/* Back card */}
            <div className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur rounded-2xl h-40 border border-white/20" />
            {/* Middle card */}
            <div className="absolute top-2 left-2 right-2 bg-white/15 backdrop-blur rounded-2xl h-44 border border-white/25" />
            {/* Front card */}
            <div className="relative bg-white/20 backdrop-blur rounded-2xl p-6 border border-white/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Factory License</div>
                  <div className="text-white/60 text-xs">Industries Department</div>
                </div>
                <div className="ml-auto bg-emerald-400/30 text-emerald-200 text-xs px-2 py-0.5 rounded-full border border-emerald-400/30">Approved</div>
              </div>
              <div className="space-y-2">
                {['Incorporation Certificate', 'Land Records', 'Pollution NOC', 'Building Plan'].map((doc, i) => (
                  <div key={doc} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${i < 3 ? 'bg-emerald-400/30 border-emerald-400/50 text-emerald-200' : 'border-white/30'}`}>
                      {i < 3 ? '✓' : ''}
                    </div>
                    <span className="text-white/70 text-xs">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="flex items-center gap-4">
            <div className="text-white/60 text-xs">Trusted by</div>
            <div className="flex gap-3">
              {['4,200+\nBusinesses', '28\nStates', '180+\nApprovals'].map(s => (
                <div key={s} className="bg-white/10 rounded-xl px-3 py-2 text-center backdrop-blur border border-white/20">
                  <div className="text-white text-xs font-semibold whitespace-pre-line leading-tight">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 py-12">
        <div className="max-w-sm mx-auto w-full">
          {/* Mobile logo */}
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold">P</div>
            <span className="font-display font-semibold text-[#1C1B22] text-lg">Paper Jam</span>
          </button>

          <h1 className="font-display text-3xl font-semibold text-[#1C1B22] mb-2">Welcome back</h1>
          <p className="text-[#7C7B85] text-sm mb-8">Sign in to your Paper Jam workspace</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#1C1B22] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-[#B0ADB8]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onFocus={() => setPassword('')}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#1C1B22] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${remember ? 'bg-violet-600 border-violet-600' : 'border-[#E8E4DC]'}`}
                >
                  {remember && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs text-[#7C7B85]">Remember me</span>
              </label>
              <button className="text-xs text-violet-600 hover:text-violet-800 font-medium">Forgot password?</button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}

            <button onClick={submit} disabled={loading || !email || !password} className="w-full bg-[#6D28D9] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#5B21B6] hover:shadow-lg hover:shadow-violet-200 transition-all disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E8E4DC]" /></div>
              <div className="relative flex justify-center text-xs text-[#7C7B85] bg-[#FEFCF8] px-4">or</div>
            </div>

            <button className="w-full bg-white border border-[#E8E4DC] text-[#1C1B22] py-3.5 rounded-xl font-medium text-sm hover:border-violet-300 hover:shadow-sm transition-all flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-[#7C7B85] mt-8">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('signup')} className="text-violet-600 font-semibold hover:text-violet-800">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}

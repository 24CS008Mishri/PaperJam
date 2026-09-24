import { useState } from 'react';

interface Props {
  onNavigate: (page: string) => void;
}

type AccountType = 'Entrepreneur' | 'Department' | 'Admin';

export default function Signup({ onNavigate }: Props) {
  const [accountType, setAccountType] = useState<AccountType>('Entrepreneur');

  return (
    <div className="min-h-screen bg-[#FEFCF8] flex flex-col items-center justify-center px-6 py-12">
      <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold">P</div>
        <span className="font-display font-semibold text-[#1C1B22] text-lg">Paper Jam</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E4DC] shadow-xl shadow-violet-50 p-8">
        <h1 className="font-display text-3xl font-semibold text-[#1C1B22] mb-1">Create account</h1>
        <p className="text-[#7C7B85] text-sm mb-8">Start your Paper Jam journey today</p>

        {/* Account type selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#1C1B22] mb-2 uppercase tracking-wide">Account Type</label>
          <div className="grid grid-cols-3 gap-2 bg-[#F5F3EE] p-1 rounded-xl">
            {(['Entrepreneur', 'Department', 'Admin'] as AccountType[]).map(t => (
              <button
                key={t}
                onClick={() => setAccountType(t)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  accountType === t
                    ? 'bg-white text-[#6D28D9] shadow-sm'
                    : 'text-[#7C7B85] hover:text-[#1C1B22]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">First Name</label>
              <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Kavitha" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Last Name</label>
              <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Nair" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Email</label>
            <input type="email" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="kavitha@greenfoodsco.com" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Phone Number</label>
            <div className="flex gap-2">
              <div className="bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-3 py-3 text-sm text-[#7C7B85] whitespace-nowrap">🇮🇳 +91</div>
              <input type="tel" className="flex-1 bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="98765 43210" />
            </div>
          </div>

          {accountType === 'Entrepreneur' && (
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Business Name</label>
              <input type="text" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="GreenFoods Co." />
            </div>
          )}

          {accountType === 'Department' && (
            <div>
              <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Department</label>
              <select className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>Select Department</option>
                <option>Industries Department</option>
                <option>Food Safety Authority</option>
                <option>Urban Development</option>
                <option>Health Department</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Password</label>
            <input type="password" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Min. 8 characters" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1B22] mb-1.5 uppercase tracking-wide">Confirm Password</label>
            <input type="password" className="w-full bg-[#FEFCF8] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Re-enter password" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <div className="w-4 h-4 mt-0.5 rounded border border-[#E8E4DC] flex-shrink-0" />
            <span className="text-xs text-[#7C7B85] leading-relaxed">
              I agree to Paper Jam's <button className="text-violet-600 font-medium">Terms of Service</button> and <button className="text-violet-600 font-medium">Privacy Policy</button>
            </span>
          </label>

          <button onClick={() => onNavigate('login')} className="w-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-95 hover:shadow-lg hover:shadow-violet-200 transition-all">
            Create Account
          </button>
        </div>

        <p className="text-center text-sm text-[#7C7B85] mt-6">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-violet-600 font-semibold hover:text-violet-800">Sign in</button>
        </p>
      </div>
    </div>
  );
}

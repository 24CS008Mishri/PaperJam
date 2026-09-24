import type { AppStatus, VerificationStatus, Priority, QueryStatus } from '../data';

const statusStyles: Record<string, string> = {
  'Submitted': 'bg-violet-50 text-violet-700 border-violet-200',
  'Document Check': 'bg-amber-50 text-amber-700 border-amber-200',
  'Department Review': 'bg-blue-50 text-blue-700 border-blue-200',
  'Query': 'bg-orange-50 text-orange-700 border-orange-200',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-red-50 text-red-700 border-red-200',
  'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Under Review': 'bg-amber-50 text-amber-700 border-amber-200',
  'Needs Correction': 'bg-orange-50 text-orange-700 border-orange-200',
  'Archived': 'bg-gray-50 text-gray-600 border-gray-200',
  'High': 'bg-red-50 text-red-700 border-red-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'Low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Open': 'bg-violet-50 text-violet-700 border-violet-200',
  'Resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending Reply': 'bg-amber-50 text-amber-700 border-amber-200',
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Inactive': 'bg-gray-50 text-gray-600 border-gray-200',
  'Compliant': 'bg-blue-50 text-blue-700 border-blue-200',
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? 'bg-gray-50 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {status}
    </span>
  );
}

export function SLABadge({ days }: { days: number }) {
  if (days === 0) return null;
  const urgent = days <= 2;
  const warning = days <= 5;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      urgent ? 'bg-red-50 text-red-700 border-red-200' :
      warning ? 'bg-amber-50 text-amber-700 border-amber-200' :
      'bg-gray-50 text-gray-600 border-gray-200'
    }`}>
      {urgent && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
      {days}d SLA
    </span>
  );
}

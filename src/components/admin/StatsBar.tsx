import type { LeadRecord } from '@/types';

interface StatsBarProps {
  leads: LeadRecord[];
}

export default function StatsBar({ leads }: StatsBarProps) {
  const now = new Date();
  const thisMonth = leads.filter((l) => {
    const d = new Date(l.submittedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { label: 'Total Leads',  value: leads.length },
    { label: 'New',          value: leads.filter((l) => l.status === 'New').length },
    { label: 'Contacted',    value: leads.filter((l) => l.status === 'Contacted').length },
    { label: 'Booked',       value: leads.filter((l) => l.status === 'Booked').length },
    { label: 'Completed',    value: leads.filter((l) => l.status === 'Completed').length },
    { label: 'This Month',   value: thisMonth },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-2">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-[#e0ddd8] p-5 text-center">
          <div className="font-display text-3xl font-black text-[#1a1a1a]">{s.value}</div>
          <p className="text-[#888] text-[10px] font-bold tracking-[0.15em] uppercase mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

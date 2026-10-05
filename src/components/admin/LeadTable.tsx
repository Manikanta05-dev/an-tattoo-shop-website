import type { LeadRecord, LeadStatus } from '@/types';

interface LeadTableProps {
  leads: LeadRecord[];
  onStatusUpdate: (id: string) => void;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  New:       'bg-gray-100 text-gray-700',
  Contacted: 'bg-blue-100 text-blue-700',
  Booked:    'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
};

export default function LeadTable({ leads, onStatusUpdate }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="bg-white border border-[#e0ddd8] p-12 text-center">
        <p className="text-[#aaa] text-sm">No leads yet. Consultation form submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e0ddd8] overflow-x-auto">
      <table className="w-full text-[13px] min-w-[700px]">
        <thead>
          <tr className="border-b border-[#e0ddd8] bg-[#f5f2ec]">
            {['Name', 'Phone', 'Tattoo Idea', 'Preferred Date', 'Status', 'Submitted'].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-[10px] font-black tracking-[0.15em] uppercase text-[#888]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead.id}
              className={`border-b border-[#f0ede8] ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf9f7]'}`}
            >
              <td className="px-5 py-3 font-medium text-[#1a1a1a]">{lead.name}</td>
              <td className="px-5 py-3 text-[#555]">{lead.phone}</td>
              <td className="px-5 py-3 text-[#555] max-w-[160px] truncate">{lead.tattooIdea}</td>
              <td className="px-5 py-3 text-[#555]">{lead.preferredDate}</td>
              <td className="px-5 py-3">
                <button
                  onClick={() => onStatusUpdate(lead.id)}
                  className={`text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${STATUS_COLORS[lead.status]}`}
                  title="Click to advance status"
                >
                  {lead.status}
                </button>
              </td>
              <td className="px-5 py-3 text-[#aaa] text-[11px]">
                {new Date(lead.submittedAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

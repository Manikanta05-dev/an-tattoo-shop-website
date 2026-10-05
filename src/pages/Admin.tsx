import { useEffect } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import { useSEO } from '@/hooks/useSEO';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useLeads } from '@/hooks/useLeads';
import PINEntry from '@/components/admin/PINEntry';
import StatsBar from '@/components/admin/StatsBar';
import LeadTable from '@/components/admin/LeadTable';
import { leadsToCSV, downloadCSV } from '@/lib/csv';

export default function Admin() {
  useSEO('Admin — AN Tattoo Shop', '');

  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex';
    return () => { if (meta) meta.content = ''; };
  }, []);

  const { isAuthenticated, login } = useAdminAuth();
  const { leads, updateLeadStatus, clearLeads } = useLeads();

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <PINEntry onLogin={login} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f5f2ec] pt-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">AN Tattoo Shop</p>
            <h1 className="font-display text-4xl font-black text-[#1a1a1a] uppercase">CRM Dashboard</h1>
          </div>

          {/* Stats */}
          <StatsBar leads={leads} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 my-6">
            <button
              onClick={() => downloadCSV(leadsToCSV(leads), 'an-tattoo-leads.csv')}
              className="bg-[#1a1a1a] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#c0392b] transition-colors duration-200"
            >
              Export CSV
            </button>
            <button
              onClick={() => {
                if (window.confirm('Delete ALL leads? This cannot be undone.')) clearLeads();
              }}
              className="border border-red-400 text-red-500 text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          {/* Lead Table */}
          <LeadTable leads={leads} onStatusUpdate={updateLeadStatus} />
        </div>
      </div>
    </PageTransition>
  );
}

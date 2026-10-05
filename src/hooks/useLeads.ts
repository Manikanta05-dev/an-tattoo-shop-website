import { useState } from 'react';
import type { LeadRecord, LeadStatus } from '../types';
import { storageGet, storageSet } from '../lib/storage';

const LEADS_KEY = 'an_tattoo_leads';

const STATUS_ORDER: LeadStatus[] = ['New', 'Contacted', 'Booked', 'Completed'];

function nextStatus(current: LeadStatus): LeadStatus {
  const idx = STATUS_ORDER.indexOf(current);
  if (idx === -1 || idx === STATUS_ORDER.length - 1) return current;
  return STATUS_ORDER[idx + 1];
}

export function useLeads() {
  const [leads, setLeads] = useState<LeadRecord[]>(() =>
    storageGet<LeadRecord[]>(LEADS_KEY, []),
  );

  function addLead(record: LeadRecord): void {
    setLeads((prev) => {
      const updated = [...prev, record];
      storageSet(LEADS_KEY, updated);
      return updated;
    });
  }

  function updateLeadStatus(id: string): void {
    setLeads((prev) => {
      const updated = prev.map((lead) =>
        lead.id === id ? { ...lead, status: nextStatus(lead.status) } : lead,
      );
      storageSet(LEADS_KEY, updated);
      return updated;
    });
  }

  function clearLeads(): void {
    setLeads([]);
    storageSet(LEADS_KEY, []);
  }

  return { leads, addLead, updateLeadStatus, clearLeads };
}

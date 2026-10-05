import type { LeadRecord } from '../types';

export function createLeadRecord(form: {
  name: string;
  phone: string;
  tattooIdea: string;
  preferredDate: string;
  message: string;
}): LeadRecord {
  return {
    id: crypto.randomUUID(),
    ...form,
    submittedAt: new Date().toISOString(),
    status: 'New',
  };
}

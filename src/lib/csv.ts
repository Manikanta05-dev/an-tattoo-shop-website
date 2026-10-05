import type { LeadRecord } from '../types';

export function leadsToCSV(leads: LeadRecord[]): string {
  const headers = [
    'Name',
    'Phone',
    'Tattoo Idea',
    'Preferred Date',
    'Message',
    'Submitted At',
    'Status',
  ];

  const escapeField = (value: string): string =>
    `"${value.replace(/"/g, '""')}"`;

  const rows = leads.map((l) =>
    [
      l.name,
      l.phone,
      l.tattooIdea,
      l.preferredDate,
      l.message,
      l.submittedAt,
      l.status,
    ]
      .map(escapeField)
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

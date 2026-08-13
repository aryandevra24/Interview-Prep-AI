export const API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL || '/api/v1'
);

export const MAX_RESUME_SIZE = 3 * 1024 * 1024;
export const ACCEPTED_RESUME_TYPE = 'application/pdf';

export const SEVERITY_STYLES = {
  low: {
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    label: 'Low',
  },
  medium: {
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    label: 'Medium',
  },
  high: {
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    label: 'High',
  },
};

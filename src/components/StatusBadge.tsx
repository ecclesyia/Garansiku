import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { getRemainingDays, statusLabels, type WarrantyStatus } from '../utils/dateHelper';

interface Props { status: WarrantyStatus; expiryDate?: string; compact?: boolean }

const styles: Record<WarrantyStatus, string> = {
  ACTIVE: 'border-green-200 bg-green-50 text-green-700',
  EXPIRING_SOON: 'border-amber-200 bg-amber-50 text-amber-700',
  EXPIRED: 'border-red-200 bg-red-50 text-red-700'
};

export function StatusBadge({ status, expiryDate, compact = false }: Props) {
  const Icon = status === 'ACTIVE' ? CheckCircle2 : status === 'EXPIRING_SOON' ? AlertCircle : XCircle;
  const days = expiryDate ? getRemainingDays(expiryDate) : null;
  const detail = days === null || compact ? '' : days < 0 ? ` • ${Math.abs(days)} hari lalu` : ` • Sisa ${days} hari`;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      <Icon size={14} strokeWidth={2} aria-hidden="true" /> {statusLabels[status]}{detail}
    </span>
  );
}

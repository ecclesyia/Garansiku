import { ArrowRight, CalendarDays, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { WarrantyItem } from '../db/schema';
import { formatDisplayDate, getWarrantyStatus } from '../utils/dateHelper';
import { StatusBadge } from './StatusBadge';

export function WarrantyCard({ warranty }: { warranty: WarrantyItem }) {
  const navigate = useNavigate();
  const status = getWarrantyStatus(warranty.expiryDate);
  return (
    <article className="card group overflow-hidden transition hover:border-slate-300 hover:shadow-md">
      <div className="flex gap-4 p-4 sm:p-5">
        <img src={warranty.receiptImageBase64} alt={`Nota ${warranty.productName}`} className="h-24 w-20 shrink-0 rounded-md border border-slate-200 bg-slate-50 object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
            <h2 className="line-clamp-2 text-base font-bold leading-6 text-slate-900">{warranty.productName}</h2>
            <StatusBadge status={status} expiryDate={warranty.expiryDate} />
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Store size={16} strokeWidth={1.75} /> <span className="truncate">{warranty.storeName}</span></p>
            <p className="flex items-center gap-2"><CalendarDays size={16} strokeWidth={1.75} /> Berakhir {formatDisplayDate(warranty.expiryDate)}</p>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(`/garansi/${warranty.id}`)} className="flex min-h-11 w-full items-center justify-between border-t border-slate-100 px-4 text-sm font-semibold text-blue-700 transition hover:bg-slate-50 sm:px-5">
        Lihat detail <ArrowRight size={17} strokeWidth={1.75} className="transition group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

import { ArrowLeft, CalendarDays, FileText, Hash, ShieldCheck, Store } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { db } from '../db';
import { formatDisplayDate, getWarrantyStatus } from '../utils/dateHelper';

export function DetailPage() {
  const { id } = useParams();
  const warrantyId = Number(id);
  const warranty = useLiveQuery(() => Number.isFinite(warrantyId) ? db.warranties.get(warrantyId) : undefined, [warrantyId]);
  const navigate = useNavigate();

  if (warranty === undefined) return <div className="card animate-pulse p-6 text-sm text-slate-500">Memuat detail garansi…</div>;
  if (!warranty) return <div className="card p-6"><h1 className="text-xl font-bold">Garansi tidak ditemukan</h1><button className="btn-secondary mt-4" onClick={() => navigate('/')}><ArrowLeft size={18} /> Kembali ke dashboard</button></div>;

  const rows = [
    { icon: Store, label: 'Toko', value: warranty.storeName },
    { icon: CalendarDays, label: 'Tanggal pembelian', value: formatDisplayDate(warranty.purchaseDate) },
    { icon: ShieldCheck, label: 'Masa garansi', value: `${warranty.durationMonths} bulan • hingga ${formatDisplayDate(warranty.expiryDate)}` },
    { icon: Hash, label: 'Nomor seri', value: warranty.serialNumber || 'Tidak dicantumkan' }
  ];
  return (
    <div>
      <button className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900" onClick={() => navigate('/')}><ArrowLeft size={18} /> Dashboard</button>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="card overflow-hidden">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between"><div><p className="text-sm font-semibold text-blue-700">Kartu garansi digital</p><h1 className="mt-1 text-2xl font-bold text-slate-900">{warranty.productName}</h1></div><StatusBadge status={getWarrantyStatus(warranty.expiryDate)} expiryDate={warranty.expiryDate} /></div>
          </div>
          <dl className="divide-y divide-slate-100 px-5 sm:px-6">
            {rows.map(({ icon: Icon, label, value }) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[190px_1fr]"><dt className="flex items-center gap-2 text-sm font-medium text-slate-500"><Icon size={17} strokeWidth={1.75} /> {label}</dt><dd className="text-sm font-semibold text-slate-900">{value}</dd></div>)}
          </dl>
          <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6"><button className="btn-primary w-full sm:w-auto" onClick={() => navigate(`/garansi/${warranty.id}/klaim`)}><FileText size={18} /> Siapkan klaim</button><p className="mt-2 text-xs leading-5 text-slate-500">Buat Evidence Pack PDF berisi data produk, nota, dan foto kerusakan.</p></div>
        </section>
        <aside className="card overflow-hidden lg:self-start"><div className="border-b border-slate-200 px-5 py-4"><h2 className="font-bold text-slate-900">Foto nota pembelian</h2></div><div className="bg-slate-100 p-4"><img className="mx-auto max-h-[560px] w-full rounded-md border border-slate-200 bg-white object-contain" src={warranty.receiptImageBase64} alt={`Nota pembelian ${warranty.productName}`} /></div></aside>
      </div>
    </div>
  );
}

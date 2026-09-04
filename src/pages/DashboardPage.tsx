import { AlertCircle, ArchiveX, Database, Plus, Search, ShieldCheck } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { EmptyState } from '../components/EmptyState';
import { WarrantyCard } from '../components/WarrantyCard';
import { getWarrantyStatus, type WarrantyStatus } from '../utils/dateHelper';
import { seedDemoData } from '../utils/seedDemoData';

type Filter = 'ALL' | WarrantyStatus;
const filters: Array<{ value: Filter; label: string }> = [
  { value: 'ALL', label: 'Semua' }, { value: 'ACTIVE', label: 'Aktif' },
  { value: 'EXPIRING_SOON', label: 'Hampir berakhir' }, { value: 'EXPIRED', label: 'Berakhir' }
];

export function DashboardPage() {
  const warrantyQuery = useLiveQuery(() => db.warranties.orderBy('createdAt').reverse().toArray(), []);
  const warranties = useMemo(() => warrantyQuery ?? [], [warrantyQuery]);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [query, setQuery] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();

  const counts = useMemo(() => ({
    total: warranties.length,
    expiring: warranties.filter((item) => getWarrantyStatus(item.expiryDate) === 'EXPIRING_SOON').length,
    expired: warranties.filter((item) => getWarrantyStatus(item.expiryDate) === 'EXPIRED').length
  }), [warranties]);

  const visible = useMemo(() => warranties.filter((item) => {
    const matchesStatus = filter === 'ALL' || getWarrantyStatus(item.expiryDate) === filter;
    const term = query.toLowerCase().trim();
    const matchesQuery = !term || `${item.productName} ${item.storeName} ${item.serialNumber ?? ''}`.toLowerCase().includes(term);
    return matchesStatus && matchesQuery;
  }), [filter, query, warranties]);

  const loadDemo = async () => {
    setSeeding(true); setNotice('');
    try { await seedDemoData(); setNotice('Tiga data sampel siap digunakan.'); }
    catch (error: unknown) { setNotice(error instanceof Error ? error.message : 'Data sampel gagal dimuat.'); }
    finally { setSeeding(false); }
  };

  return (
    <div>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">Arsip garansi lokal</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Garansi Anda</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Pantau masa berlaku dan siapkan dokumen klaim tanpa koneksi internet.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex-1 sm:flex-none" onClick={loadDemo} disabled={seeding}><Database size={18} strokeWidth={1.75} /> {seeding ? 'Memuat…' : 'Muat data sampel'}</button>
          <button className="btn-primary flex-1 sm:hidden" onClick={() => navigate('/tambah')}><Plus size={18} /> Tambah</button>
        </div>
      </section>

      {notice && <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800" role="status">{notice}</div>}

      <section className="mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card" aria-label="Ringkasan garansi">
        <div className="p-4 sm:p-5"><ShieldCheck className="mb-3 text-slate-500" size={20} strokeWidth={1.75} /><p className="font-mono text-2xl font-bold text-slate-900">{counts.total}</p><p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Total garansi</p></div>
        <div className="border-x border-slate-200 p-4 sm:p-5"><AlertCircle className="mb-3 text-amber-700" size={20} strokeWidth={1.75} /><p className="font-mono text-2xl font-bold text-amber-800">{counts.expiring}</p><p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Hampir berakhir</p></div>
        <div className="p-4 sm:p-5"><ArchiveX className="mb-3 text-red-700" size={20} strokeWidth={1.75} /><p className="font-mono text-2xl font-bold text-red-800">{counts.expired}</p><p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Berakhir</p></div>
      </section>

      <section className="mt-6 space-y-3">
        <label className="relative block">
          <span className="sr-only">Cari garansi</span><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} strokeWidth={1.75} />
          <input className="field pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk, toko, atau nomor seri" />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter status">
          {filters.map((item) => <button key={item.value} role="tab" aria-selected={filter === item.value} onClick={() => setFilter(item.value)} className={`min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold transition ${filter === item.value ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}>{item.label}</button>)}
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2" aria-live="polite">
        {visible.map((item) => <WarrantyCard key={item.id} warranty={item} />)}
        {visible.length === 0 && <EmptyState filtered={warranties.length > 0} />}
      </section>
    </div>
  );
}

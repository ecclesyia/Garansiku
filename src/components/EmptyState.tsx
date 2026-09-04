import { Archive, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props { filtered?: boolean }

export function EmptyState({ filtered = false }: Props) {
  const navigate = useNavigate();
  return (
    <section className="card col-span-full px-6 py-12 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-lg bg-slate-100 text-slate-500"><Archive size={24} strokeWidth={1.75} /></span>
      <h2 className="mt-4 text-lg font-bold text-slate-900">{filtered ? 'Tidak ada garansi yang cocok' : 'Belum ada garansi tersimpan'}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{filtered ? 'Coba kata pencarian atau filter status lain.' : 'Simpan foto nota dan detail produk agar informasi klaim selalu siap di perangkat ini.'}</p>
      {!filtered && <button className="btn-primary mt-5" onClick={() => navigate('/tambah')}><Plus size={18} /> Tambah garansi pertama</button>}
    </section>
  );
}

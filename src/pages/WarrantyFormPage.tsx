import { ArrowLeft, CalendarClock, Save } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../components/ImageUpload';
import { db } from '../db';
import { calculateExpiryDate, formatDisplayDate } from '../utils/dateHelper';

export function WarrantyFormPage() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [durationMonths, setDurationMonths] = useState(12);
  const [serialNumber, setSerialNumber] = useState('');
  const [receiptImages, setReceiptImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const expiryDate = useMemo(() => calculateExpiryDate(purchaseDate, durationMonths), [purchaseDate, durationMonths]);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    if (!receiptImages[0]) { setError('Foto nota pembelian wajib ditambahkan.'); return; }
    setSaving(true);
    try {
      const id = await db.warranties.add({
        productName: productName.trim(), storeName: storeName.trim(), purchaseDate,
        durationMonths, expiryDate, serialNumber: serialNumber.trim() || undefined,
        receiptImageBase64: receiptImages[0], createdAt: new Date().toISOString()
      });
      navigate(`/garansi/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Garansi gagal disimpan. Coba kurangi ukuran foto.');
    } finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Kembali</button>
      <div className="mb-6"><p className="text-sm font-semibold text-blue-700">Arsip baru</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Tambah garansi</h1><p className="mt-2 text-sm leading-6 text-slate-600">Foto dikompresi dan seluruh data hanya disimpan di perangkat ini.</p></div>
      <form className="card space-y-5 p-4 sm:p-6" onSubmit={(event) => void submit(event)}>
        <ImageUpload images={receiptImages} onChange={setReceiptImages} label="Foto nota pembelian" required />
        <div><label className="label" htmlFor="product">Nama produk <span className="text-red-700">*</span></label><input id="product" className="field" required maxLength={100} value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Contoh: Laptop Kerja Pro 14" /></div>
        <div><label className="label" htmlFor="store">Nama toko <span className="text-red-700">*</span></label><input id="store" className="field" required maxLength={100} value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="Tempat produk dibeli" /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="purchase-date">Tanggal pembelian <span className="text-red-700">*</span></label><input id="purchase-date" className="field" type="date" required max={new Date().toISOString().slice(0, 10)} value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} /></div>
          <div><label className="label" htmlFor="duration">Durasi garansi (bulan) <span className="text-red-700">*</span></label><input id="duration" className="field" type="number" min={1} max={120} required value={durationMonths} onChange={(event) => setDurationMonths(Number(event.target.value))} /></div>
        </div>
        {expiryDate && <div className="flex items-center gap-3 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900"><CalendarClock className="shrink-0 text-blue-700" size={20} strokeWidth={1.75} /><span>Garansi diperkirakan berakhir pada <strong>{formatDisplayDate(expiryDate)}</strong>.</span></div>}
        <div><label className="label" htmlFor="serial">Nomor seri <span className="font-normal text-slate-500">(opsional)</span></label><input id="serial" className="field" maxLength={80} value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} placeholder="Nomor seri pada produk atau kemasan" /></div>
        {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end"><button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Batal</button><button type="submit" className="btn-primary" disabled={saving}><Save size={18} /> {saving ? 'Menyimpan…' : 'Simpan garansi'}</button></div>
      </form>
    </div>
  );
}

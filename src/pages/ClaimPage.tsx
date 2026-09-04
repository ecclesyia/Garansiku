import { ArrowLeft, Download, Eye, FileCheck2, LoaderCircle } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { type FormEvent, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EvidencePack } from '../components/EvidencePack';
import { ImageUpload } from '../components/ImageUpload';
import { db } from '../db';
import type { ClaimEvidence } from '../db/schema';
import { generateEvidencePdf } from '../utils/pdfGenerator';

export function ClaimPage() {
  const { id } = useParams();
  const warrantyId = Number(id);
  const warranty = useLiveQuery(() => Number.isFinite(warrantyId) ? db.warranties.get(warrantyId) : undefined, [warrantyId]);
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const [damageDate, setDamageDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const claim = useMemo<ClaimEvidence>(() => ({ warrantyId, damageDate, damageDescription: description, damagePhotosBase64: photos, generatedAt: new Date().toISOString() }), [warrantyId, damageDate, description, photos]);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    if (!warranty || !previewRef.current) return;
    if (photos.length === 0) { setError('Tambahkan minimal satu foto kerusakan.'); return; }
    setGenerating(true);
    try {
      await db.claims.add({ ...claim, generatedAt: new Date().toISOString() });
      await generateEvidencePdf(previewRef.current, `evidence-pack-${warranty.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'PDF gagal dibuat. Pastikan penyimpanan perangkat masih tersedia.');
    } finally { setGenerating(false); }
  };

  if (warranty === undefined) return <div className="card p-6 text-sm text-slate-500">Memuat formulir klaim…</div>;
  if (!warranty) return <div className="card p-6"><h1 className="text-xl font-bold">Garansi tidak ditemukan</h1><button className="btn-secondary mt-4" onClick={() => navigate('/')}><ArrowLeft size={18} /> Dashboard</button></div>;

  return (
    <div>
      <button className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900" onClick={() => navigate(`/garansi/${warranty.id}`)}><ArrowLeft size={18} /> Detail garansi</button>
      <div className="mb-6"><p className="text-sm font-semibold text-blue-700">Evidence Pack</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Siapkan dokumen klaim</h1><p className="mt-2 text-sm leading-6 text-slate-600">Lengkapi kronologi dan bukti kerusakan untuk <strong>{warranty.productName}</strong>.</p></div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form className="card space-y-5 p-4 sm:p-6" onSubmit={(event) => void submit(event)}>
          <div><label className="label" htmlFor="damage-date">Tanggal kejadian <span className="text-red-700">*</span></label><input id="damage-date" className="field" type="date" required max={new Date().toISOString().slice(0, 10)} value={damageDate} onChange={(event) => setDamageDate(event.target.value)} /></div>
          <div><label className="label" htmlFor="description">Deskripsi kerusakan <span className="text-red-700">*</span></label><textarea id="description" className="field min-h-32 resize-y" required minLength={10} maxLength={1200} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Jelaskan gejala, kondisi produk, dan kapan masalah mulai terjadi." /><p className="mt-1.5 text-xs text-slate-500">{description.length}/1200 karakter</p></div>
          <ImageUpload images={photos} onChange={setPhotos} maxImages={3} label="Foto kerusakan" required />
          {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end"><button type="button" className="btn-secondary" onClick={() => setShowPreview((value) => !value)}><Eye size={18} /> {showPreview ? 'Tutup preview' : 'Lihat preview'}</button><button className="btn-primary" type="submit" disabled={generating}>{generating ? <LoaderCircle className="animate-spin" size={18} /> : <Download size={18} />} {generating ? 'Membuat PDF…' : 'Unduh PDF'}</button></div>
        </form>
        <aside className="card self-start p-5"><FileCheck2 className="text-blue-700" size={26} strokeWidth={1.75} /><h2 className="mt-3 font-bold text-slate-900">Isi dokumen</h2><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>Identitas produk dan toko</li><li>Detail kejadian kerusakan</li><li>Foto nota dan kerusakan</li><li>Checklist kelengkapan klaim</li><li>Timestamp pembuatan lokal</li></ul><p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">PDF dibuat langsung di perangkat. Tidak ada foto atau data yang dikirim ke server.</p></aside>
      </div>

      {showPreview && <section className="no-print mt-6 overflow-hidden rounded-lg border border-slate-300 bg-slate-200"><div className="border-b border-slate-300 bg-white px-4 py-3"><h2 className="font-bold text-slate-900">Preview Evidence Pack</h2></div><div className="overflow-x-auto p-4"><div className="origin-top-left shadow-xl"><EvidencePack warranty={warranty} claim={claim} /></div></div></section>}

      <div className="fixed -left-[10000px] top-0" aria-hidden="true"><div ref={previewRef}><EvidencePack warranty={warranty} claim={claim} /></div></div>
    </div>
  );
}

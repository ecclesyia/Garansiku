import type { ClaimEvidence, WarrantyItem } from '../db/schema';
import { formatDisplayDate, getWarrantyStatus, statusLabels } from '../utils/dateHelper';

interface Props { warranty: WarrantyItem; claim: ClaimEvidence }

export function EvidencePack({ warranty, claim }: Props) {
  const status = statusLabels[getWarrantyStatus(warranty.expiryDate)];
  const rows = [
    ['Nama produk', warranty.productName], ['Toko', warranty.storeName],
    ['Tanggal pembelian', formatDisplayDate(warranty.purchaseDate)], ['Masa garansi', `${warranty.durationMonths} bulan`],
    ['Nomor seri', warranty.serialNumber || '-'], ['Status garansi', status]
  ];
  return (
    <article className="mx-auto w-[794px] bg-white p-12 font-sans text-slate-900" style={{ minHeight: 1123 }}>
      <header className="flex items-start justify-between border-b-2 border-slate-800 pb-6">
        <div><p className="text-[13px] font-bold uppercase tracking-[0.16em] text-blue-700">GaransiKu</p><h1 className="mt-2 max-w-xl text-2xl font-bold leading-tight">Document Evidence Pack Klaim Garansi</h1></div>
        <div className="text-right text-[12px] leading-5 text-slate-500"><p className="font-semibold text-slate-700">Tanggal dibuat</p><p>{formatDisplayDate(claim.generatedAt.slice(0, 10))}</p></div>
      </header>
      <section className="mt-7 break-inside-avoid"><h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">1. Identitas Produk & Toko</h2><table className="w-full border-collapse text-[13px]"><tbody>{rows.map(([label, value]) => <tr key={label}><th className="w-[34%] border border-slate-300 bg-slate-50 px-4 py-2.5 text-left font-semibold text-slate-600">{label}</th><td className="border border-slate-300 px-4 py-2.5 font-medium">{value}</td></tr>)}</tbody></table></section>
      <section className="mt-7 break-inside-avoid"><h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">2. Detail Kerusakan</h2><div className="border border-slate-300"><div className="grid grid-cols-[34%_1fr] border-b border-slate-300 text-[13px]"><p className="bg-slate-50 px-4 py-2.5 font-semibold text-slate-600">Tanggal kejadian</p><p className="px-4 py-2.5 font-medium">{formatDisplayDate(claim.damageDate)}</p></div><div className="p-4 text-[13px]"><p className="mb-2 font-semibold text-slate-600">Deskripsi kerusakan</p><p className="whitespace-pre-wrap leading-6">{claim.damageDescription}</p></div></div></section>
      <section className="mt-7"><h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">3. Bukti Foto</h2><div className="break-inside-avoid"><p className="mb-2 text-[12px] font-semibold text-slate-600">Bukti 1 — Nota Pembelian</p><div className="flex h-64 items-center justify-center border border-slate-300 bg-slate-50 p-2"><img src={warranty.receiptImageBase64} className="h-full w-full object-contain" alt="Nota pembelian" /></div></div>{claim.damagePhotosBase64.length > 0 && <div className="mt-5 break-inside-avoid"><p className="mb-2 text-[12px] font-semibold text-slate-600">Bukti 2 — Kondisi Kerusakan</p><div className={`grid gap-3 ${claim.damagePhotosBase64.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>{claim.damagePhotosBase64.map((photo, index) => <div key={index} className="flex h-52 items-center justify-center border border-slate-300 bg-slate-50 p-2"><img src={photo} className="h-full w-full object-contain" alt={`Kerusakan ${index + 1}`} /></div>)}</div></div>}</section>
      <section className="mt-7 break-inside-avoid"><h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">4. Checklist Kelengkapan Klaim</h2><div className="grid grid-cols-2 gap-x-6 gap-y-3 border border-slate-300 p-4 text-[13px]">{['[x] Nota asli / foto nota','[x] Fisik produk','[x] Kartu garansi / Evidence Pack','[ ] Kelengkapan box / aksesori'].map((item) => <p key={item} className="font-medium">{item}</p>)}</div></section>
      <footer className="mt-9 border-t border-slate-300 pt-4 text-center text-[11px] text-slate-500">Document generated automatically via GaransiKu PWA (Local-Only Verification).</footer>
    </article>
  );
}

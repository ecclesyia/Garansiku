import { addDays, format, subMonths } from 'date-fns';
import { db } from '../db';
import type { WarrantyItem } from '../db/schema';

function placeholderReceipt(title: string, store: string, color: string): string {
  const safeTitle = title.replace(/[<>&'"]/g, '');
  const safeStore = store.replace(/[<>&'"]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="#f8fafc"/><rect x="90" y="80" width="720" height="1040" rx="18" fill="white" stroke="#cbd5e1" stroke-width="5"/><rect x="90" y="80" width="720" height="120" rx="18" fill="${color}"/><text x="450" y="155" text-anchor="middle" font-family="Arial" font-size="38" font-weight="700" fill="white">BUKTI PEMBELIAN</text><text x="140" y="300" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">${safeStore}</text><text x="140" y="375" font-family="Arial" font-size="28" fill="#475569">${safeTitle}</text><path d="M140 440h620M140 510h620M140 580h430M140 750h620" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/><text x="140" y="860" font-family="Arial" font-size="25" fill="#64748b">Data sampel demonstrasi</text><rect x="140" y="930" width="300" height="70" fill="#e2e8f0"/><rect x="470" y="930" width="80" height="70" fill="#94a3b8"/><rect x="575" y="930" width="185" height="70" fill="#cbd5e1"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

export async function seedDemoData(): Promise<void> {
  try {
    const now = new Date();
    const existing = await db.warranties.where('productName').startsWith('[Demo]').count();
    if (existing > 0) return;

    const rows: WarrantyItem[] = [
      {
        productName: '[Demo] Laptop Kerja Pro 14', storeName: 'Nusa Digital',
        purchaseDate: format(subMonths(now, 4), 'yyyy-MM-dd'), durationMonths: 24,
        expiryDate: format(addDays(now, 420), 'yyyy-MM-dd'), serialNumber: 'GK-LP-240901',
        receiptImageBase64: placeholderReceipt('Laptop Kerja Pro 14', 'Nusa Digital', '#1e3a8a'), createdAt: now.toISOString()
      },
      {
        productName: '[Demo] Mesin Kopi Mini', storeName: 'Rumah Perkakas',
        purchaseDate: format(subMonths(now, 11), 'yyyy-MM-dd'), durationMonths: 12,
        expiryDate: format(addDays(now, 18), 'yyyy-MM-dd'), serialNumber: 'GK-MK-110238',
        receiptImageBase64: placeholderReceipt('Mesin Kopi Mini', 'Rumah Perkakas', '#92400e'), createdAt: now.toISOString()
      },
      {
        productName: '[Demo] Headphone Studio', storeName: 'Audio Sentra',
        purchaseDate: format(subMonths(now, 15), 'yyyy-MM-dd'), durationMonths: 12,
        expiryDate: format(addDays(now, -74), 'yyyy-MM-dd'), serialNumber: 'GK-HS-904431',
        receiptImageBase64: placeholderReceipt('Headphone Studio', 'Audio Sentra', '#991b1b'), createdAt: now.toISOString()
      }
    ];
    await db.warranties.bulkAdd(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Data demo gagal dimuat.';
    throw new Error(message);
  }
}

import { addMonths, differenceInCalendarDays, format, isValid, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export type WarrantyStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';

export function calculateExpiryDate(purchaseDate: string, durationMonths: number): string {
  const parsed = parseISO(purchaseDate);
  if (!isValid(parsed) || durationMonths < 1) return '';
  return format(addMonths(parsed, durationMonths), 'yyyy-MM-dd');
}

export function getRemainingDays(expiryDate: string, today = new Date()): number {
  const parsed = parseISO(expiryDate);
  return isValid(parsed) ? differenceInCalendarDays(parsed, today) : 0;
}

export function getWarrantyStatus(expiryDate: string, today = new Date()): WarrantyStatus {
  const days = getRemainingDays(expiryDate, today);
  if (days < 0) return 'EXPIRED';
  if (days <= 30) return 'EXPIRING_SOON';
  return 'ACTIVE';
}

export function formatDisplayDate(value: string): string {
  const parsed = parseISO(value);
  return isValid(parsed) ? format(parsed, 'd MMMM yyyy', { locale: id }) : '-';
}

export const statusLabels: Record<WarrantyStatus, string> = {
  ACTIVE: 'Aktif',
  EXPIRING_SOON: 'Hampir berakhir',
  EXPIRED: 'Berakhir'
};

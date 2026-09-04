import Dexie, { type EntityTable } from 'dexie';
import type { ClaimEvidence, WarrantyItem } from './schema';

class GaransiKuDatabase extends Dexie {
  warranties!: EntityTable<WarrantyItem, 'id'>;
  claims!: EntityTable<ClaimEvidence, 'id'>;

  constructor() {
    super('GaransiKuLiteDB');
    this.version(1).stores({
      warranties: '++id, productName, storeName, purchaseDate, expiryDate, createdAt',
      claims: '++id, warrantyId, damageDate, generatedAt'
    });
  }
}

export const db = new GaransiKuDatabase();

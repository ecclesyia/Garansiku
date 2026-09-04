export interface WarrantyItem {
  id?: number;
  productName: string;
  storeName: string;
  purchaseDate: string;
  durationMonths: number;
  expiryDate: string;
  serialNumber?: string;
  receiptImageBase64: string;
  createdAt: string;
}

export interface ClaimEvidence {
  id?: number;
  warrantyId: number;
  damageDate: string;
  damageDescription: string;
  damagePhotosBase64: string[];
  generatedAt: string;
}

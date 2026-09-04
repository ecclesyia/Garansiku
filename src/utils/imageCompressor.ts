import imageCompression from 'browser-image-compression';

const MAX_SOURCE_SIZE = 12 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export async function compressImageToBase64(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Format foto harus JPG, PNG, WebP, atau HEIC.');
  }
  if (file.size > MAX_SOURCE_SIZE) {
    throw new Error('Ukuran foto maksimal 12 MB.');
  }

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.75,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.82
    });
    return await imageCompression.getDataUrlFromFile(compressed);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Foto tidak dapat diproses.';
    throw new Error(message);
  }
}

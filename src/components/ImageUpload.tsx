import { Camera, ImagePlus, LoaderCircle, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { compressImageToBase64 } from '../utils/imageCompressor';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label: string;
  required?: boolean;
}

export function ImageUpload({ images, onChange, maxImages = 1, label, required = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const processFiles = async (files: FileList | null) => {
    if (!files) return;
    setProcessing(true); setError('');
    try {
      const remaining = maxImages - images.length;
      const selected = Array.from(files).slice(0, remaining);
      const compressed = await Promise.all(selected.map(compressImageToBase64));
      onChange([...images, ...compressed]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Foto gagal diproses.');
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="label">{label}{required && <span className="text-red-700"> *</span>}</label>
      <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple={maxImages > 1} onChange={(event) => void processFiles(event.target.files)} />
      {images.length < maxImages && (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={processing} className="flex min-h-36 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50/50 disabled:opacity-60">
          {processing ? <LoaderCircle className="animate-spin text-blue-600" size={28} /> : <ImagePlus className="text-slate-500" size={28} strokeWidth={1.75} />}
          <span className="mt-3 text-sm font-semibold text-slate-800">{processing ? 'Mengompresi foto…' : `Klik untuk pilih foto (${images.length}/${maxImages})`}</span>
          <span className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, atau HEIC • Maks. 12 MB per foto</span>
        </button>
      )}
      {images.length > 0 && <div className={`mt-3 grid gap-3 ${maxImages > 1 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {images.map((image, index) => (
          <div key={`${image.slice(-20)}-${index}`} className="relative overflow-hidden rounded-md border border-slate-200 bg-slate-50">
            <img src={image} alt={`${label} ${index + 1}`} className="h-36 w-full object-contain" />
            <button type="button" onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-2 top-2 grid size-11 place-items-center rounded-md border border-red-200 bg-white text-red-700 shadow-sm hover:bg-red-50" aria-label={`Hapus foto ${index + 1}`}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>}
      {error && <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700" role="alert"><Camera size={16} /> {error}</p>}
    </div>
  );
}

import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const capture = (event: Event) => { event.preventDefault(); setPromptEvent(event as BeforeInstallPromptEvent); };
    window.addEventListener('beforeinstallprompt', capture);
    return () => window.removeEventListener('beforeinstallprompt', capture);
  }, []);

  if (!promptEvent || hidden) return null;
  const install = async () => {
    await promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === 'accepted') setPromptEvent(null);
  };
  return (
    <div className="border-b border-blue-200 bg-blue-50 no-print">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Download className="shrink-0 text-blue-700" size={20} strokeWidth={1.75} />
        <p className="flex-1 text-sm text-blue-900"><strong>Pasang GaransiKu</strong> agar mudah dibuka dan tetap siap saat offline.</p>
        <button className="btn-primary min-h-9 px-3 py-1.5" onClick={install}>Pasang</button>
        <button className="grid size-11 place-items-center rounded-md text-blue-800 hover:bg-blue-100" aria-label="Tutup pemberitahuan" onClick={() => setHidden(true)}><X size={18} /></button>
      </div>
    </div>
  );
}

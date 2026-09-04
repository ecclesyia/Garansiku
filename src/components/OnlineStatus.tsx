import { Cloud, CloudOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export function OnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    return () => { window.removeEventListener('online', sync); window.removeEventListener('offline', sync); };
  }, []);
  const Icon = online ? Cloud : CloudOff;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${online ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
      <Icon size={14} strokeWidth={1.75} /> {online ? 'Online' : 'Mode offline'}
    </span>
  );
}

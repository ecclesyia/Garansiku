import { FilePlus2, Home, Plus, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InstallPrompt } from './InstallPrompt';
import { OnlineStatus } from './OnlineStatus';

interface Props { children: ReactNode }

export function AppShell({ children }: Props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      <InstallPrompt />
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm no-print">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <button className="flex min-h-11 items-center gap-2 text-left" onClick={() => navigate('/')} aria-label="Buka dashboard">
            <span className="grid size-9 place-items-center rounded-md bg-slate-800 text-white"><ShieldCheck size={21} strokeWidth={1.75} /></span>
            <span className="text-lg font-bold tracking-tight text-slate-900">GaransiKu</span>
          </button>
          <div className="ml-auto flex items-center gap-3">
            <OnlineStatus />
            <button className="btn-primary hidden sm:inline-flex" onClick={() => navigate('/tambah')}><Plus size={18} strokeWidth={2} /> Tambah garansi</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 md:hidden no-print" aria-label="Navigasi utama">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <NavLink to="/" className={({ isActive }) => `flex min-h-12 items-center justify-center gap-2 rounded-md text-sm font-semibold ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}><Home size={19} strokeWidth={1.75} /> Dashboard</NavLink>
          <NavLink to="/tambah" className={({ isActive }) => `flex min-h-12 items-center justify-center gap-2 rounded-md text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500'}`}><FilePlus2 size={19} strokeWidth={1.75} /> Tambah</NavLink>
        </div>
      </nav>
    </div>
  );
}

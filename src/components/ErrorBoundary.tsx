import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo): void { console.error('UI error:', error, info); }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <section className="card max-w-md p-6 text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-700" size={32} strokeWidth={1.75} />
          <h1 className="text-xl font-bold text-slate-900">Aplikasi perlu dimuat ulang</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Data Anda tetap tersimpan di perangkat. Muat ulang untuk melanjutkan.</p>
          <button className="btn-primary mt-5 w-full" onClick={() => window.location.reload()}>
            <RotateCcw size={18} strokeWidth={1.75} /> Muat ulang
          </button>
        </section>
      </main>
    );
  }
}

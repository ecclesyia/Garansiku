import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { ClaimPage } from './pages/ClaimPage';
import { DashboardPage } from './pages/DashboardPage';
import { DetailPage } from './pages/DetailPage';
import { WarrantyFormPage } from './pages/WarrantyFormPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tambah" element={<WarrantyFormPage />} />
        <Route path="/garansi/:id" element={<DetailPage />} />
        <Route path="/garansi/:id/klaim" element={<ClaimPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

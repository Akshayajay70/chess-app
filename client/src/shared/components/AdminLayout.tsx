import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSideBar';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Sidebar */}
      <AdminSidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
} 
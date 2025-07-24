import type { ReactNode } from 'react';
import { Logo } from '../../../shared/components/Logo';

interface AdminLoginLayoutProps {
  children: ReactNode;
  logoSize?: string;
}

export function AdminLoginLayout({ children, logoSize = "w-32 h-8" }: AdminLoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">

      {/* Header */}
      <div className="absolute top-8 left-8">
        <Logo className={logoSize} />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
} 
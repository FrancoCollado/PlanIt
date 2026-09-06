import { useState } from 'react';
import { HorizontalCard } from './modules/businesses/components/HorizontalCard';
import AuthPage from './modules/auth/pages/AuthPage'; 
import Dashboard from './modules/businesses/components/dashboard';
import type { UserRole } from './modules/auth/components/LoginForm';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  if (!userRole) {
    return (
      <main className="w-full min-h-screen">
        <AuthPage onLoginSuccess={(role) => setUserRole(role)} />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
      
      {/* 1. Primero el Dashboard */}
      <Dashboard role={userRole} onLogout={() => setUserRole(null)} />

    </main>
  );
}
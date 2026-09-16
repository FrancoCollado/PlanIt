import { useState } from 'react';
import AuthPage from './modules/auth/pages/AuthPage'; 
import Dashboard from './modules/businesses/components/dashboard';
import ClienteDashboard from './modules/clientes/components/dashboard';
import AdminDashboard from './modules/admin/components/dashboard';
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

  // Si el rol es "client", mostramos el dashboard de clientes.
  // Si el rol es "admin", mostramos el dashboard de administración.
  // Para cualquier otro rol (business), se muestra el dashboard de empresa.
  if (userRole === 'client') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <ClienteDashboard onLogout={() => setUserRole(null)} />
      </main>
    );
  }

  if (userRole === 'admin') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <AdminDashboard onLogout={() => setUserRole(null)} />
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
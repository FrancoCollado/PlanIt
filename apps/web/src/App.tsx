import { useState } from 'react';
import AuthPage from './modules/auth/pages/AuthPage';
import Dashboard from './modules/businesses/components/dashboard';
import ClienteDashboard from './modules/clientes/components/dashboard';
import AdminDashboard from './modules/admin/components/dashboard';
import type { AuthUser } from './modules/auth/components/LoginForm';

export default function App() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  if (!authUser) {
    return (
      <main className="w-full min-h-screen">
        <AuthPage onLoginSuccess={(user) => setAuthUser(user)} />
      </main>
    );
  }

  const userRole = authUser.role;

  // CLIENTE
  if (userRole === 'client') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <ClienteDashboard
          nombreUsuario={authUser.nombre}
          onLogout={() => setAuthUser(null)}
        />
      </main>
    );
  }

  // ADMINISTRADOR
  if (userRole === 'admin') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <AdminDashboard onLogout={() => setAuthUser(null)} />
      </main>
    );
  }

  // EMPRESA
  return (
    <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
      <Dashboard
        role={userRole}
        usuarioId={authUser.id}
        onLogout={() => setAuthUser(null)}
      />
    </main>
  );
}
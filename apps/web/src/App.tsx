import { useState } from 'react';

import AuthPage from './modules/auth/pages/AuthPage';

import Dashboard from './modules/businesses/components/dashboard';
import ClienteDashboard from './modules/clientes/components/dashboard';
import AdminDashboard from './modules/admin/components/dashboard';

import type { UsuarioAutenticado } from './modules/auth/components/LoginForm';

export default function App() {
  const [UsuarioAutenticado, setUsuarioAutenticado] = useState<UsuarioAutenticado | null>(null);

  if (!UsuarioAutenticado) {
    return (
      <main className="w-full min-h-screen">
        <AuthPage alIniciarSesion={(user) => setUsuarioAutenticado(user)} />
      </main>
    );
  }

  const userRole = UsuarioAutenticado.role;

  // CLIENTE
  if (userRole === 'client') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <ClienteDashboard
          nombreUsuario={UsuarioAutenticado.nombre}
          token={UsuarioAutenticado.token}
          onLogout={() => setUsuarioAutenticado(null)}
        />
      </main>
    );
  }

  // ADMINISTRADOR
  if (userRole === 'admin') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <AdminDashboard token={UsuarioAutenticado.token} onLogout={() => setUsuarioAutenticado(null)} />
      </main>
    );
  }

  // EMPRESA
  return (
    <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
      <Dashboard
        usuarioId={UsuarioAutenticado.id}
        token={UsuarioAutenticado.token}
        onLogout={() => setUsuarioAutenticado(null)}
      />
    </main>
  );
}
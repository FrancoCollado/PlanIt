import { useState } from 'react';

import AuthPage from './modules/auth/pages/AuthPage';

import Dashboard from './modules/businesses/components/dashboard';
import ClienteDashboard from './modules/clientes/components/dashboard';
import AdminDashboard from './modules/admin/components/dashboard';

import type { UsuarioAutenticado } from './modules/auth/components/LoginForm';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<UsuarioAutenticado | null>(null);

  if (!usuarioAutenticado) {
    return (
      <main className="w-full min-h-screen">
        <AuthPage alIniciarSesion={(user) => setUsuarioAutenticado(user)} />
      </main>
    );
  }

  const userRole = usuarioAutenticado.role;

  // CLIENTE
  if (userRole === 'cliente') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <ClienteDashboard
          nombreUsuario={usuarioAutenticado.nombre}
          token={usuarioAutenticado.token}
          onLogout={() => setUsuarioAutenticado(null)}
        />
      </main>
    );
  }

  // ADMINISTRADOR
  if (userRole === 'admin') {
    return (
      <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
        <AdminDashboard token={usuarioAutenticado.token} onLogout={() => setUsuarioAutenticado(null)} />
      </main>
    );
  }

  // EMPRESA
  return (
    <main className="w-full min-h-screen p-6 flex flex-col items-center gap-6">
      <Dashboard
        usuarioId={usuarioAutenticado.id}
        token={usuarioAutenticado.token}
        onLogout={() => setUsuarioAutenticado(null)}
      />
    </main>
  );
}
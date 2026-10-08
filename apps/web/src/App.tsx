import { useState } from 'react';

import AuthPage from './modules/auth/pages/AuthPage';

import Dashboard from './modules/empresas/components/Dashboard';
import ClienteDashboard from './modules/clientes/components/Dashboard';
import AdminDashboard from './modules/admin/components/Dashboard';

import type { UsuarioAutenticado } from './modules/auth/components/LoginForm';
import './App.scss';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<UsuarioAutenticado | null>(null);

  if (!usuarioAutenticado) {
    return (
      <main className="contenedor-app">
        <AuthPage alIniciarSesion={(user) => setUsuarioAutenticado(user)} />
      </main>
    );
  }

  const userRole = usuarioAutenticado.role;

  // CLIENTE
  if (userRole === 'cliente') {
    return (
      <main className="contenedor-app contenedor-dashboard">
        <ClienteDashboard
          nombreUsuario={usuarioAutenticado.nombre}
          token={usuarioAutenticado.token}
          onLogout={() => setUsuarioAutenticado(null)}
        />
      </main>
    );
  }

  // ADMINISTRADOR
// ADMINISTRADOR
if (userRole === 'admin') {
  return (
    <main className="contenedor-app contenedor-dashboard">
      <AdminDashboard
        token={usuarioAutenticado.token}
        onLogout={() => setUsuarioAutenticado(null)}
      />
    </main>
  );
}

  // EMPRESA
  return (
    <main className="contenedor-app contenedor-dashboard">
      <Dashboard
        usuarioId={usuarioAutenticado.id}
        token={usuarioAutenticado.token}
        onLogout={() => setUsuarioAutenticado(null)}
      />
    </main>
  );
}
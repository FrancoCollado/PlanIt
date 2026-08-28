import React, { useState } from 'react';
import AuthPage from './modules/auth/pages/AuthPage'; 
import Dashboard from './modules/businesses/components/dashboard';
import type { UserRole } from './modules/auth/components/LoginForm';

export default function App() {
  // Guardamos el rol del usuario logueado. Si es null, significa que no inició sesión.
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Si no hay ningún usuario autenticado, MOSTRAR SIEMPRE EL LOGIN
  if (!userRole) {
    return (
      <main className="w-full min-h-screen">
        <AuthPage onLoginSuccess={(role) => setUserRole(role)} />
      </main>
    );
  }

  // Si ya inició sesión, mostramos el Dashboard correspondiente
  return (
    <main className="w-full min-h-screen">
      <Dashboard role={userRole} onLogout={() => setUserRole(null)} />
    </main>
  );
}
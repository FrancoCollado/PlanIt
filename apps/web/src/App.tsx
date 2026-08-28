// apps/web/src/App.tsx
import React, { useState } from 'react';
import { AuthPage } from './modules/auth/pages/AuthPage';
import Dashboard from './modules/businesses/components/dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <main className="w-full min-h-screen">
      {!isAuthenticated ? (
        <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      )}
    </main>
  );
}
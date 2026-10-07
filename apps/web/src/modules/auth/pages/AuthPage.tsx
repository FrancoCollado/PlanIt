// apps/web/src/modules/auth/pages/AuthPage.tsx

import React, { useState } from 'react';
import { AuthCard } from '../components/AuthCard';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import type { AuthUser } from '../components/LoginForm';
import './AuthPage.scss';

interface AuthPageProps {
  onLoginSuccess?: (user: AuthUser) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleRegisterSuccess = (user?: AuthUser) => {
    if (user) {
      onLoginSuccess?.(user);
    }
  };

  return (
    <div className="auth-page">en
      <div className="auth-background" />

      <AuthCard>
        {view === 'login' ? (
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onRegisterClick={() => setView('register')}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={handleRegisterSuccess}
            onLoginClick={() => setView('login')}
          />
        )}
      </AuthCard>
    </div>
  );
};

export default AuthPage;
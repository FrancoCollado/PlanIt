// apps/web/src/modules/auth/pages/AuthPage.tsx

import React, { useState } from 'react';
import { AuthCard } from '../components/AuthCard';
import { FormularioLogin } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import type { UsuarioAutenticado} from '../components/LoginForm';
import './AuthPage.scss';

interface AuthPageProps {
  alIniciarSesion?: (user: UsuarioAutenticado) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ alIniciarSesion }) => {
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleRegisterSuccess = (user?: UsuarioAutenticado) => {
    if (user) {
      alIniciarSesion?.(user);
    }
  };

  return (
    <div className="auth-page">en
      <div className="auth-background" />

      <AuthCard>
        {view === 'login' ? (
          <FormularioLogin
            alIniciarSesion={alIniciarSesion}
            alSolicitarRegistro={() => setView('register')}
          />
        ) : (
          <RegisterForm
            alSolicitarRegistro={handleRegisterSuccess}
            onLoginClick={() => setView('login')}
          />
        )}
      </AuthCard>
    </div>
  );
};

export default AuthPage;
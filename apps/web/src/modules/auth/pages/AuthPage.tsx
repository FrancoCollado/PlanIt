// apps/web/src/modules/auth/pages/AuthPage.tsx
import React from 'react';
import styled from 'styled-components';
import { AuthCard } from '../components/AuthCard';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import type { UserRole } from '../components/LoginForm';

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center; /* Centrado perfecto horizontal y vertical */
  position: relative;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transform: scale(1.1);
  z-index: -1;
`;

interface AuthPageProps {
  onLoginSuccess?: (role: UserRole) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  return (
    <PageWrapper>
      <BlurredBackground />
      <AuthCard
        loginForm={<LoginForm onLoginSuccess={onLoginSuccess} />}
        registerForm={<RegisterForm />}
      />
    </PageWrapper>
  );
};
export default AuthPage;
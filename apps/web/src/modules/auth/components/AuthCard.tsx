// apps/web/src/modules/auth/components/AuthCard.tsx
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem; /* Relleno ajustado */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LogoTitle = styled.h1`
  font-size: 1.5rem;
  color: #1a237e;
  font-weight: bold;
  margin: 0;
`;

const LogoSubtitle = styled.p`
  font-size: 0.8rem;
  color: #757575;
  margin: 0;
`;

const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: #e0e0e0;
  align-self: stretch;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
    margin: 1rem 0;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface AuthCardProps {
  loginForm: React.ReactNode;
  registerForm: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ loginForm, registerForm }) => {
  return (
    <CardContainer>
      <LogoContainer>
        <LogoTitle>PlanIt</LogoTitle>
        <LogoSubtitle>PlanIt - Acceso Integral</LogoSubtitle>
      </LogoContainer>

      <ColumnsContainer>
        <Column>{loginForm}</Column>
        <Divider />
        <Column>{registerForm}</Column>
      </ColumnsContainer>
    </CardContainer>
  );
};
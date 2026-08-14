// apps/web/src/modules/auth/components/LoginForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
// Puedes usar una librería de iconos como 'react-icons' o SVGs
// import { FiMail, FiLock, FiLogIn, FiUser, FiCheckCircle } from 'react-icons/fi';
// import { FcGoogle } from 'react-icons/fc';
// import { FaFacebook } from 'react-icons/fa';

// --- Styled Components de UI Compartida ---

export const FormTitle = styled.h2`
  font-size: 1.6rem;
  color: #1a237e; /* Azul oscuro */
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
`;

export const FormSubtitle = styled.p`
  color: #616161;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
  color: #424242;
  margin-bottom: 0.3rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconPlaceholder = styled.div`
  position: absolute;
  left: 1rem;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Reemplazar por Iconos reales: height: 16px; width: 16px; */
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem; /* Espacio extra a la izquierda para el icono */
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
  }
`;

export const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #616161;
  cursor: pointer;

  input {
    margin-right: 0.5rem;
  }
`;

export const ForgotPasswordLink = styled.a`
  color: #616161;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PrimaryButton = styled.button<{ color?: string }>`
  background-color: ${props => props.color || '#009688'}; /* Teal por defecto */
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SocialLoginContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialText = styled.p`
  font-size: 0.85rem;
  color: #757575;
  margin-bottom: 1rem;
`;

const SocialIconsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialIconCircle = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// --- Componente ---

export const LoginForm: React.FC = () => {
  // Estado local para los inputs (SOLO UI)
  const [email, setEmail] = useState('ejemplo@correo.com');
  const [password, setPassword] = useState('**********');
  const [remember, setRemember] = useState(false);

  return (
    <form onSubmit={(e) => e.preventDefault()}> {/* Prevenir recarga de página por ahora */}
      <FormTitle>INICIAR SESIÓN</FormTitle>
      <FormSubtitle>¡Bienvenido de nuevo! Ingresa tus datos.</FormSubtitle>

      <InputGroup>
        <Label>Correo Electrónico</Label>
        <InputWrapper>
          <IconPlaceholder>
            {/* Reemplazar por <FiMail size={16} /> */}
            [@]
          </IconPlaceholder>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Contraseña</Label>
        <InputWrapper>
          <IconPlaceholder>
             {/* Reemplazar por <FiLock size={16} /> */}
             [#]
          </IconPlaceholder>
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
      </InputGroup>

      <OptionsRow>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Recordar sesión
        </CheckboxLabel>
        <ForgotPasswordLink href="#">¿Olvidaste tu contraseña?</ForgotPasswordLink>
      </OptionsRow>

      {/* Botón color Teal de la imagen */}
      <PrimaryButton type="submit" color="#009688">
        INGRESAR AL SISTEMA
      </PrimaryButton>

      <SocialLoginContainer>
        <SocialText>O inicia sesión con:</SocialText>
        <SocialIconsRow>
          <SocialIconCircle>
            {/* Reemplazar por <FcGoogle size={20} /> */}
            G
          </SocialIconCircle>
          <SocialIconCircle>
             {/* Reemplazar por <FaFacebook size={20} color="#1877F2"/> */}
             F
          </SocialIconCircle>
        </SocialIconsRow>
      </SocialLoginContainer>
    </form>
  );
};
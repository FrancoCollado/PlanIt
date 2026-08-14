// apps/web/src/modules/auth/components/RegisterForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FormTitle,
  FormSubtitle,
  InputGroup,
  Label,
  InputWrapper,
  IconPlaceholder,
  StyledInput,
  OptionsRow,
  CheckboxLabel,
  PrimaryButton
} from './LoginForm';

const CompactInputGroup = styled(InputGroup)`
  margin-bottom: 0.6rem; /* Reducido de 1rem a 0.6rem para ganar espacio */
`;

const CompactInput = styled(StyledInput)`
  padding: 0.6rem 1rem 0.6rem 2.5rem; /* Altura de input un poco más compacta */
`;

export const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('Juan Pérez');
  const [email, setEmail] = useState('ejemplo@correo.com');
  const [password, setPassword] = useState('**********');
  const [confirmPassword, setConfirmPassword] = useState('**********');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormTitle>REGISTRARSE</FormTitle>
      <FormSubtitle style={{ marginBottom: '1rem' }}>¿Eres nuevo? Crea tu cuenta.</FormSubtitle>

      <CompactInputGroup>
        <Label>Nombre Completo</Label>
        <InputWrapper>
          <IconPlaceholder>[U]</IconPlaceholder>
          <CompactInput
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </InputWrapper>
      </CompactInputGroup>

      <CompactInputGroup>
        <Label>Correo Electrónico</Label>
        <InputWrapper>
          <IconPlaceholder>[@]</IconPlaceholder>
          <CompactInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
      </CompactInputGroup>

      <CompactInputGroup>
        <Label>Contraseña</Label>
        <InputWrapper>
          <IconPlaceholder>[#]</IconPlaceholder>
          <CompactInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
      </CompactInputGroup>

      <CompactInputGroup>
        <Label>Confirmar Contraseña</Label>
        <InputWrapper>
          <IconPlaceholder>[✓]</IconPlaceholder>
          <CompactInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputWrapper>
      </CompactInputGroup>

      <OptionsRow style={{ marginBottom: '1rem' }}>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          Acepto Términos y Condiciones
        </CheckboxLabel>
      </OptionsRow>

      <PrimaryButton type="submit" color="#1a237e">
        CREAR CUENTA
      </PrimaryButton>
    </form>
  );
};
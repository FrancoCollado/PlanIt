// apps/web/src/modules/auth/components/RegisterForm.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

import {
  FormTitle,
  FormSubtitle,
  InputGroup,
  Label,
  ContenedorInput,
  StyledInput,
  OptionsRow,
  CheckboxLabel,
  PrimaryButton
} from './LoginForm';
import type { UserRole } from './LoginForm';
import { registerRequest } from '../services/authService';


const CompactInput = styled(StyledInput)`
  padding: 0.6rem 1rem;
`;

interface RegisterFormProps {
  onRegisterSuccess?: (role?: UserRole) => void;
}

// Traduce el valor de `rol` guardado en la BD (admin/empresa/cliente) al UserRole interno
const mapRolToUserRole = (rol: string): UserRole | null => {
  switch (rol.trim().toLowerCase()) {
    case 'administrador':
      return 'admin';
    case 'empresa':
      return 'business';
    case 'cliente':
      return 'client';
    default:
      return null;
  }
};


export const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [message, setMessage] = useState('');


  // Se ejecuta cuando presiono CREAR CUENTA
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // Evita que el navegador recargue la página
    e.preventDefault();

    setMessage('');

    try {

      const data = await registerRequest({
        name,
        email,
        password,
        confirmPassword,
        acceptTerms
      });

      // Registro correcto
      setMessage(data.message);

      // Limpio el formulario
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);

      onRegisterSuccess?.(mapRolToUserRole(data.user.rol) ?? undefined);

    } catch (error) {

      console.error('Error al registrar usuario:', error);

      setMessage(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    }
  };


  return (

    <form onSubmit={handleSubmit}>

      <FormTitle>
        REGISTRARSE
      </FormTitle>


      <FormSubtitle style={{ marginBottom: '1rem' }}>
        ¿Sos nuevo? Crea tu cuenta.
      </FormSubtitle>


      <InputGroup>

        <Label>
          Nombre Completo
        </Label>

        <ContenedorInput>

          <CompactInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </ContenedorInput>

      </InputGroup>


      <InputGroup>

        <Label>
          Correo Electrónico
        </Label>

        <ContenedorInput>

          <CompactInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </ContenedorInput>

      </InputGroup>


      <InputGroup>

        <Label>
          Contraseña
        </Label>

        <ContenedorInput>

          <CompactInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </ContenedorInput>

      </InputGroup>


      <InputGroup>

        <Label>
          Confirmar Contraseña
        </Label>

        <ContenedorInput>

          <CompactInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </ContenedorInput>

      </InputGroup>


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


      <PrimaryButton
        type="submit"
        color="#f3d736"
      >
        CREAR CUENTA
      </PrimaryButton>


      {message && (
        <p>{message}</p>
      )}

    </form>
  );
};
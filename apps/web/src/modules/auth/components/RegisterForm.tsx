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
import type { UserRole, AuthUser } from './LoginForm';
import { registerRequest } from '../services/authService';


const CompactInput = styled(StyledInput)`
  padding: 0.6rem 1rem;
`;

interface RegisterFormProps {
  onRegisterSuccess?: (user?: AuthUser) => void;
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

  const [role, setRole] = useState<'cliente' | 'empresa'>('cliente');
  const [zona, setZona] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');

  const [message, setMessage] = useState('');


  // Se ejecuta cuando presiono CREAR CUENTA
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // Evita que el navegador recargue la página
    e.preventDefault();

    setMessage('');

    if (role === 'empresa' && (!zona || !cuit || !telefono)) {
      setMessage('Zona, CUIT y teléfono son requeridos para cuentas de empresa');
      return;
    }

    try {

      const data = await registerRequest({
        name,
        email,
        password,
        confirmPassword,
        acceptTerms,
        role,
        ...(role === 'empresa' ? { zona, cuit: Number(cuit), telefono: Number(telefono) } : {})
      });

      // Registro correcto
      setMessage(data.message);

      // Limpio el formulario
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);
      setRole('cliente');
      setZona('');
      setCuit('');
      setTelefono('');

      const rol = mapRolToUserRole(data.user.rol);
      onRegisterSuccess?.(rol ? { id: data.user.id, nombre: data.user.nombre, role: rol, token: data.token } : undefined);

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


      <InputGroup>

        <Label>
          Tipo de cuenta
        </Label>

        <OptionsRow>

          <CheckboxLabel>
            <input
              type="radio"
              name="role"
              checked={role === 'cliente'}
              onChange={() => setRole('cliente')}
            />
            Cliente
          </CheckboxLabel>

          <CheckboxLabel>
            <input
              type="radio"
              name="role"
              checked={role === 'empresa'}
              onChange={() => setRole('empresa')}
            />
            Empresa
          </CheckboxLabel>

        </OptionsRow>

      </InputGroup>


      {role === 'empresa' && (
        <>
          <InputGroup>
            <Label>
              Zona
            </Label>
            <ContenedorInput>
              <CompactInput
                type="text"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </ContenedorInput>
          </InputGroup>

          <InputGroup>
            <Label>
              CUIT
            </Label>
            <ContenedorInput>
              <CompactInput
                type="number"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
              />
            </ContenedorInput>
          </InputGroup>

          <InputGroup>
            <Label>
              Teléfono
            </Label>
            <ContenedorInput>
              <CompactInput
                type="number"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </ContenedorInput>
          </InputGroup>
        </>
      )}


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
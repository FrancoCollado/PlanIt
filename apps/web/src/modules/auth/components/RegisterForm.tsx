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


const CompactInput = styled(StyledInput)`
  padding: 0.6rem 1rem;
`;


export const RegisterForm = () => {

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

      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          acceptTerms
        })
      });


      const data = await response.json();


      // Si el backend respondió con un error
      if (!response.ok) {
        setMessage(data.error);
        return;
      }


      // Registro correcto
      setMessage(data.message);

      // Limpio el formulario
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);

    } catch (error) {

      console.error('Error al registrar usuario:', error);

      setMessage('No se pudo conectar con el servidor');
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
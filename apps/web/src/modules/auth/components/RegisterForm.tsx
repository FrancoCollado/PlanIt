// apps/web/src/modules/auth/components/RegisterForm.tsx

/* Importo el useState y los componentes de estilo que cree en LoginForm.tsx*/
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
  padding: 0.6rem 1rem /* compacto la altura del input */
`;

/* Creo constante RegisterForm y la exporto para import en otro archivo*/
export const RegisterForm= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  
/* El preventDefault es para que el navegador no envie y recargue de una*/

  return (
    <form onSubmit={(e) => e.preventDefault()}>  

      <FormTitle>REGISTRARSE</FormTitle>

      <FormSubtitle style={{ marginBottom: '1rem' }}>¿Sos nuevo? Crea tu cuenta.</FormSubtitle>

      <InputGroup>
        <Label>Nombre Completo</Label>
        <ContenedorInput>
          <CompactInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  /* Con esto le ajusto el nombre si se detectan cambios*/
          />
        </ContenedorInput>
      </InputGroup>

      <InputGroup>
        <Label>Correo Electrónico</Label>
        <ContenedorInput>
          <CompactInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContenedorInput>
      </InputGroup>

      <InputGroup>
        <Label>Contraseña</Label>
        <ContenedorInput>
          <CompactInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </ContenedorInput>
      </InputGroup>

      <InputGroup>
        <Label>Confirmar Contraseña</Label>
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

      <PrimaryButton type="submit" color="#f3d736">
        CREAR CUENTA
      </PrimaryButton>
    </form>
  );
};

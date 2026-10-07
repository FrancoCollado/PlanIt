import React, { useState } from 'react';

import type { UsuarioRol, UsuarioAutenticado } from './LoginForm';
import { RegistrarUsuario } from '../services/authService';
import { esEmailValido } from '../../../shared/validators';

interface RegisterFormProps {
  alSolicitarRegistro?: (user?: UsuarioAutenticado) => void;
  onLoginClick?: () => void;
}

// Traduce el valor de `rol` guardado en la BD (admin/empresa/cliente) al UsuarioRol interno
const mapRolToUserRole = (rol: string): UsuarioRol | null => {
  switch (rol.trim().toLowerCase()) {
    case 'administrador':
      return 'admin';
    case 'empresa':
      return 'empresa';
    case 'cliente':
      return 'cliente';
    default:
      return null;
  }
};

export const RegisterForm = ({
  alSolicitarRegistro,
  onLoginClick
}: RegisterFormProps) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [role, setRole] = useState<'cliente' | 'empresa'>('cliente'); //este rol solo puede ser cliente o empresa, no admin.
  const [zona, setZona] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');

  const [message, setMessage] = useState('');

  // Se ejecuta cuando presiono CREAR CUENTA
  const ManejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {

    // Evita que el navegador recargue la página
    e.preventDefault();

    setMessage('');

    if (!esEmailValido(email)) {
      setMessage('Ingresá un email válido');
      return;
    }

    if (role === 'empresa' && (!zona || !cuit || !telefono)) {
      setMessage('Zona, CUIT y teléfono son requeridos para cuentas de empresa');
      return;
    }

    try {

      const data = await RegistrarUsuario({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms,
        role: role,
        ...(role === 'empresa'
          ? {
              zona,
              cuit: Number(cuit),
              telefono: Number(telefono)
            }
          : {})
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

      alSolicitarRegistro?.(
        rol
          ? {
              id: data.user.id,
              nombre: data.user.nombre,
              role: rol,
              token: data.token
            }
          : undefined
      );

    } catch (error) {

      console.error('Error al registrar usuario:', error);

      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo conectar con el servidor'
      );
    }
  };

  return (
    <form onSubmit={ManejarEnvio}>

      <h2 className="form-title">
        REGISTRARSE
      </h2>

      <p
        className="form-subtitle"
        style={{ marginBottom: '1rem' }}
      >
        ¿Sos nuevo? Crea tu cuenta.
      </p>

      <div className="input-group">

        <label>
          Nombre Completo
        </label>

        <input
          className="form-input compact-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>
          Correo Electrónico
        </label>

        <input
          className="form-input compact-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>
          Contraseña
        </label>

        <input
          className="form-input compact-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>
          Confirmar Contraseña
        </label>

        <input
          className="form-input compact-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>
          Tipo de cuenta
        </label>

        <div className="options-row">

          <label className="checkbox-label">
            <input
              type="radio"
              name="role"
              checked={role === 'cliente'}
              onChange={() => setRole('cliente')}
            />
            Cliente
          </label>

          <label className="checkbox-label">
            <input
              type="radio"
              name="role"
              checked={role === 'empresa'}
              onChange={() => setRole('empresa')}
            />
            Empresa
          </label>

        </div>

      </div>

      {role === 'empresa' && (
        <>
          <div className="input-group">

            <label>
              Zona
            </label>

            <input
              className="form-input compact-input"
              type="text"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>
              CUIT
            </label>

            <input
              className="form-input compact-input"
              type="number"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>
              Teléfono
            </label>

            <input
              className="form-input compact-input"
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

          </div>
        </>
      )}

      <div
        className="options-row"
        style={{ marginBottom: '1rem' }}
      >

        <label className="checkbox-label">

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />

          Acepto Términos y Condiciones

        </label>

      </div>

      <button
        className="primary-button "
        type="submit"
      >
        CREAR CUENTA
      </button>

      {message && (
        <p>{message}</p>
      )}

      <p className="form-subtitle">
        ¿Ya tenés una cuenta?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLoginClick?.();
          }}
        >
          Iniciá sesión
        </a>
      </p>

    </form>
  );
};
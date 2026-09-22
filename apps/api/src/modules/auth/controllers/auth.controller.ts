import { Request, Response } from 'express';
import {
  findUserByCredentials,
  createUser
} from '../services/auth.service';

import type { LoginDto } from '../dtos/login.dto';
import type { RegisterDto } from '../dtos/register.dto';


// LOGIN
export const login = async (
  req: Request<{}, {}, LoginDto>,
  res: Response
) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email y contraseña son requeridos'
    });
  }

  try {
    const user = await findUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        creadoEn: user.creadoEn
      }
    });

  } catch (error) {
    console.error('Error en login:', error);

    res.status(500).json({
      error: 'Error al iniciar sesión'
    });
  }
};


// REGISTRO
export const register = async (
  req: Request<{}, {}, RegisterDto>,
  res: Response
) => {

  const {
    name,
    email,
    password,
    confirmPassword,
    acceptTerms
  } = req.body;

  // Verifico que estén todos los campos
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      error: 'Todos los campos son requeridos'
    });
  }

  // Verifico que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({
      error: 'Las contraseñas no coinciden'
    });
  }

  // Verifico que haya aceptado los términos
  if (!acceptTerms) {
    return res.status(400).json({
      error: 'Debes aceptar los términos y condiciones'
    });
  }

  try {
    const user = await createUser(name, email, password);

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        creadoEn: user.creadoEn
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);

    res.status(500).json({
      error: 'Error al crear el usuario'
    });
  }
};
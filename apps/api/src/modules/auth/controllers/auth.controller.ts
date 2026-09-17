import { Request, Response } from 'express';
import { findUserByCredentials } from '../services/auth.service';
import type { LoginDto } from '../dtos/login.dto';

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await findUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

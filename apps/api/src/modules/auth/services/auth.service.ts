import pool from '../../../config/database';

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  creado_en: string;
}

// Busca un usuario que coincida con email y contraseña en la tabla `usuarios`
export const findUserByCredentials = async (
  email: string,
  password: string
): Promise<AuthUser | null> => {
  const [rows] = await pool.query(
    'SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE email = ? AND contraseña = ? LIMIT 1',
    [email, password]
  );
  const users = rows as AuthUser[];
  return users[0] ?? null;
};

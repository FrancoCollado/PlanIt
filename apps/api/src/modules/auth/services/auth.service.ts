import { getOrm } from '../../../config/orm.js';
import { User } from '../../../entities/usuario.js';


// Busca un usuario por email y contraseña
export const findUserByCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {

  const em = getOrm().em.fork();

  return em.findOne(User, { email, password });
};


// Crea un nuevo usuario
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'cliente' | 'empresa',
  businessData?: { zona: string; cuit: number; telefono: number }
): Promise<User> => {

  const em = getOrm().em.fork();

  const user = em.create(User, {
    nombre: name,
    email,
    password,
    rol: role,
    activo: true,
    ...(businessData ?? {})
  });

  await em.persist(user).flush();

  return user;
};

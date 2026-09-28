import { getOrm } from '../../../config/orm';
import { User } from '../../../entities/usuario';


// Busca un usuario por email y contraseña
export const findUserByCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {

  const orm = getOrm();
  const em = orm.em.fork();

  const user = await em.findOne(User, {
    email,
    password
  });

  return user;
};


// Crea un nuevo usuario
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'cliente' | 'empresa',
  businessData?: { zona: string; cuit: number; telefono: number }
): Promise<User> => {

  const orm = getOrm();
  const em = orm.em.fork();

  const user = em.create(User, {
    nombre: name,
    email: email,
    password: password,
    rol: role,
    ...(businessData ?? {})
  });

  await em.persist(user).flush();

  return user;
};
import { getOrm } from '../../../config/orm';
import { User } from '../../../entities/usuario';

export const listUsuariosByRol = async (rol?: string): Promise<User[]> => {
  const orm = getOrm();
  const em = orm.em.fork();

  return em.find(User, rol ? { rol: rol as User['rol'] } : {}, { orderBy: { nombre: 'ASC' } });
};

export const setUsuarioActivo = async (id: number, activo: boolean): Promise<User | null> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const usuario = await em.findOne(User, { id });

  if (!usuario) return null;

  usuario.activo = activo;
  await em.flush();

  return usuario;
};

import { getOrm } from '../../../config/orm';
import { User } from '../../../entities/usuario';
import { Evento } from '../../../entities/evento';
import { Servicio } from '../../../entities/servicio';
import { TableroServicio } from '../../../entities/tablero-servicio';

export interface AdminStats {
  empresasActivas: number;
  eventosPublicados: number;
  eventosBorrador: number;
  clientesRegistrados: number;
}

export interface BusinessStats {
  serviciosActivos: number;
  serviciosBorrador: number;
  vecesGuardadoEnTableros: number;
  categoriasPresentes: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const [empresasActivas, eventosPublicados, eventosBorrador, clientesRegistrados] = await Promise.all([
    em.count(User, { rol: 'empresa', activo: true }),
    em.count(Evento, { draft: false }),
    em.count(Evento, { draft: true }),
    em.count(User, { rol: 'cliente' })
  ]);

  return { empresasActivas, eventosPublicados, eventosBorrador, clientesRegistrados };
};

export const getBusinessStats = async (usuarioId: number): Promise<BusinessStats> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const [serviciosActivos, serviciosBorrador, vecesGuardadoEnTableros, serviciosDelUsuario] = await Promise.all([
    em.count(Servicio, { usuario: usuarioId, draft: false }),
    em.count(Servicio, { usuario: usuarioId, draft: true }),
    em.count(TableroServicio, { servicio: { usuario: usuarioId } }),
    em.find(Servicio, { usuario: usuarioId }, { populate: ['categoria'] })
  ]);

  const categoriasPresentes = new Set(serviciosDelUsuario.map((s) => s.categoria.id)).size;

  return { serviciosActivos, serviciosBorrador, vecesGuardadoEnTableros, categoriasPresentes };
};

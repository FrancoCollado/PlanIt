import { getOrm } from '../../../config/orm';
import { Servicio } from '../../../entities/servicio';
import { Categoria } from '../../../entities/categoria';
import { User } from '../../../entities/usuario';
import type { CreateServicioDto, UpdateServicioDto } from '../dtos/servicio.dto';

export const listServiciosByUsuario = async (usuarioId: number): Promise<Servicio[]> => {
  const orm = getOrm();
  const em = orm.em.fork();

  return em.find(Servicio, { usuario: usuarioId }, { populate: ['categoria'], orderBy: { creadoEn: 'DESC' } });
};

export const getServicioById = async (id: number): Promise<Servicio | null> => {
  const orm = getOrm();
  const em = orm.em.fork();

  return em.findOne(Servicio, { id }, { populate: ['categoria'] });
};

export const createServicio = async (data: CreateServicioDto): Promise<Servicio> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const categoria = await em.findOne(Categoria, { id: data.categoriaId });
  if (!categoria) throw new Error('La categoría indicada no existe');

  const usuario = await em.findOne(User, { id: data.usuarioId });
  if (!usuario) throw new Error('El usuario indicado no existe');

  const servicio = em.create(Servicio, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: data.imagen,
    categoria,
    usuario,
    draft: data.draft ?? true,
    creadoEn: new Date()
  });

  await em.persist(servicio).flush();

  return servicio;
};

export const updateServicio = async (
  id: number,
  usuarioId: number,
  data: UpdateServicioDto
): Promise<Servicio | null> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const servicio = await em.findOne(Servicio, { id, usuario: usuarioId });

  if (!servicio) return null;

  if (data.nombre !== undefined) servicio.nombre = data.nombre;
  if (data.descripcion !== undefined) servicio.descripcion = data.descripcion;
  if (data.imagen !== undefined) servicio.imagen = data.imagen;
  if (data.draft !== undefined) servicio.draft = data.draft;

  if (data.categoriaId !== undefined) {
    const categoria = await em.findOne(Categoria, { id: data.categoriaId });
    if (!categoria) throw new Error('La categoría indicada no existe');
    servicio.categoria = categoria;
  }

  await em.flush();

  return servicio;
};

export const deleteServicio = async (id: number, usuarioId: number): Promise<boolean> => {
  const orm = getOrm();
  const em = orm.em.fork();

  const servicio = await em.findOne(Servicio, { id, usuario: usuarioId });

  if (!servicio) return false;

  await em.remove(servicio).flush();

  return true;
};

import { getOrm } from '../../../config/orm';
import { Categoria } from '../../../entities/categoria';
import { Evento } from '../../../entities/evento';
import type { CreateCategoriaDto, UpdateCategoriaDto } from '../dtos/categoria.dto';

export const listCategorias = async (): Promise<Categoria[]> => {
  const em = getOrm().em.fork();

  return em.find(Categoria, {}, { populate: ['evento'], orderBy: { creadoEn: 'DESC' } });
};

export const getCategoriaById = async (id: number): Promise<Categoria | null> => {
  const em = getOrm().em.fork();

  return em.findOne(Categoria, { id }, { populate: ['evento'] });
};

export const createCategoria = async (data: CreateCategoriaDto): Promise<Categoria> => {
  const em = getOrm().em.fork();

  const evento = await em.findOne(Evento, { id: data.eventoId });

  if (!evento) {
    throw new Error('El evento indicado no existe');
  }

  const categoria = em.create(Categoria, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    evento,
    creadoEn: new Date()
  });

  await em.persist(categoria).flush();

  return categoria;
};

export const updateCategoria = async (id: number, data: UpdateCategoriaDto): Promise<Categoria | null> => {
  const em = getOrm().em.fork();

  const categoria = await em.findOne(Categoria, { id });

  if (!categoria) return null;

  if (data.nombre !== undefined) categoria.nombre = data.nombre;
  if (data.descripcion !== undefined) categoria.descripcion = data.descripcion;

  if (data.eventoId !== undefined) {
    const evento = await em.findOne(Evento, { id: data.eventoId });

    if (!evento) {
      throw new Error('El evento indicado no existe');
    }

    categoria.evento = evento;
  }

  await em.flush();

  return categoria;
};

export const deleteCategoria = async (id: number): Promise<boolean> => {
  const em = getOrm().em.fork();

  const categoria = await em.findOne(Categoria, { id });

  if (!categoria) return false;

  await em.remove(categoria).flush();

  return true;
};

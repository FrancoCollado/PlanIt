import { Request, Response } from 'express';

import {
  listCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../services/categoria.service';

import type { CreateCategoriaDto, UpdateCategoriaDto } from '../dtos/categoria.dto';

const serializeCategoria = (categoria: Awaited<ReturnType<typeof getCategoriaById>>) => {
  if (!categoria) return null;

  return {
    id: categoria.id,
    nombre: categoria.nombre,
    descripcion: categoria.descripcion,
    creadoEn: categoria.creadoEn,
    evento: {
      id: categoria.evento.id,
      nombre: categoria.evento.nombre
    }
  };
};

export const getCategorias = async (_req: Request, res: Response) => {
  try {
    const categorias = await listCategorias();
    res.json({ categorias: categorias.map(serializeCategoria) });
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const categoria = await getCategoriaById(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ categoria: serializeCategoria(categoria) });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

export const crearCategoria = async (
  req: Request<{}, {}, CreateCategoriaDto>,
  res: Response
) => {
  const { nombre, descripcion, eventoId } = req.body;

  if (!nombre || !eventoId) {
    return res.status(400).json({ error: 'El nombre y el evento son requeridos' });
  }

  try {
    const categoria = await createCategoria({ nombre, descripcion, eventoId: Number(eventoId) });
    res.status(201).json({ message: 'Categoría creada correctamente', categoria: serializeCategoria(categoria) });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear la categoría' });
  }
};

export const actualizarCategoria = async (
  req: Request<{ id: string }, {}, UpdateCategoriaDto>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const categoria = await updateCategoria(id, req.body);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría actualizada correctamente', categoria: serializeCategoria(categoria) });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Error al actualizar la categoría' });
  }
};

export const borrarCategoria = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const eliminada = await deleteCategoria(id);

    if (!eliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

import { Request, Response } from 'express';

import {
  listServiciosByUsuario,
  buscarServiciosPorNombre,
  buscarServiciosPorCategoria,
  createServicio,
  updateServicio,
  deleteServicio
} from '../services/servicio.service';

import type {
  CreateServicioDto,
  UpdateServicioDto
} from '../dtos/servicio.dto';


const serializeServicio = (servicio: {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  draft: boolean;
  creadoEn: Date;
  categoria: {
    id: number;
    nombre: string;
  };
}) => ({
  id: servicio.id,
  nombre: servicio.nombre,
  descripcion: servicio.descripcion,
  imagen: servicio.imagen,
  draft: servicio.draft,
  creadoEn: servicio.creadoEn,
  categoria: {
    id: servicio.categoria.id,
    nombre: servicio.categoria.nombre
  }
});


// ======================================================
// LISTAR SERVICIOS DE UNA EMPRESA
// ======================================================

export const getServicios = async (
  req: Request,
  res: Response
) => {
  const usuarioId = Number(req.query.usuarioId);

  if (!usuarioId) {
    return res.status(400).json({
      error: 'El parámetro "usuarioId" es requerido'
    });
  }

  try {
    const servicios = await listServiciosByUsuario(usuarioId);

    res.json({
      servicios: servicios.map(serializeServicio)
    });
  } catch (error) {
    console.error('Error al listar servicios:', error);

    res.status(500).json({
      error: 'Error al obtener los servicios'
    });
  }
};


// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR NOMBRE
// ======================================================

export const buscarServicios = async (
  req: Request,
  res: Response
) => {
  const nombre = String(req.query.nombre ?? '').trim();
  const zona = String(req.query.zona ?? '').trim();
  const empresa = String(req.query.empresa ?? '').trim();

  if (!nombre && !zona && !empresa) {
    return res.status(400).json({
      error: 'Ingresá un nombre, una zona o una empresa para buscar'
    });
  }

  try {
    const servicios = await buscarServiciosPorNombre(nombre, zona, empresa);

    res.json({
      servicios: servicios.map(serializeServicio)
    });
  } catch (error) {
    console.error('Error al buscar servicios:', error);

    res.status(500).json({
      error: 'Error al buscar los servicios'
    });
  }
};


// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR CATEGORÍA
// ======================================================

export const buscarServiciosCategoria = async (
  req: Request,
  res: Response
) => {
  const categoriaId = Number(req.params.categoriaId);

  if (!categoriaId) {
    return res.status(400).json({
      error: 'La categoría es requerida'
    });
  }

  try {
    const servicios = await buscarServiciosPorCategoria(categoriaId);

    res.json({
      servicios: servicios.map(serializeServicio)
    });
  } catch (error) {
    console.error('Error al buscar servicios por categoría:', error);

    res.status(500).json({
      error: 'Error al buscar los servicios por categoría'
    });
  }
};


// ======================================================
// CREAR SERVICIO
// ======================================================

export const crearServicio = async (
  req: Request<{}, {}, CreateServicioDto>,
  res: Response
) => {
  const {
    nombre,
    descripcion,
    imagen,
    categoriaId,
    usuarioId,
    draft
  } = req.body;

  if (!nombre || !categoriaId || !usuarioId) {
    return res.status(400).json({
      error: 'El nombre, la categoría y el usuario son requeridos'
    });
  }

  try {
    const servicio = await createServicio({
      nombre,
      descripcion,
      imagen,
      categoriaId: Number(categoriaId),
      usuarioId: Number(usuarioId),
      draft
    });

    res.status(201).json({
      message: 'Servicio creado correctamente',
      servicio: serializeServicio(servicio)
    });
  } catch (error) {
    console.error('Error al crear servicio:', error);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : 'Error al crear el servicio'
    });
  }
};


// ======================================================
// ACTUALIZAR SERVICIO
// ======================================================

export const actualizarServicio = async (
  req: Request<
    { id: string },
    {},
    UpdateServicioDto & { usuarioId: number }
  >,
  res: Response
) => {
  const id = Number(req.params.id);
  const { usuarioId, ...data } = req.body;

  if (!usuarioId) {
    return res.status(400).json({
      error: 'El parámetro "usuarioId" es requerido'
    });
  }

  try {
    const servicio = await updateServicio(
      id,
      Number(usuarioId),
      data
    );

    if (!servicio) {
      return res.status(404).json({
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      message: 'Servicio actualizado correctamente',
      servicio: serializeServicio(servicio)
    });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : 'Error al actualizar el servicio'
    });
  }
};


// ======================================================
// BORRAR SERVICIO
// ======================================================

export const borrarServicio = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const usuarioId = Number(
    req.query.usuarioId ?? req.body.usuarioId
  );

  if (!usuarioId) {
    return res.status(400).json({
      error: 'El parámetro "usuarioId" es requerido'
    });
  }

  try {
    const eliminado = await deleteServicio(
      id,
      usuarioId
    );

    if (!eliminado) {
      return res.status(404).json({
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      message: 'Servicio eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);

    res.status(500).json({
      error: 'Error al eliminar el servicio'
    });
  }
};

import { Request, Response } from 'express';

import {
  listEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento
} from '../services/evento.service';

import type { CreateEventoDto, UpdateEventoDto } from '../dtos/evento.dto';


export const getEventos = async (_req: Request, res: Response) => {
  try {
    const eventos = await listEventos();
    res.json({ eventos });
  } catch (error) {
    console.error('Error al listar eventos:', error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

export const getEvento = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const evento = await getEventoById(id);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json({ evento });
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};

export const crearEvento = async (
  req: Request<{}, {}, CreateEventoDto>,
  res: Response
) => {
  const { nombre, descripcion, imagen, draft } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del evento es requerido' });
  }

  try {
    const evento = await createEvento({ nombre, descripcion, imagen, draft });
    res.status(201).json({ message: 'Evento creado correctamente', evento });
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

export const actualizarEvento = async (
  req: Request<{ id: string }, {}, UpdateEventoDto>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const evento = await updateEvento(id, req.body);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento actualizado correctamente', evento });
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
};

export const borrarEvento = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const eliminado = await deleteEvento(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};

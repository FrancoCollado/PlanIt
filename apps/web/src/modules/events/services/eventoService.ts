import { requestDelete, requestJson } from '../../../shared/api';

export interface Evento {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  draft: boolean;
  creadoEn?: string;
}

export interface EventoPayload {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  draft?: boolean;
}

export const listEventosRequest = async (): Promise<Evento[]> => {
  const data = await requestJson<{ eventos: Evento[] }>(`/api/eventos`, 'Error al obtener los eventos');
  return data.eventos;
};

export const createEventoRequest = async (payload: EventoPayload): Promise<Evento> => {
  const data = await requestJson<{ evento: Evento }>(`/api/eventos`, 'Error al crear el evento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data.evento;
};

export const updateEventoRequest = async (id: number, payload: Partial<EventoPayload>): Promise<Evento> => {
  const data = await requestJson<{ evento: Evento }>(`/api/eventos/${id}`, 'Error al actualizar el evento', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data.evento;
};

export const deleteEventoRequest = async (id: number): Promise<void> => {
  await requestDelete(`/api/eventos/${id}`, 'Error al eliminar el evento', {
    method: 'DELETE',
  });
};


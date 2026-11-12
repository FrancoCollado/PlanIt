import { headersConToken, requestJson, requestVoid } from '../../../shared/api';

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

type ListaEventosResponse = { eventos: Evento[] };
type EventoResponse = { evento: Evento };

export const listEventosRequest = async (token: string): Promise<Evento[]> => {
  const data = await requestJson<ListaEventosResponse>(
    '/api/eventos',
    'Error al obtener los eventos',
    { headers: headersConToken(token) }
  );

  return data.eventos;
};

export const createEventoRequest = async (payload: EventoPayload, token: string): Promise<Evento> => {
  const data = await requestJson<EventoResponse>(
    '/api/eventos',
    'Error al crear el evento',
    {
      method: 'POST',
      headers: headersConToken(token, true),
      body: JSON.stringify(payload)
    }
  );

  return data.evento;
};

export const updateEventoRequest = async (id: number, payload: Partial<EventoPayload>, token: string): Promise<Evento> => {
  const data = await requestJson<EventoResponse>(
    `/api/eventos/${id}`,
    'Error al actualizar el evento',
    {
      method: 'PUT',
      headers: headersConToken(token, true),
      body: JSON.stringify(payload)
    }
  );

  return data.evento;
};

export const deleteEventoRequest = async (id: number, token: string): Promise<void> => {
  await requestVoid(
    `/api/eventos/${id}`,
    'Error al eliminar el evento',
    {
      method: 'DELETE',
      headers: headersConToken(token)
    }
  );
};

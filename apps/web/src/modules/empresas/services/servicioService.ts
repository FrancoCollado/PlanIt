import { headersConToken, requestJson, requestVoid } from '../../../shared/api';

export type EstadoServicio = 'borrador' | 'revision' | 'publicado';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  estado: EstadoServicio;
  creadoEn?: string;
  categoria: {
    id: number;
    nombre: string;
  };
}

export interface ServicioPayload {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  categoriaId: number;
  estado?: 'borrador' | 'revision';
}

type ListaServiciosResponse = { servicios: Servicio[] };
type ServicioResponse = { servicio: Servicio };

export const listServiciosRequest = async (usuarioId: number, token: string): Promise<Servicio[]> => {
  const data = await requestJson<ListaServiciosResponse>(
    `/api/servicios?usuarioId=${usuarioId}`,
    'Error al obtener los servicios',
    { headers: headersConToken(token) }
  );

  return data.servicios;
};

export const createServicioRequest = async (usuarioId: number, payload: ServicioPayload, token: string): Promise<Servicio> => {
  const data = await requestJson<ServicioResponse>(
    '/api/servicios',
    'Error al crear el servicio',
    {
      method: 'POST',
      headers: headersConToken(token, true),
      body: JSON.stringify({ ...payload, usuarioId })
    }
  );

  return data.servicio;
};

export const updateServicioRequest = async (
  id: number,
  usuarioId: number,
  payload: {
    nombre?: string;
    descripcion?: string;
    imagen?: string;
    categoriaId?: number;
    estado?: 'borrador' | 'revision';
  },
  token: string
): Promise<Servicio> => {
  const data = await requestJson<ServicioResponse>(
    `/api/servicios/${id}`,
    'Error al actualizar el servicio',
    {
      method: 'PUT',
      headers: headersConToken(token, true),
      body: JSON.stringify({ ...payload, usuarioId })
    }
  );

  return data.servicio;
};

export const deleteServicioRequest = async (id: number, usuarioId: number, token: string): Promise<void> => {
  await requestVoid(
    `/api/servicios/${id}?usuarioId=${usuarioId}`,
    'Error al eliminar el servicio',
    {
      method: 'DELETE',
      headers: headersConToken(token)
    }
  );
};

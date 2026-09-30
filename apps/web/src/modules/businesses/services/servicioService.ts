import { requestDelete, requestJson } from '../../../shared/api';

import type { Servicio } from '../../clientes/services/servicioService';
export type { Servicio } from '../../clientes/services/servicioService';

export interface ServicioPayload {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  categoriaId: number;
  draft?: boolean;
}

export const listServiciosRequest = async (usuarioId: number): Promise<Servicio[]> => {
  const data = await requestJson<{ servicios: Servicio[] }>(`/api/servicios?usuarioId=${usuarioId}`, 'Error al obtener los servicios');
  return data.servicios;
};

export const createServicioRequest = async (usuarioId: number, payload: ServicioPayload): Promise<Servicio> => {
  const data = await requestJson<{ servicio: Servicio }>(`/api/servicios`, 'Error al crear el servicio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, usuarioId }),
  });
  return data.servicio;
};

export const updateServicioRequest = async (
  id: number,
  usuarioId: number,
  payload: Partial<ServicioPayload>
): Promise<Servicio> => {
  const data = await requestJson<{ servicio: Servicio }>(`/api/servicios/${id}`, 'Error al actualizar el servicio', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, usuarioId }),
  });
  return data.servicio;
};

export const deleteServicioRequest = async (id: number, usuarioId: number): Promise<void> => {
  await requestDelete(`/api/servicios/${id}?usuarioId=${usuarioId}`, 'Error al eliminar el servicio', {
    method: 'DELETE',
  });
};
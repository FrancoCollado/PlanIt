import { API_URL } from '../../../config/api';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  draft: boolean;
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
  draft?: boolean;
}

export const listServiciosRequest = async (usuarioId: number, token: string): Promise<Servicio[]> => {
  const response = await fetch(`${API_URL}/api/servicios?usuarioId=${usuarioId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al obtener los servicios');
  }

  return data.servicios;
};

export const createServicioRequest = async (usuarioId: number, payload: ServicioPayload, token: string): Promise<Servicio> => {
  const response = await fetch(`${API_URL}/api/servicios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...payload, usuarioId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al crear el servicio');
  }

  return data.servicio;
};

export const updateServicioRequest = async (
  id: number,
  usuarioId: number,
  payload: Partial<ServicioPayload>,
  token: string
): Promise<Servicio> => {
  const response = await fetch(`${API_URL}/api/servicios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...payload, usuarioId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al actualizar el servicio');
  }

  return data.servicio;
};

export const deleteServicioRequest = async (id: number, usuarioId: number, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/servicios/${id}?usuarioId=${usuarioId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar el servicio');
  }
};

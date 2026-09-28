const API_URL = 'http://localhost:4000';

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

export const listServiciosRequest = async (usuarioId: number): Promise<Servicio[]> => {
  const response = await fetch(`${API_URL}/api/servicios?usuarioId=${usuarioId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al obtener los servicios');
  }

  return data.servicios;
};

export const createServicioRequest = async (usuarioId: number, payload: ServicioPayload): Promise<Servicio> => {
  const response = await fetch(`${API_URL}/api/servicios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  payload: Partial<ServicioPayload>
): Promise<Servicio> => {
  const response = await fetch(`${API_URL}/api/servicios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, usuarioId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al actualizar el servicio');
  }

  return data.servicio;
};

export const deleteServicioRequest = async (id: number, usuarioId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/servicios/${id}?usuarioId=${usuarioId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar el servicio');
  }
};

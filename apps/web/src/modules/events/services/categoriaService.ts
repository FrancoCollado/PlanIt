import { API_URL } from '../../../config/api';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  creadoEn?: string;
  evento: {
    id: number;
    nombre: string;
  };
}

export interface CategoriaPayload {
  nombre: string;
  descripcion?: string;
  eventoId: number;
}

export const listCategoriasRequest = async (): Promise<Categoria[]> => {
  const response = await fetch(`${API_URL}/api/categorias`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al obtener las categorías');
  }

  return data.categorias;
};

export const createCategoriaRequest = async (payload: CategoriaPayload): Promise<Categoria> => {
  const response = await fetch(`${API_URL}/api/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al crear la categoría');
  }

  return data.categoria;
};

export const updateCategoriaRequest = async (id: number, payload: Partial<CategoriaPayload>): Promise<Categoria> => {
  const response = await fetch(`${API_URL}/api/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al actualizar la categoría');
  }

  return data.categoria;
};

export const deleteCategoriaRequest = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/categorias/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar la categoría');
  }
};

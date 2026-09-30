import { requestDelete, requestJson } from '../../../shared/api';

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
  const data = await requestJson<{ categorias: Categoria[] }>(`/api/categorias`, 'Error al obtener las categorías');
  return data.categorias;
};

export const createCategoriaRequest = async (payload: CategoriaPayload): Promise<Categoria> => {
  const data = await requestJson<{ categoria: Categoria }>(`/api/categorias`, 'Error al crear la categoría', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data.categoria;
};

export const updateCategoriaRequest = async (id: number, payload: Partial<CategoriaPayload>): Promise<Categoria> => {
  const data = await requestJson<{ categoria: Categoria }>(`/api/categorias/${id}`, 'Error al actualizar la categoría', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data.categoria;
};

export const deleteCategoriaRequest = async (id: number): Promise<void> => {
  await requestDelete(`/api/categorias/${id}`, 'Error al eliminar la categoría', {
    method: 'DELETE',
  });
};

import { headersConToken, requestJson, requestVoid } from '../../../shared/api';

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

type ListaCategoriasResponse = { categorias: Categoria[] };
type CategoriaResponse = { categoria: Categoria };

export const listCategoriasRequest = async (token: string): Promise<Categoria[]> => {
  const data = await requestJson<ListaCategoriasResponse>(
    '/api/categorias',
    'Error al obtener las categorías',
    { headers: headersConToken(token) }
  );

  return data.categorias;
};

export const createCategoriaRequest = async (payload: CategoriaPayload, token: string): Promise<Categoria> => {
  const data = await requestJson<CategoriaResponse>(
    '/api/categorias',
    'Error al crear la categoría',
    {
      method: 'POST',
      headers: headersConToken(token, true),
      body: JSON.stringify(payload)
    }
  );

  return data.categoria;
};

export const updateCategoriaRequest = async (id: number, payload: Partial<CategoriaPayload>, token: string): Promise<Categoria> => {
  const data = await requestJson<CategoriaResponse>(
    `/api/categorias/${id}`,
    'Error al actualizar la categoría',
    {
      method: 'PUT',
      headers: headersConToken(token, true),
      body: JSON.stringify(payload)
    }
  );

  return data.categoria;
};

export const deleteCategoriaRequest = async (id: number, token: string): Promise<void> => {
  await requestVoid(
    `/api/categorias/${id}`,
    'Error al eliminar la categoría',
    {
      method: 'DELETE',
      headers: headersConToken(token)
    }
  );
};

import { requestJson } from '../../../shared/api';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  estado: 'borrador' | 'revision' | 'publicado';
  creadoEn?: string;
  categoria: {
    id: number;
    nombre: string;
  };
  empresa: {
    id: number;
    nombre: string;
    telefono?: number;
    zona?: string;
  };
}

export interface Empresa {
  id: number;
  nombre: string;
  zona?: string;
  telefono?: number;
}

type ListaEmpresasResponse = { empresas: Empresa[] };
type ListaServiciosResponse = { servicios: Servicio[] };

export const listEmpresasRequest = async (): Promise<Empresa[]> => {
  const data = await requestJson<ListaEmpresasResponse>(
    '/api/usuarios/empresas',
    'Error al obtener las empresas'
  );

  return data.empresas;
};

export const buscarServiciosRequest = async (
  nombre: string,
  zona = '',
  empresa = ''
): Promise<Servicio[]> => {
  const params = new URLSearchParams();
  if (nombre.trim()) params.set('nombre', nombre.trim());
  if (zona.trim()) params.set('zona', zona.trim());
  if (empresa.trim()) params.set('empresa', empresa.trim());

  const data = await requestJson<ListaServiciosResponse>(
    `/api/servicios/buscar?${params.toString()}`,
    'Error al buscar los servicios'
  );

  return data.servicios;
};

export const buscarServiciosPorCategoriaRequest = async (categoriaId: number): Promise<Servicio[]> => {
  const data = await requestJson<ListaServiciosResponse>(
    `/api/servicios/categoria/${categoriaId}`,
    'Error al buscar los servicios por categoría'
  );

  return data.servicios;
};

import { requestJson } from '../../../shared/api';

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

export const buscarServiciosRequest = async (
  nombre: string,
  zona = '',
  empresa = ''
): Promise<Servicio[]> => {
  const params = new URLSearchParams();
  if (nombre.trim()) params.set('nombre', nombre.trim());
  if (zona.trim()) params.set('zona', zona.trim());
  if (empresa.trim()) params.set('empresa', empresa.trim());
  const data = await requestJson<{ servicios: Servicio[] }>(`/api/servicios/buscar?${params.toString()}`, 'Error al buscar los servicios');
  return data.servicios;
};

export const buscarServiciosPorCategoriaRequest = async (
  categoriaId: number
): Promise<Servicio[]> => {
  const data = await requestJson<{ servicios: Servicio[] }>(`/api/servicios/categoria/${categoriaId}`, 'Error al buscar los servicios por categoría');
  return data.servicios;
};
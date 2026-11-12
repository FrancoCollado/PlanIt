import { headersConToken, requestJson, requestVoid } from '../../../shared/api';

export interface ServicioRevision {
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

type ListaRevisionResponse = { servicios: ServicioRevision[] };
type ServicioRevisionResponse = { servicio: ServicioRevision };

export const listServiciosRevisionRequest = async (token: string): Promise<ServicioRevision[]> => {
  const data = await requestJson<ListaRevisionResponse>(
    '/api/servicios/admin/revision',
    'Error al obtener los servicios en revision',
    { headers: headersConToken(token) }
  );

  return data.servicios;
};

export const aprobarServicioRequest = async (id: number, token: string): Promise<ServicioRevision> => {
  const data = await requestJson<ServicioRevisionResponse>(
    `/api/servicios/admin/${id}/aprobar`,
    'Error al aprobar el servicio',
    {
      method: 'POST',
      headers: headersConToken(token)
    }
  );

  return data.servicio;
};

export const denegarServicioRequest = async (id: number, token: string): Promise<void> => {
  await requestVoid(
    `/api/servicios/admin/${id}/denegar`,
    'Error al denegar el servicio',
    {
      method: 'POST',
      headers: headersConToken(token)
    }
  );
};

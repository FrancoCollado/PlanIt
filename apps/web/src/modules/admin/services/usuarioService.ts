import { headersConToken, requestJson } from '../../../shared/api';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  zona?: string;
  cuit?: number;
  telefono?: number;
  activo: boolean;
  creadoEn?: string;
}

type ListaUsuariosResponse = { usuarios: Usuario[] };
type UsuarioResponse = { usuario: Usuario };

export const listUsuariosRequest = async (rol: string | undefined, token: string): Promise<Usuario[]> => {
  const query = rol ? `?rol=${encodeURIComponent(rol)}` : '';
  const data = await requestJson<ListaUsuariosResponse>(
    `/api/usuarios${query}`,
    'Error al obtener los usuarios',
    { headers: headersConToken(token) }
  );

  return data.usuarios;
};

export const setUsuarioActivoRequest = async (id: number, activo: boolean, token: string): Promise<Usuario> => {
  const data = await requestJson<UsuarioResponse>(
    `/api/usuarios/${id}/activo`,
    'Error al actualizar el usuario',
    {
      method: 'PATCH',
      headers: headersConToken(token, true),
      body: JSON.stringify({ activo })
    }
  );

  return data.usuario;
};

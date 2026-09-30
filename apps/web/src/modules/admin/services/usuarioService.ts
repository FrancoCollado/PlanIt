import { requestJson } from '../../../shared/api';

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

export const listUsuariosRequest = async (rol?: string): Promise<Usuario[]> => {
  const query = rol ? `?rol=${encodeURIComponent(rol)}` : '';
  const data = await requestJson<{ usuarios: Usuario[] }>(`/api/usuarios${query}`, 'Error al obtener los usuarios');
  return data.usuarios;
};

export const setUsuarioActivoRequest = async (id: number, activo: boolean): Promise<Usuario> => {
  const data = await requestJson<{ usuario: Usuario }>(`/api/usuarios/${id}/activo`, 'Error al actualizar el usuario', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activo }),
  });
  return data.usuario;
};

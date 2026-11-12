import type { Servicio } from './servicioService';
import { headersConToken, requestJson, requestVoid } from '../../../shared/api';

export interface Tablero {
  id: number;
  nombre: string;
  evento: { id: number; nombre: string } | null;
  fechaCreacion: string;
  servicios: Servicio[];
}

type ListaTablerosResponse = { tableros: Tablero[] };
type TableroResponse = { tablero: Tablero };

const headers = (token: string) => headersConToken(token, true);

export async function listTableros(token: string): Promise<Tablero[]> {
  const data = await requestJson<ListaTablerosResponse>(
    '/api/tableros',
    'Error al gestionar el tablero',
    { headers: headers(token) }
  );

  return data.tableros;
}

export async function createTablero(token: string, nombre: string, eventoId: number): Promise<Tablero> {
  const data = await requestJson<TableroResponse>(
    '/api/tableros',
    'Error al gestionar el tablero',
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ nombre, eventoId })
    }
  );

  return data.tablero;
}

export async function updateTablero(token: string, id: number, nombre: string, eventoId: number): Promise<Tablero> {
  const data = await requestJson<TableroResponse>(
    `/api/tableros/${id}`,
    'Error al gestionar el tablero',
    {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify({ nombre, eventoId })
    }
  );

  return data.tablero;
}

export async function deleteTablero(token: string, id: number): Promise<void> {
  await requestVoid(
    `/api/tableros/${id}`,
    'Error al gestionar el tablero',
    {
      method: 'DELETE',
      headers: headersConToken(token)
    }
  );
}

export async function addServicio(token: string, id: number, servicioId: number): Promise<void> {
  await requestVoid(
    `/api/tableros/${id}/servicios`,
    'Error al gestionar el tablero',
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ servicioId })
    }
  );
}

export async function removeServicio(token: string, id: number, servicioId: number): Promise<void> {
  await requestVoid(
    `/api/tableros/${id}/servicios/${servicioId}`,
    'Error al gestionar el tablero',
    {
      method: 'DELETE',
      headers: headersConToken(token)
    }
  );
}

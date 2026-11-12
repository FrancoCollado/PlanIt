import { API_URL } from '../config/api';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function mensajeDeError(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim() !== '') {
    return error.message;
  }

  return fallback;
}

export function mensajeDesdeCuerpo(data: unknown, fallback: string): string {
  if (
    data &&
    typeof data === 'object' &&
    'error' in data &&
    typeof data.error === 'string' &&
    data.error.trim() !== ''
  ) {
    return data.error;
  }

  return fallback;
}

export function headersConToken(token: string, conJson = false): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`
  };

  if (conJson) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

async function leerCuerpo(response: Response): Promise<unknown> {
  const texto = await response.text();
  if (texto.trim() === '') return null;

  try {
    return JSON.parse(texto) as unknown;
  } catch {
    return null;
  }
}

async function ejecutar(path: string, options?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0);
  }
}

export async function requestJson<T>(
  path: string,
  errorMessage: string,
  options?: RequestInit
): Promise<T> {
  const response = await ejecutar(path, options);

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await leerCuerpo(response);

  if (!response.ok) {
    throw new ApiError(mensajeDesdeCuerpo(data, errorMessage), response.status);
  }

  if (data === null) {
    throw new ApiError(errorMessage, response.status);
  }

  return data as T;
}

export async function requestVoid(
  path: string,
  errorMessage: string,
  options?: RequestInit
): Promise<void> {
  const response = await ejecutar(path, options);

  if (response.ok) {
    return;
  }

  const data = await leerCuerpo(response);
  throw new ApiError(mensajeDesdeCuerpo(data, errorMessage), response.status);
}

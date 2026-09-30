import { requestJson } from '../../../shared/api';

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    creado_en: string;
  };
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  const data = await requestJson<LoginResponse>(`/api/auth/login`, 'Error al iniciar sesión', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return data;
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  role: 'cliente' | 'empresa';
  zona?: string;
  cuit?: number;
  telefono?: number;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    creadoEn?: string;
  };
}

export const registerRequest = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const data = await requestJson<RegisterResponse>(`/api/auth/register`, 'Error al registrar usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data;
};

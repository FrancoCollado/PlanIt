const API_URL = 'http://localhost:4000';

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    creado_en: string;
  };
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  return data;
};

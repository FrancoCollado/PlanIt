const API_URL = 'http://localhost:4000';

export interface AdminStats {
  empresasActivas: number;
  eventosPublicados: number;
  eventosBorrador: number;
  clientesRegistrados: number;
}

export const getAdminStatsRequest = async (): Promise<AdminStats> => {
  const response = await fetch(`${API_URL}/api/stats/admin`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al obtener las estadísticas');
  }

  return data;
};

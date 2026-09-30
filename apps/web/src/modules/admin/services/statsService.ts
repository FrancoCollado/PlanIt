import { requestJson } from '../../../shared/api';

export interface AdminStats {
  empresasActivas: number;
  eventosPublicados: number;
  eventosBorrador: number;
  clientesRegistrados: number;
}

export const getAdminStatsRequest = async (): Promise<AdminStats> => {
  const data = await requestJson<AdminStats>(`/api/stats/admin`, 'Error al obtener las estadísticas');
  return data;
};

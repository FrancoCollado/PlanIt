import { requestJson } from '../../../shared/api';

export interface BusinessStats {
  serviciosActivos: number;
  serviciosBorrador: number;
  vecesGuardadoEnTableros: number;
  categoriasPresentes: number;
}

export const getBusinessStatsRequest = async (usuarioId: number): Promise<BusinessStats> => {
  const data = await requestJson<BusinessStats>(`/api/stats/business?usuarioId=${usuarioId}`, 'Error al obtener las estadísticas');
  return data;
};

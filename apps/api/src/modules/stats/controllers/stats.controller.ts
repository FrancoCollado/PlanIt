import { Request, Response } from 'express';

import { getAdminStats, getBusinessStats } from '../services/stats.service';

export const getAdminDashboardStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas del admin:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
};

export const getBusinessDashboardStats = async (req: Request, res: Response) => {
  const usuarioId = Number(req.query.usuarioId);

  if (!usuarioId) {
    return res.status(400).json({ error: 'El parámetro "usuarioId" es requerido' });
  }

  try {
    const stats = await getBusinessStats(usuarioId);
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas de la empresa:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
};

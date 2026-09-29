"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessDashboardStats = exports.getAdminDashboardStats = void 0;
const stats_service_1 = require("../services/stats.service");
const getAdminDashboardStats = async (_req, res) => {
    try {
        const stats = await (0, stats_service_1.getAdminStats)();
        res.json(stats);
    }
    catch (error) {
        console.error('Error al obtener estadísticas del admin:', error);
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};
exports.getAdminDashboardStats = getAdminDashboardStats;
const getBusinessDashboardStats = async (req, res) => {
    const usuarioId = Number(req.query.usuarioId);
    if (!usuarioId) {
        return res.status(400).json({ error: 'El parámetro "usuarioId" es requerido' });
    }
    try {
        const stats = await (0, stats_service_1.getBusinessStats)(usuarioId);
        res.json(stats);
    }
    catch (error) {
        console.error('Error al obtener estadísticas de la empresa:', error);
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};
exports.getBusinessDashboardStats = getBusinessDashboardStats;

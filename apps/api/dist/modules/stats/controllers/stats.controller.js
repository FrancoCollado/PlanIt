"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessDashboardStats = exports.getAdminDashboardStats = void 0;
const stats_service_1 = require("../services/stats.service");
const api_error_1 = require("../../../shared/api-error");
const getAdminDashboardStats = async (_req, res) => {
    try {
        const stats = await (0, stats_service_1.getAdminStats)();
        res.json(stats);
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener las estadísticas');
    }
};
exports.getAdminDashboardStats = getAdminDashboardStats;
const getBusinessDashboardStats = async (req, res) => {
    const usuarioId = Number(req.query.usuarioId);
    try {
        const stats = await (0, stats_service_1.getBusinessStats)(usuarioId);
        res.json(stats);
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener las estadísticas');
    }
};
exports.getBusinessDashboardStats = getBusinessDashboardStats;

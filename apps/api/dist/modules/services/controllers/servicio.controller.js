"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarServicio = exports.actualizarServicio = exports.crearServicio = exports.buscarServiciosCategoria = exports.buscarServicios = exports.getServicios = void 0;
const servicio_service_1 = require("../services/servicio.service");
const api_error_1 = require("../../../shared/api-error");
const serializeServicio = (servicio) => ({
    id: servicio.id,
    nombre: servicio.nombre,
    descripcion: servicio.descripcion,
    imagen: servicio.imagen,
    draft: servicio.draft,
    creadoEn: servicio.creadoEn,
    categoria: {
        id: servicio.categoria.id,
        nombre: servicio.categoria.nombre
    }
});
// ======================================================
// LISTAR SERVICIOS DE UNA EMPRESA
// ======================================================
const getServicios = async (req, res) => {
    const usuarioId = Number(req.query.usuarioId);
    try {
        const servicios = await (0, servicio_service_1.listServiciosByUsuario)(usuarioId);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener los servicios');
    }
};
exports.getServicios = getServicios;
// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR NOMBRE
// ======================================================
const buscarServicios = async (req, res) => {
    const nombre = String(req.query.nombre ?? '').trim();
    const zona = String(req.query.zona ?? '').trim();
    const empresa = String(req.query.empresa ?? '').trim();
    try {
        const servicios = await (0, servicio_service_1.buscarServiciosPorNombre)(nombre, zona, empresa);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al buscar los servicios');
    }
};
exports.buscarServicios = buscarServicios;
// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR CATEGORÍA
// ======================================================
const buscarServiciosCategoria = async (req, res) => {
    const categoriaId = Number(req.params.categoriaId);
    try {
        const servicios = await (0, servicio_service_1.buscarServiciosPorCategoria)(categoriaId);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al buscar los servicios por categoría');
    }
};
exports.buscarServiciosCategoria = buscarServiciosCategoria;
// ======================================================
// CREAR SERVICIO
// ======================================================
const crearServicio = async (req, res) => {
    const { nombre, descripcion, imagen, categoriaId, usuarioId, draft } = req.body;
    try {
        const servicio = await (0, servicio_service_1.createServicio)({
            nombre,
            descripcion,
            imagen,
            categoriaId: Number(categoriaId),
            usuarioId: Number(usuarioId),
            draft
        });
        res.status(201).json({
            message: 'Servicio creado correctamente',
            servicio: serializeServicio(servicio)
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al crear el servicio');
    }
};
exports.crearServicio = crearServicio;
// ======================================================
// ACTUALIZAR SERVICIO
// ======================================================
const actualizarServicio = async (req, res) => {
    const id = Number(req.params.id);
    const { usuarioId, ...data } = req.body;
    try {
        const servicio = await (0, servicio_service_1.updateServicio)(id, Number(usuarioId), data);
        if (!servicio) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Servicio no encontrado');
        }
        res.json({
            message: 'Servicio actualizado correctamente',
            servicio: serializeServicio(servicio)
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al actualizar el servicio');
    }
};
exports.actualizarServicio = actualizarServicio;
// ======================================================
// BORRAR SERVICIO
// ======================================================
const borrarServicio = async (req, res) => {
    const id = Number(req.params.id);
    const usuarioId = Number(req.query.usuarioId ?? req.body?.usuarioId);
    if (!Number.isSafeInteger(usuarioId) || usuarioId <= 0) {
        return (0, api_error_1.respondWithError)(res, 400, 'VALIDATION_ERROR', 'El parámetro "usuarioId" es requerido y debe ser un entero positivo');
    }
    try {
        const eliminado = await (0, servicio_service_1.deleteServicio)(id, usuarioId);
        if (!eliminado) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Servicio no encontrado');
        }
        res.json({
            message: 'Servicio eliminado correctamente'
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al eliminar el servicio');
    }
};
exports.borrarServicio = borrarServicio;

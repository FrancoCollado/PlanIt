"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarServicio = exports.actualizarServicio = exports.crearServicio = exports.buscarServiciosCategoria = exports.buscarServicios = exports.getServicios = void 0;
const servicio_service_1 = require("../services/servicio.service");
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
    if (!usuarioId) {
        return res.status(400).json({
            error: 'El parámetro "usuarioId" es requerido'
        });
    }
    try {
        const servicios = await (0, servicio_service_1.listServiciosByUsuario)(usuarioId);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        console.error('Error al listar servicios:', error);
        res.status(500).json({
            error: 'Error al obtener los servicios'
        });
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
    if (!nombre && !zona && !empresa) {
        return res.status(400).json({
            error: 'Ingresá un nombre, una zona o una empresa para buscar'
        });
    }
    try {
        const servicios = await (0, servicio_service_1.buscarServiciosPorNombre)(nombre, zona, empresa);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        console.error('Error al buscar servicios:', error);
        res.status(500).json({
            error: 'Error al buscar los servicios'
        });
    }
};
exports.buscarServicios = buscarServicios;
// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR CATEGORÍA
// ======================================================
const buscarServiciosCategoria = async (req, res) => {
    const categoriaId = Number(req.params.categoriaId);
    if (!categoriaId) {
        return res.status(400).json({
            error: 'La categoría es requerida'
        });
    }
    try {
        const servicios = await (0, servicio_service_1.buscarServiciosPorCategoria)(categoriaId);
        res.json({
            servicios: servicios.map(serializeServicio)
        });
    }
    catch (error) {
        console.error('Error al buscar servicios por categoría:', error);
        res.status(500).json({
            error: 'Error al buscar los servicios por categoría'
        });
    }
};
exports.buscarServiciosCategoria = buscarServiciosCategoria;
// ======================================================
// CREAR SERVICIO
// ======================================================
const crearServicio = async (req, res) => {
    const { nombre, descripcion, imagen, categoriaId, usuarioId, draft } = req.body;
    if (!nombre || !categoriaId || !usuarioId) {
        return res.status(400).json({
            error: 'El nombre, la categoría y el usuario son requeridos'
        });
    }
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
        console.error('Error al crear servicio:', error);
        res.status(400).json({
            error: error instanceof Error
                ? error.message
                : 'Error al crear el servicio'
        });
    }
};
exports.crearServicio = crearServicio;
// ======================================================
// ACTUALIZAR SERVICIO
// ======================================================
const actualizarServicio = async (req, res) => {
    const id = Number(req.params.id);
    const { usuarioId, ...data } = req.body;
    if (!usuarioId) {
        return res.status(400).json({
            error: 'El parámetro "usuarioId" es requerido'
        });
    }
    try {
        const servicio = await (0, servicio_service_1.updateServicio)(id, Number(usuarioId), data);
        if (!servicio) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }
        res.json({
            message: 'Servicio actualizado correctamente',
            servicio: serializeServicio(servicio)
        });
    }
    catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(400).json({
            error: error instanceof Error
                ? error.message
                : 'Error al actualizar el servicio'
        });
    }
};
exports.actualizarServicio = actualizarServicio;
// ======================================================
// BORRAR SERVICIO
// ======================================================
const borrarServicio = async (req, res) => {
    const id = Number(req.params.id);
    const usuarioId = Number(req.query.usuarioId ?? req.body.usuarioId);
    if (!usuarioId) {
        return res.status(400).json({
            error: 'El parámetro "usuarioId" es requerido'
        });
    }
    try {
        const eliminado = await (0, servicio_service_1.deleteServicio)(id, usuarioId);
        if (!eliminado) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }
        res.json({
            message: 'Servicio eliminado correctamente'
        });
    }
    catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({
            error: 'Error al eliminar el servicio'
        });
    }
};
exports.borrarServicio = borrarServicio;

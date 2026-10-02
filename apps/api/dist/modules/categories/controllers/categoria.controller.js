"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarCategoria = exports.actualizarCategoria = exports.crearCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_service_1 = require("../services/categoria.service");
const api_error_1 = require("../../../shared/api-error");
const serializeCategoria = (categoria) => {
    if (!categoria)
        return null;
    return {
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        creadoEn: categoria.creadoEn,
        evento: {
            id: categoria.evento.id,
            nombre: categoria.evento.nombre
        }
    };
};
const getCategorias = async (req, res) => {
    try {
        const categorias = await (0, categoria_service_1.listCategorias)(req.auth?.role === 'administrador');
        res.json({ categorias: categorias.map(serializeCategoria) });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener las categorías');
    }
};
exports.getCategorias = getCategorias;
const getCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const categoria = await (0, categoria_service_1.getCategoriaById)(id);
        if (!categoria || (categoria.evento.draft && req.auth?.role !== 'administrador')) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Categoría no encontrada');
        }
        res.json({ categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener la categoría');
    }
};
exports.getCategoria = getCategoria;
const crearCategoria = async (req, res) => {
    const { nombre, descripcion, eventoId } = req.body;
    try {
        const categoria = await (0, categoria_service_1.createCategoria)({ nombre, descripcion, eventoId: Number(eventoId) });
        res.status(201).json({ message: 'Categoría creada correctamente', categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al crear la categoría');
    }
};
exports.crearCategoria = crearCategoria;
const actualizarCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const categoria = await (0, categoria_service_1.updateCategoria)(id, req.body);
        if (!categoria) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Categoría no encontrada');
        }
        res.json({ message: 'Categoría actualizada correctamente', categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al actualizar la categoría');
    }
};
exports.actualizarCategoria = actualizarCategoria;
const borrarCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const eliminada = await (0, categoria_service_1.deleteCategoria)(id);
        if (!eliminada) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Categoría no encontrada');
        }
        res.json({ message: 'Categoría eliminada correctamente' });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al eliminar la categoría');
    }
};
exports.borrarCategoria = borrarCategoria;

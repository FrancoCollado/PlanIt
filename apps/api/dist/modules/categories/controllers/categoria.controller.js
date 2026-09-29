"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarCategoria = exports.actualizarCategoria = exports.crearCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_service_1 = require("../services/categoria.service");
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
const getCategorias = async (_req, res) => {
    try {
        const categorias = await (0, categoria_service_1.listCategorias)();
        res.json({ categorias: categorias.map(serializeCategoria) });
    }
    catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};
exports.getCategorias = getCategorias;
const getCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const categoria = await (0, categoria_service_1.getCategoriaById)(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};
exports.getCategoria = getCategoria;
const crearCategoria = async (req, res) => {
    const { nombre, descripcion, eventoId } = req.body;
    if (!nombre || !eventoId) {
        return res.status(400).json({ error: 'El nombre y el evento son requeridos' });
    }
    try {
        const categoria = await (0, categoria_service_1.createCategoria)({ nombre, descripcion, eventoId: Number(eventoId) });
        res.status(201).json({ message: 'Categoría creada correctamente', categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear la categoría' });
    }
};
exports.crearCategoria = crearCategoria;
const actualizarCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const categoria = await (0, categoria_service_1.updateCategoria)(id, req.body);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada correctamente', categoria: serializeCategoria(categoria) });
    }
    catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al actualizar la categoría' });
    }
};
exports.actualizarCategoria = actualizarCategoria;
const borrarCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const eliminada = await (0, categoria_service_1.deleteCategoria)(id);
        if (!eliminada) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};
exports.borrarCategoria = borrarCategoria;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.listCategorias = void 0;
const orm_1 = require("../../../config/orm");
const categoria_1 = require("../../../entities/categoria");
const evento_1 = require("../../../entities/evento");
const listCategorias = async () => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.find(categoria_1.Categoria, {}, { populate: ['evento'], orderBy: { creadoEn: 'DESC' } });
};
exports.listCategorias = listCategorias;
const getCategoriaById = async (id) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.findOne(categoria_1.Categoria, { id }, { populate: ['evento'] });
};
exports.getCategoriaById = getCategoriaById;
const createCategoria = async (data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const evento = await em.findOne(evento_1.Evento, { id: data.eventoId });
    if (!evento) {
        throw new Error('El evento indicado no existe');
    }
    const categoria = em.create(categoria_1.Categoria, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        evento,
        creadoEn: new Date()
    });
    await em.persist(categoria).flush();
    return categoria;
};
exports.createCategoria = createCategoria;
const updateCategoria = async (id, data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const categoria = await em.findOne(categoria_1.Categoria, { id });
    if (!categoria)
        return null;
    if (data.nombre !== undefined)
        categoria.nombre = data.nombre;
    if (data.descripcion !== undefined)
        categoria.descripcion = data.descripcion;
    if (data.eventoId !== undefined) {
        const evento = await em.findOne(evento_1.Evento, { id: data.eventoId });
        if (!evento) {
            throw new Error('El evento indicado no existe');
        }
        categoria.evento = evento;
    }
    await em.flush();
    return categoria;
};
exports.updateCategoria = updateCategoria;
const deleteCategoria = async (id) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const categoria = await em.findOne(categoria_1.Categoria, { id });
    if (!categoria)
        return false;
    await em.remove(categoria).flush();
    return true;
};
exports.deleteCategoria = deleteCategoria;

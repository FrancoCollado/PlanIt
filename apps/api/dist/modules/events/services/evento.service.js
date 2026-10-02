"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvento = exports.updateEvento = exports.createEvento = exports.getEventoById = exports.listEventos = void 0;
const orm_1 = require("../../../config/orm");
const evento_1 = require("../../../entities/evento");
const listEventos = async (includeDraft = false) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.find(evento_1.Evento, includeDraft ? {} : { draft: false }, { orderBy: { creadoEn: 'DESC' } });
};
exports.listEventos = listEventos;
const getEventoById = async (id) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.findOne(evento_1.Evento, { id });
};
exports.getEventoById = getEventoById;
const createEvento = async (data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const evento = em.create(evento_1.Evento, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        imagen: data.imagen,
        draft: data.draft ?? true,
        creadoEn: new Date()
    });
    await em.persist(evento).flush();
    return evento;
};
exports.createEvento = createEvento;
const updateEvento = async (id, data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const evento = await em.findOne(evento_1.Evento, { id });
    if (!evento)
        return null;
    if (data.nombre !== undefined)
        evento.nombre = data.nombre;
    if (data.descripcion !== undefined)
        evento.descripcion = data.descripcion;
    if (data.imagen !== undefined)
        evento.imagen = data.imagen;
    if (data.draft !== undefined)
        evento.draft = data.draft;
    await em.flush();
    return evento;
};
exports.updateEvento = updateEvento;
const deleteEvento = async (id) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const evento = await em.findOne(evento_1.Evento, { id });
    if (!evento)
        return false;
    await em.remove(evento).flush();
    return true;
};
exports.deleteEvento = deleteEvento;

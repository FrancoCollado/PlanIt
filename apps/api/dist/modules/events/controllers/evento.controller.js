"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarEvento = exports.actualizarEvento = exports.crearEvento = exports.getEvento = exports.getEventos = void 0;
const evento_service_1 = require("../services/evento.service");
const api_error_1 = require("../../../shared/api-error");
const getEventos = async (req, res) => {
    try {
        const eventos = await (0, evento_service_1.listEventos)(req.auth?.role === 'administrador');
        res.json({ eventos });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener los eventos');
    }
};
exports.getEventos = getEventos;
const getEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const evento = await (0, evento_service_1.getEventoById)(id);
        if (!evento || (evento.draft && req.auth?.role !== 'administrador')) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Evento no encontrado');
        }
        res.json({ evento });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener el evento');
    }
};
exports.getEvento = getEvento;
const crearEvento = async (req, res) => {
    const { nombre, descripcion, imagen, draft } = req.body;
    try {
        const evento = await (0, evento_service_1.createEvento)({ nombre, descripcion, imagen, draft });
        res.status(201).json({ message: 'Evento creado correctamente', evento });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al crear el evento');
    }
};
exports.crearEvento = crearEvento;
const actualizarEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const evento = await (0, evento_service_1.updateEvento)(id, req.body);
        if (!evento) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Evento no encontrado');
        }
        res.json({ message: 'Evento actualizado correctamente', evento });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al actualizar el evento');
    }
};
exports.actualizarEvento = actualizarEvento;
const borrarEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const eliminado = await (0, evento_service_1.deleteEvento)(id);
        if (!eliminado) {
            return (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Evento no encontrado');
        }
        res.json({ message: 'Evento eliminado correctamente' });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al eliminar el evento');
    }
};
exports.borrarEvento = borrarEvento;

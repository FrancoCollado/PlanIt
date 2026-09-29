"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarEvento = exports.actualizarEvento = exports.crearEvento = exports.getEvento = exports.getEventos = void 0;
const evento_service_1 = require("../services/evento.service");
const getEventos = async (_req, res) => {
    try {
        const eventos = await (0, evento_service_1.listEventos)();
        res.json({ eventos });
    }
    catch (error) {
        console.error('Error al listar eventos:', error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};
exports.getEventos = getEventos;
const getEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const evento = await (0, evento_service_1.getEventoById)(id);
        if (!evento) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ evento });
    }
    catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ error: 'Error al obtener el evento' });
    }
};
exports.getEvento = getEvento;
const crearEvento = async (req, res) => {
    const { nombre, descripcion, imagen, draft } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del evento es requerido' });
    }
    try {
        const evento = await (0, evento_service_1.createEvento)({ nombre, descripcion, imagen, draft });
        res.status(201).json({ message: 'Evento creado correctamente', evento });
    }
    catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};
exports.crearEvento = crearEvento;
const actualizarEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const evento = await (0, evento_service_1.updateEvento)(id, req.body);
        if (!evento) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento actualizado correctamente', evento });
    }
    catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ error: 'Error al actualizar el evento' });
    }
};
exports.actualizarEvento = actualizarEvento;
const borrarEvento = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const eliminado = await (0, evento_service_1.deleteEvento)(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
};
exports.borrarEvento = borrarEvento;

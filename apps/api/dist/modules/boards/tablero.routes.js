"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orm_1 = require("../../config/orm");
const tablero_1 = require("../../entities/tablero");
const tablero_servicio_1 = require("../../entities/tablero-servicio");
const evento_1 = require("../../entities/evento");
const servicio_1 = require("../../entities/servicio");
const usuario_1 = require("../../entities/usuario");
const api_error_1 = require("../../shared/api-error");
const request_validation_1 = require("../../shared/request-validation");
const request_schemas_1 = require("../../shared/request-schemas");
const ensure_orm_1 = require("../../middlewares/ensure-orm");
const authorization_1 = require("../../middlewares/authorization");
const router = (0, express_1.Router)();
router.use(authorization_1.authenticate, (0, authorization_1.requireRoles)('cliente'));
const serialize = (tablero, servicios = []) => ({
    id: tablero.id,
    nombre: tablero.nombre,
    evento: tablero.evento ? { id: tablero.evento.id, nombre: tablero.evento.nombre } : null,
    fechaCreacion: tablero.fechaCreacion,
    servicios: servicios.map(({ servicio }) => ({
        id: servicio.id, nombre: servicio.nombre, descripcion: servicio.descripcion,
        imagen: servicio.imagen, categoria: { id: servicio.categoria.id, nombre: servicio.categoria.nombre }
    }))
});
router.get('/', ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const tableros = await em.find(tablero_1.Tablero, { cliente: req.auth.userId }, { populate: ['evento'], orderBy: { fechaCreacion: 'DESC' } });
        const guardados = await em.find(tablero_servicio_1.TableroServicio, { tablero: { cliente: req.auth.userId } }, { populate: ['servicio.categoria'] });
        res.json({ tableros: tableros.map(tablero => serialize(tablero, guardados.filter(item => item.tablero.id === tablero.id))) });
    }
    catch (error) {
        console.error('Error al listar tableros:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener los tableros');
    }
});
router.post('/', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.createTablero), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    const { nombre, eventoId } = req.body ?? {};
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const [cliente, evento] = await Promise.all([
            em.findOne(usuario_1.User, { id: req.auth.userId, rol: 'cliente', activo: true }),
            em.findOne(evento_1.Evento, { id: Number(eventoId), draft: false })
        ]);
        if (!cliente || !evento) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Cliente o evento no disponible');
            return;
        }
        const tablero = em.create(tablero_1.Tablero, { nombre: nombre.trim(), cliente, evento, fechaCreacion: new Date() });
        await em.persist(tablero).flush();
        res.status(201).json({ tablero: serialize(tablero) });
    }
    catch (error) {
        console.error('Error al crear tablero:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al crear el tablero');
    }
});
router.get('/:id', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.tableroIdParam), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const tablero = await em.findOne(tablero_1.Tablero, { id: Number(req.params.id), cliente: req.auth.userId }, { populate: ['evento'] });
        if (!tablero) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Tablero no encontrado');
            return;
        }
        const guardados = await em.find(tablero_servicio_1.TableroServicio, { tablero: tablero.id }, { populate: ['servicio.categoria'] });
        res.json({ tablero: serialize(tablero, guardados) });
    }
    catch (error) {
        console.error('Error al obtener tablero:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al obtener el tablero');
    }
});
router.put('/:id', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.updateTablero), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    const { nombre, eventoId } = req.body ?? {};
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const tablero = await em.findOne(tablero_1.Tablero, { id: Number(req.params.id), cliente: req.auth.userId }, { populate: ['evento'] });
        if (!tablero) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Tablero no encontrado');
            return;
        }
        const evento = await em.findOne(evento_1.Evento, { id: Number(eventoId), draft: false });
        if (!evento) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Evento no disponible');
            return;
        }
        tablero.nombre = nombre.trim();
        tablero.evento = evento;
        await em.flush();
        const guardados = await em.find(tablero_servicio_1.TableroServicio, { tablero: tablero.id }, { populate: ['servicio.categoria'] });
        res.json({ tablero: serialize(tablero, guardados) });
    }
    catch (error) {
        console.error('Error al editar tablero:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al editar el tablero');
    }
});
router.delete('/:id', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.tableroIdParam), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const tablero = await em.findOne(tablero_1.Tablero, { id: Number(req.params.id), cliente: req.auth.userId });
        if (!tablero) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Tablero no encontrado');
            return;
        }
        await em.remove(tablero).flush();
        res.status(204).end();
    }
    catch (error) {
        console.error('Error al borrar tablero:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al borrar el tablero');
    }
});
router.post('/:id/servicios', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.addServicioToTablero), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const tablero = await em.findOne(tablero_1.Tablero, { id: Number(req.params.id), cliente: req.auth.userId });
        if (!tablero) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Tablero no encontrado');
            return;
        }
        const servicio = await em.findOne(servicio_1.Servicio, { id: Number(req.body.servicioId), draft: false });
        if (!servicio) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Servicio no disponible');
            return;
        }
        const existing = await em.findOne(tablero_servicio_1.TableroServicio, { tablero: tablero.id, servicio: servicio.id });
        if (existing) {
            (0, api_error_1.respondWithError)(res, 409, 'CONFLICT', 'El servicio ya está en este tablero');
            return;
        }
        await em.persist(em.create(tablero_servicio_1.TableroServicio, { tablero, servicio, guardadoEn: new Date() })).flush();
        res.status(201).json({ message: 'Servicio agregado al tablero' });
    }
    catch (error) {
        console.error('Error al guardar servicio:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al guardar el servicio');
    }
});
router.delete('/:id/servicios/:servicioId', (0, request_validation_1.validateRequest)(request_schemas_1.requestSchemas.removeServicioFromTablero), ensure_orm_1.ensureOrm, authorization_1.ensureActiveUser, async (req, res) => {
    try {
        const em = (0, orm_1.getOrm)().em.fork();
        const guardado = await em.findOne(tablero_servicio_1.TableroServicio, {
            tablero: { id: Number(req.params.id), cliente: req.auth.userId }, servicio: Number(req.params.servicioId)
        });
        if (!guardado) {
            (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Servicio no encontrado en el tablero');
            return;
        }
        await em.remove(guardado).flush();
        res.status(204).end();
    }
    catch (error) {
        console.error('Error al quitar servicio:', error);
        (0, api_error_1.sendApiError)(res, error, 'Error al quitar el servicio');
    }
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicio = exports.updateServicio = exports.createServicio = exports.getServicioById = exports.buscarServiciosPorCategoria = exports.buscarServiciosPorNombre = exports.listServiciosByUsuario = void 0;
const orm_1 = require("../../../config/orm");
const servicio_1 = require("../../../entities/servicio");
const categoria_1 = require("../../../entities/categoria");
const usuario_1 = require("../../../entities/usuario");
// ======================================================
// LISTAR SERVICIOS DE UNA EMPRESA
// ======================================================
const listServiciosByUsuario = async (usuarioId) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.find(servicio_1.Servicio, { usuario: usuarioId }, {
        populate: ['categoria'],
        orderBy: { creadoEn: 'DESC' }
    });
};
exports.listServiciosByUsuario = listServiciosByUsuario;
// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR NOMBRE
// Se utiliza desde la pantalla del cliente.
// ======================================================
const buscarServiciosPorNombre = async (nombre, zona = '', empresa = '') => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.find(servicio_1.Servicio, {
        ...(nombre && { nombre: { $like: `%${nombre}%` } }),
        draft: false,
        usuario: {
            rol: 'empresa',
            activo: true,
            ...(zona && { zona: { $like: `%${zona}%` } }),
            ...(empresa && { nombre: { $like: `%${empresa}%` } })
        }
    }, {
        populate: ['categoria'],
        orderBy: { nombre: 'ASC' }
    });
};
exports.buscarServiciosPorNombre = buscarServiciosPorNombre;
// ======================================================
// BUSCAR SERVICIOS PUBLICADOS POR CATEGORÍA
// Se utiliza desde la pantalla del cliente.
// ======================================================
const buscarServiciosPorCategoria = async (categoriaId) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.find(servicio_1.Servicio, {
        categoria: categoriaId,
        draft: false
    }, {
        populate: ['categoria'],
        orderBy: { nombre: 'ASC' }
    });
};
exports.buscarServiciosPorCategoria = buscarServiciosPorCategoria;
// ======================================================
// OBTENER SERVICIO POR ID
// ======================================================
const getServicioById = async (id) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.findOne(servicio_1.Servicio, { id }, { populate: ['categoria'] });
};
exports.getServicioById = getServicioById;
// ======================================================
// CREAR SERVICIO
// ======================================================
const createServicio = async (data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const categoria = await em.findOne(categoria_1.Categoria, {
        id: data.categoriaId
    });
    if (!categoria) {
        throw new Error('La categoría indicada no existe');
    }
    const usuario = await em.findOne(usuario_1.User, {
        id: data.usuarioId
    });
    if (!usuario) {
        throw new Error('El usuario indicado no existe');
    }
    const servicio = em.create(servicio_1.Servicio, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        imagen: data.imagen,
        categoria,
        usuario,
        draft: data.draft ?? true,
        creadoEn: new Date()
    });
    await em.persist(servicio).flush();
    return servicio;
};
exports.createServicio = createServicio;
// ======================================================
// ACTUALIZAR SERVICIO
// ======================================================
const updateServicio = async (id, usuarioId, data) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const servicio = await em.findOne(servicio_1.Servicio, {
        id,
        usuario: usuarioId
    });
    if (!servicio) {
        return null;
    }
    if (data.nombre !== undefined) {
        servicio.nombre = data.nombre;
    }
    if (data.descripcion !== undefined) {
        servicio.descripcion = data.descripcion;
    }
    if (data.imagen !== undefined) {
        servicio.imagen = data.imagen;
    }
    if (data.draft !== undefined) {
        servicio.draft = data.draft;
    }
    if (data.categoriaId !== undefined) {
        const categoria = await em.findOne(categoria_1.Categoria, {
            id: data.categoriaId
        });
        if (!categoria) {
            throw new Error('La categoría indicada no existe');
        }
        servicio.categoria = categoria;
    }
    await em.flush();
    return servicio;
};
exports.updateServicio = updateServicio;
// ======================================================
// BORRAR SERVICIO
// ======================================================
const deleteServicio = async (id, usuarioId) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const servicio = await em.findOne(servicio_1.Servicio, {
        id,
        usuario: usuarioId
    });
    if (!servicio) {
        return false;
    }
    await em.remove(servicio).flush();
    return true;
};
exports.deleteServicio = deleteServicio;

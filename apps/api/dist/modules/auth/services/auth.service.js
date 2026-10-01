"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByCredentials = void 0;
const orm_1 = require("../../../config/orm");
const usuario_1 = require("../../../entities/usuario");
// Busca un usuario por email y contraseña
const findUserByCredentials = async (email, password) => {
    const em = (0, orm_1.getOrm)().em.fork();
    return em.findOne(usuario_1.User, { email, password });
};
exports.findUserByCredentials = findUserByCredentials;
// Crea un nuevo usuario
const createUser = async (name, email, password, role, businessData) => {
    const em = (0, orm_1.getOrm)().em.fork();
    const user = em.create(usuario_1.User, {
        nombre: name,
        email,
        password,
        rol: role,
        activo: true,
        ...(businessData ?? {})
    });
    await em.persist(user).flush();
    return user;
};
exports.createUser = createUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByCredentials = void 0;
const orm_1 = require("../../../config/orm");
const usuario_1 = require("../../../entities/usuario");
// Busca un usuario por email y contraseña
const findUserByCredentials = async (email, password) => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    const user = await em.findOne(usuario_1.User, {
        email,
        password
    });
    return user;
};
exports.findUserByCredentials = findUserByCredentials;
// Crea un nuevo usuario
const createUser = async (name, email, password, role, businessData) => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    const user = em.create(usuario_1.User, {
        nombre: name,
        email: email,
        password: password,
        rol: role,
        activo: true,
        ...(businessData ?? {})
    });
    await em.persist(user).flush();
    return user;
};
exports.createUser = createUser;

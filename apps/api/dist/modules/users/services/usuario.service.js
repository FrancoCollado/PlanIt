"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsuarioActivo = exports.listUsuariosByRol = void 0;
const orm_1 = require("../../../config/orm");
const usuario_1 = require("../../../entities/usuario");
const listUsuariosByRol = async (rol) => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    return em.find(usuario_1.User, rol ? { rol: rol } : {}, { orderBy: { nombre: 'ASC' } });
};
exports.listUsuariosByRol = listUsuariosByRol;
const setUsuarioActivo = async (id, activo) => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    const usuario = await em.findOne(usuario_1.User, { id });
    if (!usuario)
        return null;
    usuario.activo = activo;
    await em.flush();
    return usuario;
};
exports.setUsuarioActivo = setUsuarioActivo;

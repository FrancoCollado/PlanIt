"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessStats = exports.getAdminStats = void 0;
const orm_1 = require("../../../config/orm");
const usuario_1 = require("../../../entities/usuario");
const evento_1 = require("../../../entities/evento");
const servicio_1 = require("../../../entities/servicio");
const tablero_servicio_1 = require("../../../entities/tablero-servicio");
const getAdminStats = async () => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    const [empresasActivas, eventosPublicados, eventosBorrador, clientesRegistrados] = await Promise.all([
        em.count(usuario_1.User, { rol: 'empresa', activo: true }),
        em.count(evento_1.Evento, { draft: false }),
        em.count(evento_1.Evento, { draft: true }),
        em.count(usuario_1.User, { rol: 'cliente' })
    ]);
    return { empresasActivas, eventosPublicados, eventosBorrador, clientesRegistrados };
};
exports.getAdminStats = getAdminStats;
const getBusinessStats = async (usuarioId) => {
    const orm = (0, orm_1.getOrm)();
    const em = orm.em.fork();
    const [serviciosActivos, serviciosBorrador, vecesGuardadoEnTableros, serviciosDelUsuario] = await Promise.all([
        em.count(servicio_1.Servicio, { usuario: usuarioId, draft: false }),
        em.count(servicio_1.Servicio, { usuario: usuarioId, draft: true }),
        em.count(tablero_servicio_1.TableroServicio, { servicio: { usuario: usuarioId } }),
        em.find(servicio_1.Servicio, { usuario: usuarioId }, { populate: ['categoria'] })
    ]);
    const categoriasPresentes = new Set(serviciosDelUsuario.map((s) => s.categoria.id)).size;
    return { serviciosActivos, serviciosBorrador, vecesGuardadoEnTableros, categoriasPresentes };
};
exports.getBusinessStats = getBusinessStats;

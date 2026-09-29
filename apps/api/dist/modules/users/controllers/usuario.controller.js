"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUsuarioActivo = exports.getUsuarios = void 0;
const usuario_service_1 = require("../services/usuario.service");
const getUsuarios = async (req, res) => {
    const rol = typeof req.query.rol === 'string' ? req.query.rol : undefined;
    try {
        const usuarios = await (0, usuario_service_1.listUsuariosByRol)(rol);
        res.json({
            usuarios: usuarios.map((u) => ({
                id: u.id,
                nombre: u.nombre,
                email: u.email,
                rol: u.rol,
                zona: u.zona,
                cuit: u.cuit,
                telefono: u.telefono,
                activo: u.activo,
                creadoEn: u.creadoEn
            }))
        });
    }
    catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};
exports.getUsuarios = getUsuarios;
const patchUsuarioActivo = async (req, res) => {
    const id = Number(req.params.id);
    const { activo } = req.body;
    if (typeof activo !== 'boolean') {
        return res.status(400).json({ error: 'El campo "activo" es requerido y debe ser booleano' });
    }
    try {
        const usuario = await (0, usuario_service_1.setUsuarioActivo)(id, activo);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({
            message: activo ? 'Usuario reactivado correctamente' : 'Usuario suspendido correctamente',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                activo: usuario.activo
            }
        });
    }
    catch (error) {
        console.error('Error al actualizar estado del usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
exports.patchUsuarioActivo = patchUsuarioActivo;

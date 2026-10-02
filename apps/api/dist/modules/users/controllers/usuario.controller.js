import { listUsuariosByRol, setUsuarioActivo } from '../services/usuario.service.js';
import { respondWithError, sendApiError } from '../../../shared/api-error.js';
export const getUsuarios = async (req, res) => {
    const rol = typeof req.query.rol === 'string' ? req.query.rol : undefined;
    try {
        const usuarios = await listUsuariosByRol(rol);
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
        sendApiError(res, error, 'Error al obtener los usuarios');
    }
};
export const patchUsuarioActivo = async (req, res) => {
    const id = Number(req.params.id);
    const { activo } = req.body;
    try {
        const usuario = await setUsuarioActivo(id, activo);
        if (!usuario) {
            return respondWithError(res, 404, 'NOT_FOUND', 'Usuario no encontrado');
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
        sendApiError(res, error, 'Error al actualizar el usuario');
    }
};

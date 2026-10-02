"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = require("../../../shared/api-error");
const issueToken = (id, rol) => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET no está configurado');
    return jsonwebtoken_1.default.sign({ rol }, process.env.JWT_SECRET, { subject: String(id), expiresIn: '12h' });
};
// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, auth_service_1.findUserByCredentials)(email, password);
        if (!user) {
            return (0, api_error_1.respondWithError)(res, 401, 'UNAUTHENTICATED', 'Credenciales inválidas');
        }
        if (!user.activo) {
            return (0, api_error_1.respondWithError)(res, 403, 'FORBIDDEN', 'Tu cuenta fue suspendida por un administrador. Contactá a soporte para más información.');
        }
        res.json({
            message: 'Inicio de sesión exitoso',
            token: issueToken(user.id, user.rol),
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                creadoEn: user.creadoEn
            }
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al iniciar sesión');
    }
};
exports.login = login;
// REGISTRO
const register = async (req, res) => {
    const { name, email, password, role, zona, cuit, telefono } = req.body;
    try {
        const user = await (0, auth_service_1.createUser)(name, email, password, role, role === 'empresa' ? { zona: zona, cuit: Number(cuit), telefono: Number(telefono) } : undefined);
        res.status(201).json({
            message: 'Usuario creado correctamente',
            token: issueToken(user.id, user.rol),
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                creadoEn: user.creadoEn
            }
        });
    }
    catch (error) {
        (0, api_error_1.sendApiError)(res, error, 'Error al crear el usuario');
    }
};
exports.register = register;

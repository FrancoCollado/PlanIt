"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const issueToken = (id, rol) => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET no está configurado');
    return jsonwebtoken_1.default.sign({ rol }, process.env.JWT_SECRET, { subject: String(id), expiresIn: '12h' });
};
// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email y contraseña son requeridos'
        });
    }
    try {
        const user = await (0, auth_service_1.findUserByCredentials)(email, password);
        if (!user) {
            return res.status(401).json({
                error: 'Credenciales inválidas'
            });
        }
        if (!user.activo) {
            return res.status(403).json({
                error: 'Tu cuenta fue suspendida por un administrador. Contactá a soporte para más información.'
            });
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
        console.error('Error en login:', error);
        res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
};
exports.login = login;
// REGISTRO
const register = async (req, res) => {
    const { name, email, password, confirmPassword, acceptTerms, role, zona, cuit, telefono } = req.body;
    // Verifico que estén todos los campos
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos'
        });
    }
    // Verifico que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({
            error: 'Las contraseñas no coinciden'
        });
    }
    // Verifico que haya aceptado los términos
    if (!acceptTerms) {
        return res.status(400).json({
            error: 'Debes aceptar los términos y condiciones'
        });
    }
    // El rol solo puede ser 'cliente' o 'empresa' desde el registro público (admins ya vienen cargados)
    if (role !== 'cliente' && role !== 'empresa') {
        return res.status(400).json({
            error: 'Rol inválido, debe ser "cliente" o "empresa"'
        });
    }
    // Si es empresa, exijo los datos adicionales
    if (role === 'empresa' && (!zona || cuit === undefined || telefono === undefined)) {
        return res.status(400).json({
            error: 'Zona, CUIT y teléfono son requeridos para cuentas de empresa'
        });
    }
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
        console.error('Error en registro:', error);
        res.status(500).json({
            error: 'Error al crear el usuario'
        });
    }
};
exports.register = register;

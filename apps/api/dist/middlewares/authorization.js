"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureActiveUser = exports.requireOwnUserId = exports.requireRoles = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orm_1 = require("../config/orm");
const usuario_1 = require("../entities/usuario");
const api_error_1 = require("../shared/api-error");
const accessRoles = ['cliente', 'empresa', 'administrador'];
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    const secret = process.env.JWT_SECRET;
    if (!token) {
        (0, api_error_1.respondWithError)(res, 401, 'UNAUTHENTICATED', 'Iniciá sesión para acceder a este recurso');
        return;
    }
    if (!secret) {
        next(new Error('JWT_SECRET no está configurado'));
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (typeof payload === 'string' ||
            typeof payload.sub !== 'string' ||
            !/^\d+$/.test(payload.sub) ||
            !Number.isSafeInteger(Number(payload.sub)) ||
            Number(payload.sub) <= 0 ||
            !accessRoles.includes(payload.rol)) {
            (0, api_error_1.respondWithError)(res, 401, 'UNAUTHENTICATED', 'La sesión no es válida');
            return;
        }
        req.auth = {
            userId: Number(payload.sub),
            role: payload.rol
        };
        next();
    }
    catch {
        (0, api_error_1.respondWithError)(res, 401, 'UNAUTHENTICATED', 'La sesión expiró o no es válida');
    }
};
exports.authenticate = authenticate;
const requireRoles = (...allowedRoles) => (req, res, next) => {
    if (!req.auth) {
        (0, api_error_1.respondWithError)(res, 401, 'UNAUTHENTICATED', 'Iniciá sesión para acceder a este recurso');
        return;
    }
    if (!allowedRoles.includes(req.auth.role)) {
        (0, api_error_1.respondWithError)(res, 403, 'FORBIDDEN', 'No tenés permisos para realizar esta operación');
        return;
    }
    next();
};
exports.requireRoles = requireRoles;
const requireOwnUserId = (req, res, next) => {
    const suppliedId = req.query.usuarioId ?? req.body?.usuarioId;
    const userId = Number(suppliedId);
    if (!suppliedId || !Number.isSafeInteger(userId) || userId <= 0) {
        (0, api_error_1.respondWithError)(res, 400, 'VALIDATION_ERROR', 'El usuario indicado debe ser un ID entero positivo');
        return;
    }
    if (userId !== req.auth?.userId) {
        (0, api_error_1.respondWithError)(res, 403, 'FORBIDDEN', 'No podés acceder a los datos de otro usuario');
        return;
    }
    next();
};
exports.requireOwnUserId = requireOwnUserId;
const ensureActiveUser = async (req, res, next) => {
    try {
        const user = await (0, orm_1.getOrm)().em.fork().findOne(usuario_1.User, { id: req.auth?.userId });
        if (!user || !user.activo || user.rol !== req.auth?.role) {
            (0, api_error_1.respondWithError)(res, 403, 'FORBIDDEN', 'La cuenta está inactiva o sus permisos cambiaron');
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.ensureActiveUser = ensureActiveUser;

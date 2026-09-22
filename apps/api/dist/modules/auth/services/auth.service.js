"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByCredentials = void 0;
const database_1 = __importDefault(require("../../../config/database"));
// Busca un usuario que coincida con email y contraseña en la tabla `usuarios`
const findUserByCredentials = async (email, password) => {
    const [rows] = await database_1.default.query('SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE email = ? AND contraseña = ? LIMIT 1', [email, password]);
    const users = rows;
    return users[0] ?? null;
};
exports.findUserByCredentials = findUserByCredentials;

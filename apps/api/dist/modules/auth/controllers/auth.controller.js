"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    try {
        const user = await (0, auth_service_1.findUserByCredentials)(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        res.json({ message: 'Inicio de sesión exitoso', user });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
exports.login = login;

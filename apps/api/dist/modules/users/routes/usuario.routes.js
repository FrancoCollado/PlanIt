"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.getUsuarios);
router.patch('/:id/activo', usuario_controller_1.patchUsuarioActivo);
exports.default = router;

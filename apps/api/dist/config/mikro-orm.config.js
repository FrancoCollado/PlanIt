"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const mysql_1 = require("@mikro-orm/mysql");
const legacy_1 = require("@mikro-orm/decorators/legacy");
const usuario_1 = require("../entities/usuario");
const evento_1 = require("../entities/evento");
const categoria_1 = require("../entities/categoria");
const servicio_1 = require("../entities/servicio");
exports.default = (0, mysql_1.defineConfig)({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'planit',
    entities: [
        usuario_1.User,
        evento_1.Evento,
        categoria_1.Categoria,
        servicio_1.Servicio
    ],
    metadataProvider: legacy_1.ReflectMetadataProvider,
    debug: true,
});

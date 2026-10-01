"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
const postgresql_1 = require("@mikro-orm/postgresql");
const legacy_1 = require("@mikro-orm/decorators/legacy");
// Importo las entidades para que el orm las mapee a la bd
const usuario_1 = require("../entities/usuario");
const evento_1 = require("../entities/evento");
const categoria_1 = require("../entities/categoria");
const servicio_1 = require("../entities/servicio");
const evento_categoria_1 = require("../entities/evento-categoria");
const tablero_1 = require("../entities/tablero");
const tablero_servicio_1 = require("../entities/tablero-servicio");
// config  MikroORM para la conectar la bd uso var del .env
exports.default = (0, postgresql_1.defineConfig)({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'postgres',
    // Supabase exige TLS; en local se desactiva con DB_SSL=false.
    driverOptions: {
        connection: {
            ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: true }
        }
    },
    entities: [
        usuario_1.User,
        evento_1.Evento,
        categoria_1.Categoria,
        servicio_1.Servicio,
        evento_categoria_1.EventoCategoria,
        tablero_1.Tablero,
        tablero_servicio_1.TableroServicio
    ],
    metadataProvider: legacy_1.ReflectMetadataProvider,
    debug: true,
});

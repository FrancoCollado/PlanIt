"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const mysql_1 = require("@mikro-orm/mysql");
const mikro_orm_config_1 = __importDefault(require("./config/mikro-orm.config"));
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth.routes"));
const evento_routes_1 = __importDefault(require("./modules/events/routes/evento.routes"));
const usuario_routes_1 = __importDefault(require("./modules/users/routes/usuario.routes"));
const stats_routes_1 = __importDefault(require("./modules/stats/routes/stats.routes"));
const categoria_routes_1 = __importDefault(require("./modules/categories/routes/categoria.routes"));
const servicio_routes_1 = __importDefault(require("./modules/services/routes/servicio.routes"));
const tablero_routes_1 = __importDefault(require("./modules/boards/tablero.routes"));
const orm_1 = require("./config/orm");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
if (!process.env.JWT_SECRET) {
    if (process.env.NODE_ENV === 'production')
        throw new Error('JWT_SECRET es obligatorio en producción');
    process.env.JWT_SECRET = (0, crypto_1.randomBytes)(32).toString('hex');
    console.warn('JWT_SECRET temporal: las sesiones expirarán al reiniciar la API');
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/eventos', evento_routes_1.default);
app.use('/api/usuarios', usuario_routes_1.default);
app.use('/api/stats', stats_routes_1.default);
app.use('/api/categorias', categoria_routes_1.default);
app.use('/api/servicios', servicio_routes_1.default);
app.use('/api/tableros', tablero_routes_1.default);
// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API de planIt funcionando'
    });
});
async function iniciarServidor() {
    try {
        const orm = await mysql_1.MikroORM.init(mikro_orm_config_1.default);
        await orm.connect();
        (0, orm_1.setOrm)(orm);
        console.log('Base de datos conectada con MikroORM');
        app.listen(PORT, () => {
            console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:');
        console.error(error);
    }
}
iniciarServidor();

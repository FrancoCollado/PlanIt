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
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth.routes"));
const evento_routes_1 = __importDefault(require("./modules/events/routes/evento.routes"));
const usuario_routes_1 = __importDefault(require("./modules/users/routes/usuario.routes"));
const stats_routes_1 = __importDefault(require("./modules/stats/routes/stats.routes"));
const categoria_routes_1 = __importDefault(require("./modules/categories/routes/categoria.routes"));
const servicio_routes_1 = __importDefault(require("./modules/services/routes/servicio.routes"));
const tablero_routes_1 = __importDefault(require("./modules/boards/tablero.routes"));
const api_error_1 = require("./shared/api-error");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
if (!process.env.JWT_SECRET) {
    if (process.env.NODE_ENV === 'production')
        throw new Error('JWT_SECRET es obligatorio en producción');
    process.env.JWT_SECRET = (0, crypto_1.randomBytes)(32).toString('hex');
    console.warn('JWT_SECRET temporal: las sesiones expirarán al reiniciar la API');
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// En Vercel el frontend se sirve bajo el mismo dominio, así que CORS sólo se
// habilita si se declaran orígenes externos explícitos.
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean);
if (corsOrigins?.length) {
    app.use((0, cors_1.default)({ origin: corsOrigins }));
}
app.use(express_1.default.json());
// Diagnóstico: no toca la base de datos, así que responde aunque la conexión falle.
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'API de planIt funcionando'
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/eventos', evento_routes_1.default);
app.use('/api/usuarios', usuario_routes_1.default);
app.use('/api/stats', stats_routes_1.default);
app.use('/api/categorias', categoria_routes_1.default);
app.use('/api/servicios', servicio_routes_1.default);
app.use('/api/tableros', tablero_routes_1.default);
app.use('/api', (_req, res) => {
    (0, api_error_1.respondWithError)(res, 404, 'NOT_FOUND', 'Ruta de API no encontrada');
});
app.use(api_error_1.apiErrorHandler);
// Vercel ejecuta este proceso y rutea las peticiones al puerto que escucha,
// igual que en local. La conexión a la base se hace por request con ensureOrm.
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
exports.default = app;

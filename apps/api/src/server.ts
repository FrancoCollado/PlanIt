import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from './config/mikro-orm.config';

import authRoutes from './modules/auth/routes/auth.routes';
import eventoRoutes from './modules/events/routes/evento.routes';
import usuarioRoutes from './modules/users/routes/usuario.routes';
import statsRoutes from './modules/stats/routes/stats.routes';
import categoriaRoutes from './modules/categories/routes/categoria.routes';
import servicioRoutes from './modules/services/routes/servicio.routes';
import tableroRoutes from './modules/boards/tablero.routes';

import { setOrm } from './config/orm';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET es obligatorio en producción');
  process.env.JWT_SECRET = randomBytes(32).toString('hex');
  console.warn('JWT_SECRET temporal: las sesiones expirarán al reiniciar la API');
}

const app = express();
const PORT = process.env.PORT || 4000;

// En Vercel el frontend se sirve bajo el mismo dominio, así que CORS sólo se
// habilita si se declaran orígenes externos explícitos.
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean);
if (corsOrigins?.length) {
  app.use(cors({ origin: corsOrigins }));
}

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/tableros', tableroRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API de planIt funcionando'
  });
});

async function iniciarServidor() {
  try {

    const orm = await MikroORM.init(mikroOrmConfig);

    await orm.connect();
    setOrm(orm);

    console.log('Base de datos conectada con MikroORM');

    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });

  } catch (error) {

    console.error('Error al iniciar el servidor:');
    console.error(error);

  }
}

iniciarServidor();
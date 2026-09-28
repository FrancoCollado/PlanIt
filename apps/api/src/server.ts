import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { MikroORM } from '@mikro-orm/mysql';
import mikroOrmConfig from './config/mikro-orm.config';

import authRoutes from './modules/auth/routes/auth.routes';

import { setOrm } from './config/orm';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

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
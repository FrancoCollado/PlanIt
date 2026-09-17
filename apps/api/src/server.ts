import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { testConnection } from './config/database';
import authRoutes from './modules/auth/routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API de planIt funcionando' });
});

// Ruta de prueba de conexión a la base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS fecha_actual');
    res.json({ message: 'Consulta exitosa', data: rows });
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

testConnection();

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
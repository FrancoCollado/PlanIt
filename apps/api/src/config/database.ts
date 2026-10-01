import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); //carga el env 

// config de la conexión a la base de datos MySQL
const pool = mysql.createPool({ //creo un pool (conjunto de conexiones reutilizables)
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true, 
  connectionLimit: 10,
  queueLimit: 0
});


//pruebo conexión a la base de datos
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection(); //Como puede tardaren obtener la conexión, usé await
    console.log('✅ Conexión exitosa a MySQL');
    connection.release(); //Una vez obtengo la conexión, la libero para que pueda ser reutilizada por otras solicitudes.
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
  }
};

export default pool;

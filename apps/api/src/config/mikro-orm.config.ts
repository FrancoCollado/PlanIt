import path from 'path';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(import.meta.dirname, '../../../../.env') });

import { defineConfig } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

// Importo las entidades para que el orm las mapee a la bd
import { User } from '../entities/usuario.js';
import { Evento } from '../entities/evento.js';
import { Categoria } from '../entities/categoria.js';
import { Servicio } from '../entities/servicio.js';
import { EventoCategoria } from '../entities/evento-categoria.js';
import { Tablero } from '../entities/tablero.js';
import { TableroServicio } from '../entities/tablero-servicio.js';

// config  MikroORM para la conectar la bd uso var del .env
// DATABASE_URL (connection string de Supabase) tiene prioridad; si no está, se
// arma la conexión con las variables sueltas.
const clientUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Supabase firma con su propia CA, así que hay que aportarla en DB_CA_CERT.
// DB_SSL=no-verify cifra pero no valida el certificado: sólo para depurar,
// porque habilita ataques de intermediario.
const resolveSsl = () => {
  if (process.env.DB_SSL === 'false') return false;

  if (process.env.DB_CA_CERT) {
    return { ca: process.env.DB_CA_CERT, rejectUnauthorized: true };
  }

  if (process.env.DB_SSL === 'no-verify') {
    console.warn('DB_SSL=no-verify: el certificado del servidor no se valida');
    return { rejectUnauthorized: false };
  }

  return { rejectUnauthorized: true };
};

export default defineConfig({

  ...(clientUrl
    ? { clientUrl }
    : {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        dbName: process.env.DB_NAME || 'postgres'
      }),

  // driverOptions se pasa tal cual a pg: una clave "connection" la tomaría como
  // objeto Connection ya construido.
  driverOptions: {
    ssl: resolveSsl()
  },

  // El esquema se aplica con los scripts de migrations, no al conectar.
  ensureDatabase: false,

  entities: [  
    User,
    Evento,
    Categoria,
    Servicio,
    EventoCategoria,
    Tablero,
    TableroServicio
  ],

  metadataProvider: ReflectMetadataProvider,

  // El modo debug imprime cada query con sus parámetros: nunca en producción.
  debug: process.env.NODE_ENV !== 'production',

});
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
  // objeto Connection ya construido. Supabase exige TLS; DB_SSL=false lo apaga.
  driverOptions: {
    ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: true }
  },


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
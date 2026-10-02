import path from 'path';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

import { defineConfig } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

// Importo las entidades para que el orm las mapee a la bd
import { User } from '../entities/usuario';
import { Evento } from '../entities/evento';
import { Categoria } from '../entities/categoria';
import { Servicio } from '../entities/servicio';
import { EventoCategoria } from '../entities/evento-categoria';
import { Tablero } from '../entities/tablero';
import { TableroServicio } from '../entities/tablero-servicio';

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

  // Supabase exige TLS; en local se desactiva con DB_SSL=false.
  driverOptions: {
    connection: {
      ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: true }
    }
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
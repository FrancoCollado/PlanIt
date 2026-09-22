import 'reflect-metadata';
import 'dotenv/config';

import { defineConfig } from '@mikro-orm/mysql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

import { User } from '../entities/usuario';
import { Evento } from '../entities/evento';
import { Categoria } from '../entities/categoria';
import { Servicio } from '../entities/servicio';

export default defineConfig({

  host: process.env.DB_HOST || '127.0.0.1',

  port: Number(process.env.DB_PORT) || 3306,

  user: process.env.DB_USER || 'root',

  password: process.env.DB_PASSWORD || '',

  dbName: process.env.DB_NAME || 'planit',

  entities: [
    User,
    Evento,
    Categoria,
    Servicio
  ],

  metadataProvider: ReflectMetadataProvider,

  debug: true,

});
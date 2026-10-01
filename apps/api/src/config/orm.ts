import type { MikroORM } from '@mikro-orm/postgresql';

let orm: MikroORM;// Variable donde guardo la instancia de MikroORM

export function setOrm(instance: MikroORM) {
  orm = instance; // Asigno la instancia de MikroORM a la variable global
}

export function getOrm(): MikroORM {
  return orm;
}


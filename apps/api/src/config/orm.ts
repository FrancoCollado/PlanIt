import type { MikroORM } from '@mikro-orm/mysql';

let orm: MikroORM;

export function setOrm(instance: MikroORM) {
  orm = instance;
}

export function getOrm(): MikroORM {
  return orm;
}
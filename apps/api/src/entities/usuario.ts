import {
  Entity,
  PrimaryKey,
  Property,
  Enum
} from '@mikro-orm/decorators/legacy';
import { BigIntType } from '@mikro-orm/core';

@Entity({ tableName: 'usuarios' })
export class User {

  @PrimaryKey({ type: 'number' })
  id!: number; //va asi por que id es non-nullable y no tiene valor por defecto, uso ! para indicar que siempre tendrá un valor.

  @Property({ type: 'string', length: 100 })
  nombre!: string;

  @Property({ type: 'string', length: 100, unique: true }) //aca por ser email hago que sea unique
  email!: string;

  // No se muestra en las respuestas de la API
  @Property({
    type: 'string',
    fieldName: 'contraseña',
    length: 255,
    hidden: true
  })
  password!: string;

  @Enum({//
    items: ['cliente', 'administrador', 'empresa']
  })
  rol: 'cliente' | 'administrador' | 'empresa' = 'cliente';

  @Property({ type: 'string', length: 100, nullable: true })
  zona?: string;

  // BigIntType convierte el CUIT a número (si no, llega como string)
  @Property({ type: new BigIntType('number'), nullable: true })
  cuit?: number;

  @Property({ type: new BigIntType('number'), nullable: true })
  telefono?: number;

  // Permite suspender una cuenta sin borrarla, lo usamos para empresas
  @Property({ type: 'boolean', default: true })
  activo: boolean = true;

  @Property({
    type: 'Date',
    fieldName: 'creado_en',
    nullable: true
  })
  creadoEn?: Date;
}
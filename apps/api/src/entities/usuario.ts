import {
  Entity,
  PrimaryKey,
  Property,
  Enum
} from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'usuarios' })
export class User {

  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string', length: 100 })
  nombre!: string;

  @Property({ type: 'string', length: 100, unique: true })
  email!: string;

  @Property({
    type: 'string',
    fieldName: 'contraseña',
    length: 255
  })
  password!: string;

  @Enum({
    items: ['cliente', 'administrador', 'empresa']
  })
  rol: 'cliente' | 'administrador' | 'empresa' = 'cliente';

  @Property({
    type: 'Date',
    fieldName: 'creado_en',
    nullable: true
  })
  creadoEn?: Date;
}
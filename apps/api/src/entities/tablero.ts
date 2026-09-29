import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne
} from '@mikro-orm/decorators/legacy';

import { User } from './usuario';
import { Evento } from './evento';

@Entity({ tableName: 'tableros' })
export class Tablero {

  @PrimaryKey({ type: 'number' })
  id!: number;

  @ManyToOne(() => User, {
    fieldName: 'cliente_id',
    deleteRule: 'cascade'
  })
  cliente!: User;

  @ManyToOne(() => Evento, {
    fieldName: 'evento_id',
    nullable: true,
    deleteRule: 'set null'
  })
  evento?: Evento;

  @Property({ type: 'string', length: 100 })
  nombre!: string;

  @Property({ type: 'string', columnType: 'text', nullable: true })
  descripcion?: string;

  @Property({
    type: 'Date',
    fieldName: 'fecha_creacion'
  })
  fechaCreacion!: Date;
}

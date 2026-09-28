import {
  Entity,
  ManyToOne
} from '@mikro-orm/decorators/legacy';

import { Evento } from './evento';
import { Categoria } from './categoria';

@Entity({ tableName: 'evento_categoria' })
export class EventoCategoria {

  // Clave primaria compuesta: evento_id + categoria_id, ambas también son FK
  @ManyToOne(() => Evento, {
    primary: true,
    fieldName: 'evento_id',
    deleteRule: 'cascade'
  })
  evento!: Evento;

  @ManyToOne(() => Categoria, {
    primary: true,
    fieldName: 'categoria_id',
    deleteRule: 'cascade'
  })
  categoria!: Categoria;
}

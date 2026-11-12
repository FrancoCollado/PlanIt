import type { Evento } from '../../../eventos/services/eventoService';

interface ListaEventosProps {
  eventos: Evento[];
  onEditar: (evento: Evento) => void;
  onBorrar: (evento: Evento) => void;
}

export default function ListaEventos({ eventos, onEditar, onBorrar }: ListaEventosProps) {
  if (eventos.length === 0) {
    return <p className="texto-ayuda">Todavia no hay eventos.</p>;
  }

  return (
    <ul className="lista">
      {eventos.map((evento) => (
        <li key={evento.id} className="item-lista">
          <span>
            <b>{evento.nombre}</b> ({evento.draft ? 'borrador' : 'publicado'})
          </span>
          <span className="botones-item">
            <button onClick={() => onEditar(evento)}>Editar</button>
            <button onClick={() => onBorrar(evento)}>Borrar</button>
          </span>
        </li>
      ))}
    </ul>
  );
}

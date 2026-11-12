import type { Categoria } from '../../../eventos/services/categoriaService';

interface ListaCategoriasProps {
  hayEventos: boolean;
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onBorrar: (categoria: Categoria) => void;
}

export default function ListaCategorias({ hayEventos, categorias, onEditar, onBorrar }: ListaCategoriasProps) {
  return (
    <>
      {!hayEventos && <p className="texto-ayuda">Primero crea un evento.</p>}
      {hayEventos && categorias.length === 0 && <p className="texto-ayuda">Todavia no hay categorias.</p>}

      <ul className="lista">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="item-lista">
            <span>
              <b>{categoria.nombre}</b> - evento: {categoria.evento.nombre}
            </span>
            <span className="botones-item">
              <button onClick={() => onEditar(categoria)}>Editar</button>
              <button onClick={() => onBorrar(categoria)}>Borrar</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

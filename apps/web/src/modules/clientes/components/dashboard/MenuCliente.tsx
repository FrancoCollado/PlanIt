export type SeccionCliente = 'buscar' | 'eventos' | 'categorias' | 'tableros';

interface MenuClienteProps {
  onElegir: (seccion: SeccionCliente) => void;
}

export default function MenuCliente({ onElegir }: MenuClienteProps) {
  return (
    <div className="menu-cliente">
      <button className="boton-menu-cliente" onClick={() => onElegir('buscar')}>Buscar servicio</button>
      <button className="boton-menu-cliente" onClick={() => onElegir('eventos')}>Eventos</button>
      <button className="boton-menu-cliente" onClick={() => onElegir('categorias')}>Categorias</button>
      <button className="boton-menu-cliente" onClick={() => onElegir('tableros')}>Mis tableros</button>
    </div>
  );
}

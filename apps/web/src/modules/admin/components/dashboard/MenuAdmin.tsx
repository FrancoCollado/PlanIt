interface MenuAdminProps {
  onEventos: () => void;
  onCategorias: () => void;
  onCuentas: () => void;
  onServicios: () => void;
}

export default function MenuAdmin({ onEventos, onCategorias, onCuentas, onServicios }: MenuAdminProps) {
  return (
    <div className="menu">
      <button className="boton-menu" onClick={onEventos}>Eventos</button>
      <button className="boton-menu" onClick={onCategorias}>Categorias</button>
      <button className="boton-menu" onClick={onCuentas}>Cuentas</button>
      <button className="boton-menu" onClick={onServicios}>Servicios en revision</button>
    </div>
  );
}

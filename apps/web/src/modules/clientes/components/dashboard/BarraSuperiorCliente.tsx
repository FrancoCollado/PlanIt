interface BarraSuperiorClienteProps {
  onLogout?: () => void;
}

export default function BarraSuperiorCliente({ onLogout }: BarraSuperiorClienteProps) {
  return (
    <div className="barra-superior-cliente">
      <h1 className="titulo-pagina-cliente">PlanIt - Cliente</h1>
      <button className="boton-salir-cliente" onClick={() => onLogout?.()}>Cerrar sesion</button>
    </div>
  );
}

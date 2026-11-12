interface BarraSuperiorEmpresaProps {
  onLogout?: () => void;
}

export default function BarraSuperiorEmpresa({ onLogout }: BarraSuperiorEmpresaProps) {
  return (
    <div className="barra-superior-empresa">
      <h1 className="titulo-pagina-empresa">PlanIt - Empresa</h1>
      <button className="boton-salir-empresa" onClick={() => onLogout?.()}>Cerrar sesion</button>
    </div>
  );
}

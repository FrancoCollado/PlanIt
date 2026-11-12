interface BarraSuperiorProps {
  onLogout?: () => void;
}

export default function BarraSuperior({ onLogout }: BarraSuperiorProps) {
  return (
    <div className="barra-superior">
      <h1 className="titulo-pagina">PlanIt - Administrador</h1>
      <button className="boton-salir" onClick={() => onLogout?.()}>Cerrar sesion</button>
    </div>
  );
}

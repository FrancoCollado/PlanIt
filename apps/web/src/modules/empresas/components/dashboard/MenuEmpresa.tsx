interface MenuEmpresaProps {
  onServicios: () => void;
}

export default function MenuEmpresa({ onServicios }: MenuEmpresaProps) {
  return (
    <div className="menu-empresa">
      <button className="boton-menu-empresa" onClick={onServicios}>Servicios</button>
    </div>
  );
}

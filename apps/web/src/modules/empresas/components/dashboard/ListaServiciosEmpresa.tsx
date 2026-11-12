import type { Servicio } from '../../services/servicioService';
import { textoEstadoServicio } from '../../hooks/useEmpresaDashboard';

interface ListaServiciosEmpresaProps {
  servicios: Servicio[];
  hayCategorias: boolean;
  onEditar: (servicio: Servicio) => void;
  onBorrar: (servicio: Servicio) => void;
}

export default function ListaServiciosEmpresa({
  servicios,
  hayCategorias,
  onEditar,
  onBorrar
}: ListaServiciosEmpresaProps) {
  return (
    <>
      {!hayCategorias && (
        <p className="texto-ayuda-empresa">Todavia no hay categorias, pedile al administrador que cree alguna.</p>
      )}
      {hayCategorias && servicios.length === 0 && (
        <p className="texto-ayuda-empresa">Todavia no cargaste ningun servicio.</p>
      )}

      <ul className="lista-empresa lista-servicios-empresa">
        {servicios.map((servicio) => (
          <li key={servicio.id} className="item-lista-empresa card-servicio-empresa">
            <span className="detalle-item-empresa">
              {servicio.imagen ? (
                <img src={servicio.imagen} alt="" className="imagen-servicio-empresa" />
              ) : null}
              <span>
                <b>{servicio.nombre}</b> - categoria: {servicio.categoria.nombre} ({textoEstadoServicio(servicio.estado)})
              </span>
            </span>
            <span className="botones-item-empresa">
              <button onClick={() => onEditar(servicio)}>Editar</button>
              <button onClick={() => onBorrar(servicio)}>Borrar</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

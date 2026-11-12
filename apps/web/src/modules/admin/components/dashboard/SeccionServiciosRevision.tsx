import type { ServicioRevision } from '../../services/servicioAdminService';

interface SeccionServiciosRevisionProps {
  servicios: ServicioRevision[];
  onAprobar: (servicio: ServicioRevision) => void;
  onDenegar: (servicio: ServicioRevision) => void;
}

export default function SeccionServiciosRevision({ servicios, onAprobar, onDenegar }: SeccionServiciosRevisionProps) {
  return (
    <div className="caja">
      <h2 className="subtitulo">Servicios esperando aprobacion</h2>

      {servicios.length === 0 && (
        <p className="texto-ayuda">No hay servicios en revision por el momento.</p>
      )}

      <ul className="lista lista-servicios">
        {servicios.map((servicio) => (
          <li key={servicio.id} className="item-lista card-servicio">
            <span className="detalle-item">
              {servicio.imagen ? (
                <img src={servicio.imagen} alt="" className="imagen-servicio" />
              ) : null}
              <span>
                <b>{servicio.nombre}</b> - categoria: {servicio.categoria.nombre} - empresa: {servicio.empresa.nombre}
              </span>
            </span>
            <span className="botones-item">
              <button onClick={() => onAprobar(servicio)}>Aprobar</button>
              <button onClick={() => onDenegar(servicio)}>Denegar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

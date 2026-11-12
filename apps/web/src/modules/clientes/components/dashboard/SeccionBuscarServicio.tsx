import type { Servicio } from '../../services/servicioService';
import ItemServicio from '../ItemServicio';
import FormularioBusqueda from './FormularioBusqueda';

interface SeccionBuscarServicioProps {
  token: string;
  texto: string;
  zona: string;
  empresa: string;
  servicios: Servicio[];
  busquedaHecha: boolean;
  onTexto: (valor: string) => void;
  onZona: (valor: string) => void;
  onEmpresa: (valor: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SeccionBuscarServicio({
  token,
  texto,
  zona,
  empresa,
  servicios,
  busquedaHecha,
  onTexto,
  onZona,
  onEmpresa,
  onSubmit
}: SeccionBuscarServicioProps) {
  return (
    <div className="caja-cliente">
      <h2 className="subtitulo-cliente">Buscar un servicio</h2>

      <FormularioBusqueda
        texto={texto}
        zona={zona}
        empresa={empresa}
        onTexto={onTexto}
        onZona={onZona}
        onEmpresa={onEmpresa}
        onSubmit={onSubmit}
      />

      {busquedaHecha && servicios.length === 0 && (
        <p className="texto-ayuda-cliente">No se encontraron servicios.</p>
      )}

      <ul className="lista-cliente lista-servicios-cliente">
        {servicios.map((servicio) => (
          <ItemServicio key={servicio.id} servicio={servicio} token={token} />
        ))}
      </ul>
    </div>
  );
}

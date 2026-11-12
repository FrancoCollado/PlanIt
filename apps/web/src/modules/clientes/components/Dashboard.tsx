import { useState } from 'react';
import './Dashboard.scss';
import BuscarPorEvento from './BuscarPorEvento';
import BuscarPorCategoria from './BuscarPorCategoria';
import MisTableros from './MisTableros';
import BarraSuperiorCliente from './dashboard/BarraSuperiorCliente';
import MenuCliente from './dashboard/MenuCliente';
import type { SeccionCliente } from './dashboard/MenuCliente';
import SeccionBuscarServicio from './dashboard/SeccionBuscarServicio';
import { useBusquedaServicios } from '../hooks/useBusquedaServicios';

interface ClienteDashboardProps {
  nombreUsuario: string;
  token: string;
  onLogout?: () => void;
}

export default function DashboardCliente({ nombreUsuario, token, onLogout }: ClienteDashboardProps) {
  const [seccion, setSeccion] = useState<SeccionCliente | null>(null);
  const busqueda = useBusquedaServicios();

  function mostrarSeccion(nueva: SeccionCliente) {
    busqueda.limpiarMensaje();
    setSeccion(nueva);
  }

  return (
    <div className="pagina-cliente">
      <BarraSuperiorCliente onLogout={onLogout} />

      <div className="contenido-cliente">
        <h2 className="bienvenida-cliente">Bienvenido a planit,  {nombreUsuario}</h2>

        <MenuCliente onElegir={mostrarSeccion} />

        {busqueda.mensaje !== '' && <p className="mensaje-error-cliente">{busqueda.mensaje}</p>}
        {seccion === null && <p className="texto-ayuda-cliente">Elegi una opcion del menu para empezar.</p>}

        {seccion === 'buscar' && (
          <SeccionBuscarServicio
            token={token}
            texto={busqueda.textoBusqueda}
            zona={busqueda.zonaBusqueda}
            empresa={busqueda.empresaBusqueda}
            servicios={busqueda.servicios}
            busquedaHecha={busqueda.busquedaHecha}
            onTexto={busqueda.setTextoBusqueda}
            onZona={busqueda.setZonaBusqueda}
            onEmpresa={busqueda.setEmpresaBusqueda}
            onSubmit={busqueda.buscarServicios}
          />
        )}
        {seccion === 'eventos' && <BuscarPorEvento token={token} onVolver={() => setSeccion(null)} />}
        {seccion === 'categorias' && <BuscarPorCategoria token={token} onVolver={() => setSeccion(null)} />}
        {seccion === 'tableros' && <MisTableros token={token} onVolver={() => setSeccion(null)} />}
      </div>
    </div>
  );
}

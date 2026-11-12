import { useState } from 'react';
import { buscarServiciosRequest } from '../services/servicioService';
import type { Servicio } from '../services/servicioService';

export function useBusquedaServicios() {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [zonaBusqueda, setZonaBusqueda] = useState('');
  const [empresaBusqueda, setEmpresaBusqueda] = useState('');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [busquedaHecha, setBusquedaHecha] = useState(false);
  const [mensaje, setMensaje] = useState('');

  function limpiarMensaje() {
    setMensaje('');
  }

  async function buscarServicios(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    if (textoBusqueda.trim() === '' && zonaBusqueda.trim() === '' && empresaBusqueda.trim() === '') {
      return;
    }

    setBusquedaHecha(true);

    try {
      const datos = await buscarServiciosRequest(textoBusqueda.trim(), zonaBusqueda, empresaBusqueda);
      setServicios(datos);
    } catch {
      setServicios([]);
      setMensaje('No se pudieron buscar los servicios');
    }
  }

  return {
    textoBusqueda,
    setTextoBusqueda,
    zonaBusqueda,
    setZonaBusqueda,
    empresaBusqueda,
    setEmpresaBusqueda,
    servicios,
    busquedaHecha,
    mensaje,
    limpiarMensaje,
    buscarServicios
  };
}

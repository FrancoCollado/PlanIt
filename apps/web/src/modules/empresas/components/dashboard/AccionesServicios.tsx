interface AccionesServiciosProps {
  puedeAgregar: boolean;
  mostrarPasarAPro: boolean;
  creandoPagoPro: boolean;
  onAgregar: () => void;
  onPasarAPro: () => void;
}

export default function AccionesServicios({
  puedeAgregar,
  mostrarPasarAPro,
  creandoPagoPro,
  onAgregar,
  onPasarAPro
}: AccionesServiciosProps) {
  return (
    <div className="acciones-servicios-empresa">
      <button className="boton-nuevo-empresa" onClick={onAgregar} disabled={!puedeAgregar}>
        Agregar servicio
      </button>

      {mostrarPasarAPro && (
        <button className="boton-nuevo-empresa" onClick={onPasarAPro} disabled={creandoPagoPro}>
          {creandoPagoPro ? 'Preparando el pago...' : 'Pasar a Pro'}
        </button>
      )}
    </div>
  );
}

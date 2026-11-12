import type { MensajePago } from '../../hooks/useEmpresaDashboard';

interface AlertaPagoProps {
  mensajePago: MensajePago;
}

export default function AlertaPago({ mensajePago }: AlertaPagoProps) {
  return (
    <div
      role={mensajePago.tipo === 'error' ? 'alert' : 'status'}
      className={
        mensajePago.tipo === 'exito'
          ? 'alerta-pago-empresa alerta-pago-exito'
          : 'alerta-pago-empresa alerta-pago-error'
      }
    >
      <p className="alerta-pago-titulo">
        {mensajePago.tipo === 'exito' ? 'Pago registrado' : 'Pago no registrado'}
      </p>
      <p className="alerta-pago-texto">{mensajePago.mensaje}</p>
    </div>
  );
}

import type { Usuario } from '../../services/usuarioService';

interface SeccionCuentasProps {
  cuentas: Usuario[];
  onCambiarEstado: (cuenta: Usuario) => void;
}

export default function SeccionCuentas({ cuentas, onCambiarEstado }: SeccionCuentasProps) {
  return (
    <div className="caja">
      <h2 className="subtitulo">Empresas y clientes</h2>

      {cuentas.length === 0 && <p className="texto-ayuda">No hay cuentas registradas.</p>}

      <ul className="lista">
        {cuentas.map((cuenta) => (
          <li key={cuenta.id} className="item-lista">
            <span>
              <b>{cuenta.nombre}</b> - {cuenta.rol === 'empresa' ? 'Empresa' : 'Cliente'} - {cuenta.email} ({cuenta.activo ? 'activa' : 'suspendida'})
            </span>
            <span className="botones-item">
              <button onClick={() => onCambiarEstado(cuenta)}>
                {cuenta.activo ? 'Suspender' : 'Activar'}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

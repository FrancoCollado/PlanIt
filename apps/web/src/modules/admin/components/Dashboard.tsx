import './Dashboard.scss';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import BarraSuperior from './dashboard/BarraSuperior';
import MenuAdmin from './dashboard/MenuAdmin';
import SeccionEventos from './dashboard/SeccionEventos';
import SeccionCategorias from './dashboard/SeccionCategorias';
import SeccionCuentas from './dashboard/SeccionCuentas';
import SeccionServiciosRevision from './dashboard/SeccionServiciosRevision';

interface AdminDashboardProps {
  token: string;
  onLogout?: () => void;
}

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const admin = useAdminDashboard(token);

  return (
    <div className="pagina-admin">
      <BarraSuperior onLogout={onLogout} />

      <div className="contenido">
        <h2 className="bienvenida">Bienvenido al panel de administracion</h2>

        <MenuAdmin
          onEventos={admin.mostrarEventos}
          onCategorias={admin.mostrarCategorias}
          onCuentas={admin.mostrarCuentas}
          onServicios={admin.mostrarServicios}
        />

        {admin.mensaje !== '' && <p className="mensaje-error">{admin.mensaje}</p>}
        {admin.seccion === null && <p className="texto-ayuda">Elegi una opcion del menu para empezar.</p>}

        {admin.seccion === 'eventos' && (
          <SeccionEventos
            eventos={admin.eventos}
            formVisible={admin.formEventoVisible}
            editando={admin.eventoEditando !== null}
            form={admin.formEvento}
            onChangeForm={admin.setFormEvento}
            onAbrirFormulario={admin.abrirFormularioEvento}
            onCerrarFormulario={() => admin.setFormEventoVisible(false)}
            onSubmit={admin.guardarEvento}
            onEditar={admin.empezarEdicionEvento}
            onBorrar={admin.borrarEvento}
          />
        )}

        {admin.seccion === 'categorias' && (
          <SeccionCategorias
            categorias={admin.categorias}
            eventos={admin.eventos}
            formVisible={admin.formCategoriaVisible}
            editando={admin.categoriaEditando !== null}
            form={admin.formCategoria}
            onChangeForm={admin.setFormCategoria}
            onAbrirFormulario={admin.abrirFormularioCategoria}
            onCerrarFormulario={() => admin.setFormCategoriaVisible(false)}
            onSubmit={admin.guardarCategoria}
            onEditar={admin.empezarEdicionCategoria}
            onBorrar={admin.borrarCategoria}
          />
        )}

        {admin.seccion === 'cuentas' && (
          <SeccionCuentas cuentas={admin.cuentas} onCambiarEstado={admin.cambiarEstadoCuenta} />
        )}

        {admin.seccion === 'servicios' && (
          <SeccionServiciosRevision
            servicios={admin.serviciosRevision}
            onAprobar={admin.aprobarServicio}
            onDenegar={admin.denegarServicio}
          />
        )}
      </div>
    </div>
  );
}

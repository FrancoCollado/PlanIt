import './Dashboard.scss';
import { useEmpresaDashboard } from '../hooks/useEmpresaDashboard';
import BarraSuperiorEmpresa from './dashboard/BarraSuperiorEmpresa';
import AlertaPago from './dashboard/AlertaPago';
import MenuEmpresa from './dashboard/MenuEmpresa';
import SeccionServicios from './dashboard/SeccionServicios';

interface DashboardProps {
  onLogout?: () => void;
  usuarioId?: number;
  token: string;
}

export default function Dashboard({ onLogout, usuarioId, token }: DashboardProps) {
  const empresa = useEmpresaDashboard(usuarioId, token);

  return (
    <div className="pagina-empresa">
      <BarraSuperiorEmpresa onLogout={onLogout} />

      <div className="contenido-empresa">
        <h2 className="bienvenida-empresa">Bienvenido a Planit, empresa</h2>

        {empresa.mensajePago && <AlertaPago mensajePago={empresa.mensajePago} />}

        <MenuEmpresa onServicios={empresa.mostrarServicios} />

        {empresa.mensaje !== '' && <p className="mensaje-error-empresa">{empresa.mensaje}</p>}
        {empresa.seccion === null && <p className="texto-ayuda-empresa">Elegi una opcion del menu para empezar.</p>}

        {empresa.seccion === 'servicios' && (
          <SeccionServicios
            plan={empresa.plan}
            servicios={empresa.servicios}
            categorias={empresa.categorias}
            formVisible={empresa.formServicioVisible}
            editando={empresa.servicioEditando !== null}
            form={empresa.formServicio}
            subiendoImagen={empresa.subiendoImagen}
            creandoPagoPro={empresa.creandoPagoPro}
            llegoAlLimite={empresa.llegoAlLimiteDelPlanGratis}
            onChangeForm={empresa.setFormServicio}
            onAbrirFormulario={empresa.abrirFormularioServicio}
            onCerrarFormulario={() => empresa.setFormServicioVisible(false)}
            onSeleccionarImagen={empresa.seleccionarImagen}
            onSubmit={empresa.guardarServicio}
            onPasarAPro={empresa.manejarPasarAPro}
            onEditar={empresa.empezarEdicionServicio}
            onBorrar={empresa.borrarServicio}
          />
        )}
      </div>
    </div>
  );
}

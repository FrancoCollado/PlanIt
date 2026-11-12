import type { Categoria } from '../../../eventos/services/categoriaService';
import type { Servicio } from '../../services/servicioService';
import type { FormServicio } from '../../hooks/useEmpresaDashboard';
import ResumenPlan from './ResumenPlan';
import AccionesServicios from './AccionesServicios';
import FormularioServicio from './FormularioServicio';
import ListaServiciosEmpresa from './ListaServiciosEmpresa';

interface SeccionServiciosProps {
  plan: 'gratis' | 'pro';
  servicios: Servicio[];
  categorias: Categoria[];
  formVisible: boolean;
  editando: boolean;
  form: FormServicio;
  subiendoImagen: boolean;
  creandoPagoPro: boolean;
  llegoAlLimite: boolean;
  onChangeForm: (form: FormServicio) => void;
  onAbrirFormulario: () => void;
  onCerrarFormulario: () => void;
  onSeleccionarImagen: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPasarAPro: () => void;
  onEditar: (servicio: Servicio) => void;
  onBorrar: (servicio: Servicio) => void;
}

export default function SeccionServicios({
  plan,
  servicios,
  categorias,
  formVisible,
  editando,
  form,
  subiendoImagen,
  creandoPagoPro,
  llegoAlLimite,
  onChangeForm,
  onAbrirFormulario,
  onCerrarFormulario,
  onSeleccionarImagen,
  onSubmit,
  onPasarAPro,
  onEditar,
  onBorrar
}: SeccionServiciosProps) {
  const puedeAgregar = categorias.length > 0 && !llegoAlLimite;

  return (
    <div className="caja-empresa">
      <h2 className="subtitulo-empresa">Lista de servicios</h2>

      <ResumenPlan plan={plan} cantidadServicios={servicios.length} />

      {!formVisible && (
        <AccionesServicios
          puedeAgregar={puedeAgregar}
          mostrarPasarAPro={llegoAlLimite}
          creandoPagoPro={creandoPagoPro}
          onAgregar={onAbrirFormulario}
          onPasarAPro={onPasarAPro}
        />
      )}

      {formVisible && (
        <FormularioServicio
          editando={editando}
          form={form}
          categorias={categorias}
          subiendoImagen={subiendoImagen}
          onChange={onChangeForm}
          onSeleccionarImagen={onSeleccionarImagen}
          onSubmit={onSubmit}
          onCancelar={onCerrarFormulario}
        />
      )}

      <ListaServiciosEmpresa
        servicios={servicios}
        hayCategorias={categorias.length > 0}
        onEditar={onEditar}
        onBorrar={onBorrar}
      />
    </div>
  );
}

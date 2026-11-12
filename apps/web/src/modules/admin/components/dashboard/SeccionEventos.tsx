import type { Evento } from '../../../eventos/services/eventoService';
import type { FormEvento } from '../../hooks/useAdminDashboard';
import FormularioEvento from './FormularioEvento';
import ListaEventos from './ListaEventos';

interface SeccionEventosProps {
  eventos: Evento[];
  formVisible: boolean;
  editando: boolean;
  form: FormEvento;
  onChangeForm: (form: FormEvento) => void;
  onAbrirFormulario: () => void;
  onCerrarFormulario: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onEditar: (evento: Evento) => void;
  onBorrar: (evento: Evento) => void;
}

export default function SeccionEventos({
  eventos,
  formVisible,
  editando,
  form,
  onChangeForm,
  onAbrirFormulario,
  onCerrarFormulario,
  onSubmit,
  onEditar,
  onBorrar
}: SeccionEventosProps) {
  return (
    <div className="caja">
      <h2 className="subtitulo">Lista de eventos</h2>

      {!formVisible && (
        <button className="boton-nuevo" onClick={onAbrirFormulario}>
          Agregar evento
        </button>
      )}

      {formVisible && (
        <FormularioEvento
          editando={editando}
          form={form}
          onChange={onChangeForm}
          onSubmit={onSubmit}
          onCancelar={onCerrarFormulario}
        />
      )}

      <ListaEventos eventos={eventos} onEditar={onEditar} onBorrar={onBorrar} />
    </div>
  );
}

import type { Evento } from '../../../eventos/services/eventoService';
import type { FormCategoria } from '../../hooks/useAdminDashboard';

interface FormularioCategoriaProps {
  editando: boolean;
  form: FormCategoria;
  eventos: Evento[];
  onChange: (form: FormCategoria) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelar: () => void;
}

export default function FormularioCategoria({
  editando,
  form,
  eventos,
  onChange,
  onSubmit,
  onCancelar
}: FormularioCategoriaProps) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h3>{editando ? 'Editar categoria' : 'Nueva categoria'}</h3>

      <label>Nombre</label>
      <input
        type="text"
        value={form.nombre}
        onChange={(e) => onChange({ ...form, nombre: e.target.value })}
        required
      />

      <label>Descripcion</label>
      <textarea
        value={form.descripcion}
        onChange={(e) => onChange({ ...form, descripcion: e.target.value })}
      />

      <label>Evento</label>
      <select
        value={form.eventoId}
        onChange={(e) => onChange({ ...form, eventoId: Number(e.target.value) })}
        required
      >
        <option value={0} disabled>Elegi un evento</option>
        {eventos.map((evento) => (
          <option key={evento.id} value={evento.id}>{evento.nombre}</option>
        ))}
      </select>

      <div className="botones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

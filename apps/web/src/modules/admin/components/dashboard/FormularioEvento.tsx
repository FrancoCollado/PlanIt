import type { FormEvento } from '../../hooks/useAdminDashboard';

interface FormularioEventoProps {
  editando: boolean;
  form: FormEvento;
  onChange: (form: FormEvento) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelar: () => void;
}

export default function FormularioEvento({ editando, form, onChange, onSubmit, onCancelar }: FormularioEventoProps) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h3>{editando ? 'Editar evento' : 'Nuevo evento'}</h3>

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

      <label>Imagen (URL)</label>
      <input
        type="text"
        value={form.imagen}
        onChange={(e) => onChange({ ...form, imagen: e.target.value })}
      />

      <label className="label-check">
        <input
          type="checkbox"
          checked={form.draft}
          onChange={(e) => onChange({ ...form, draft: e.target.checked })}
        />
        Guardar como borrador
      </label>

      <div className="botones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

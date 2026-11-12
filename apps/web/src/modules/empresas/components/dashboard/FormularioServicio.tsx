import type { Categoria } from '../../../eventos/services/categoriaService';
import type { FormServicio } from '../../hooks/useEmpresaDashboard';

interface FormularioServicioProps {
  editando: boolean;
  form: FormServicio;
  categorias: Categoria[];
  subiendoImagen: boolean;
  onChange: (form: FormServicio) => void;
  onSeleccionarImagen: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelar: () => void;
}

export default function FormularioServicio({
  editando,
  form,
  categorias,
  subiendoImagen,
  onChange,
  onSeleccionarImagen,
  onSubmit,
  onCancelar
}: FormularioServicioProps) {
  return (
    <form className="formulario-empresa" onSubmit={onSubmit}>
      <h3>{editando ? 'Editar servicio' : 'Nuevo servicio'}</h3>

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

      <label>Imagen</label>
      <input type="file" accept="image/*" onChange={onSeleccionarImagen} disabled={subiendoImagen} />

      {subiendoImagen && <p className="texto-ayuda-empresa">Subiendo imagen...</p>}

      {form.imagen !== '' && (
        <img src={form.imagen} alt="Imagen del servicio" className="imagen-previa-empresa" />
      )}

      <label>Categoria</label>
      <select
        value={form.categoriaId}
        onChange={(e) => onChange({ ...form, categoriaId: Number(e.target.value) })}
        required
      >
        <option value={0} disabled>Elegi una categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
      </select>

      <label className="label-check-empresa">
        <input
          type="checkbox"
          checked={form.estado === 'borrador'}
          onChange={(e) => onChange({ ...form, estado: e.target.checked ? 'borrador' : 'revision' })}
        />
        Guardar como borrador
      </label>

      {form.estado === 'revision' && (
        <p className="texto-ayuda-empresa">
          Al guardar, el servicio queda en revision hasta que un administrador lo apruebe.
        </p>
      )}

      <div className="botones-formulario-empresa">
        <button type="submit" disabled={subiendoImagen}>Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

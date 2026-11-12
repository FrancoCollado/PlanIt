import type { Categoria } from '../../../eventos/services/categoriaService';
import type { Evento } from '../../../eventos/services/eventoService';
import type { FormCategoria } from '../../hooks/useAdminDashboard';
import FormularioCategoria from './FormularioCategoria';
import ListaCategorias from './ListaCategorias';

interface SeccionCategoriasProps {
  categorias: Categoria[];
  eventos: Evento[];
  formVisible: boolean;
  editando: boolean;
  form: FormCategoria;
  onChangeForm: (form: FormCategoria) => void;
  onAbrirFormulario: () => void;
  onCerrarFormulario: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onEditar: (categoria: Categoria) => void;
  onBorrar: (categoria: Categoria) => void;
}

export default function SeccionCategorias({
  categorias,
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
}: SeccionCategoriasProps) {
  return (
    <div className="caja">
      <h2 className="subtitulo">Lista de categorias</h2>

      {!formVisible && (
        <button
          className="boton-nuevo"
          onClick={onAbrirFormulario}
          disabled={eventos.length === 0}
        >
          Agregar categoria
        </button>
      )}

      {formVisible && (
        <FormularioCategoria
          editando={editando}
          form={form}
          eventos={eventos}
          onChange={onChangeForm}
          onSubmit={onSubmit}
          onCancelar={onCerrarFormulario}
        />
      )}

      <ListaCategorias
        hayEventos={eventos.length > 0}
        categorias={categorias}
        onEditar={onEditar}
        onBorrar={onBorrar}
      />
    </div>
  );
}

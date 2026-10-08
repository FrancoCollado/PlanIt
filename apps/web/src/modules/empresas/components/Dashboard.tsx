import { useState } from 'react';
import './Dashboard.scss';
import {
  listServiciosRequest,
  createServicioRequest,
  updateServicioRequest,
  deleteServicioRequest,
  subirImagenServicioRequest
} from '../services/servicioService';
import type { Servicio } from '../services/servicioService';
import { listCategoriasRequest } from '../../eventos/services/categoriaService';
import type { Categoria } from '../../eventos/services/categoriaService';
import { formatearTitulo } from '../../../shared/formatters';

// Props que me manda App.tsx (el id de la empresa, el token y la funcion de salir)
interface DashboardProps {
  onLogout?: () => void;
  usuarioId?: number;
  token: string;
}

// Objeto vacio para resetear el formulario
const servicioVacio = { nombre: '', descripcion: '', imagen: '', categoriaId: 0, draft: true };

export default function Dashboard({ onLogout, usuarioId, token }: DashboardProps) {
  // Esta variable dice si se esta mostrando la lista de servicios
  const [seccion, setSeccion] = useState<'servicios' | null>(null);

  // --- SERVICIOS ---
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formServicioVisible, setFormServicioVisible] = useState(false);
  const [servicioEditando, setServicioEditando] = useState<Servicio | null>(null);
  const [formServicio, setFormServicio] = useState(servicioVacio);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  // Las categorias las crea el admin, yo solo las uso para el select
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Uso un solo mensaje de error para todo asi no me complico
  const [mensaje, setMensaje] = useState('');

  // Traigo los servicios de la empresa de la base de datos
  async function cargarServicios() {
    if (!usuarioId) return;

    try {
      const datos = await listServiciosRequest(usuarioId, token);
      setServicios(datos);
    } catch {
      setMensaje('No se pudieron cargar los servicios');
    }
  }

  async function cargarCategorias() {
    try {
      const datos = await listCategoriasRequest(token);
      setCategorias(datos);
    } catch {
      setCategorias([]);
    }
  }

  // Cuando toco el boton del menu muestro la seccion y traigo los datos
  function mostrarServicios() {
    setMensaje('');
    setSeccion('servicios');
    setFormServicioVisible(false);
    cargarServicios();
    cargarCategorias();
  }

  // Subo la imagen al servidor y me guardo la url que me devuelve
  async function seleccionarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo || !usuarioId) return;

    setSubiendoImagen(true);
    setMensaje('');

    try {
      const url = await subirImagenServicioRequest(usuarioId, archivo);
      setFormServicio({ ...formServicio, imagen: url });
    } catch {
      setMensaje('No se pudo subir la imagen');
    } finally {
      setSubiendoImagen(false);
      e.target.value = '';
    }
  }

  // Guarda un servicio nuevo o edita el que estoy tocando
  async function guardarServicio(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    if (!usuarioId) return;

    if (!formServicio.categoriaId) {
      setMensaje('Tenes que elegir una categoria');
      return;
    }

    const datos = { ...formServicio, nombre: formatearTitulo(formServicio.nombre) };

    try {
      if (servicioEditando) {
        await updateServicioRequest(servicioEditando.id, usuarioId, datos, token);
      } else {
        await createServicioRequest(usuarioId, datos, token);
      }
      await cargarServicios();
      setFormServicioVisible(false);
      setServicioEditando(null);
      setFormServicio(servicioVacio);
    } catch {
      setMensaje('No se pudo guardar el servicio');
    }
  }

  async function borrarServicio(servicio: Servicio) {
    if (!usuarioId) return;

    // Pregunto antes porque sino se borra de una
    if (!window.confirm('Seguro que queres borrar el servicio ' + servicio.nombre + '?')) return;

    try {
      await deleteServicioRequest(servicio.id, usuarioId, token);
      await cargarServicios();
    } catch {
      setMensaje('No se pudo borrar el servicio');
    }
  }

  return (
    <div className="pagina-empresa">
      {/* Barra de arriba con el nombre de la pagina y el boton de salir */}
      <div className="barra-superior-empresa">
        <h1 className="titulo-pagina-empresa">PlanIt - Empresa</h1>
        <button className="boton-salir-empresa" onClick={() => onLogout?.()}>Cerrar sesion</button>
      </div>

      <div className="contenido-empresa">
        <h2 className="bienvenida-empresa">Bienvenido a Planit, empresa</h2>

        {/* Menu (por ahora la empresa solo puede manejar sus servicios) */}
        <div className="menu-empresa">
          <button className="boton-menu-empresa" onClick={mostrarServicios}>Servicios</button>
        </div>

        {/* Si hubo algun error lo muestro aca */}
        {mensaje !== '' && <p className="mensaje-error-empresa">{mensaje}</p>}

        {/* Si todavia no toque el boton muestro un texto */}
        {seccion === null && <p className="texto-ayuda-empresa">Elegi una opcion del menu para empezar.</p>}

        {/* SECCION DE SERVICIOS */}
        {seccion === 'servicios' && (
          <div className="caja-empresa">
            <h2 className="subtitulo-empresa">Lista de servicios</h2>

            {!formServicioVisible && (
              <button
                className="boton-nuevo-empresa"
                onClick={() => {
                  setServicioEditando(null);
                  // Si hay categorias pongo la primera por defecto
                  setFormServicio({ ...servicioVacio, categoriaId: categorias[0]?.id ?? 0 });
                  setFormServicioVisible(true);
                }}
                disabled={categorias.length === 0}
              >
                Agregar servicio
              </button>
            )}

            {/* El formulario sirve para crear y para editar, cambia el titulo nomas */}
            {formServicioVisible && (
              <form className="formulario-empresa" onSubmit={guardarServicio}>
                <h3>{servicioEditando ? 'Editar servicio' : 'Nuevo servicio'}</h3>

                <label>Nombre</label>
                <input
                  type="text"
                  value={formServicio.nombre}
                  onChange={(e) => setFormServicio({ ...formServicio, nombre: e.target.value })}
                  required
                />

                <label>Descripcion</label>
                <textarea
                  value={formServicio.descripcion}
                  onChange={(e) => setFormServicio({ ...formServicio, descripcion: e.target.value })}
                />

                <label>Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={seleccionarImagen}
                  disabled={subiendoImagen}
                />

                {subiendoImagen && <p className="texto-ayuda-empresa">Subiendo imagen...</p>}

                {/* Muestro la imagen chiquita para ver si subio bien */}
                {formServicio.imagen !== '' && (
                  <img src={formServicio.imagen} alt="Imagen del servicio" className="imagen-previa-empresa" />
                )}

                <label>Categoria</label>
                <select
                  value={formServicio.categoriaId}
                  onChange={(e) => setFormServicio({ ...formServicio, categoriaId: Number(e.target.value) })}
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
                    checked={formServicio.draft}
                    onChange={(e) => setFormServicio({ ...formServicio, draft: e.target.checked })}
                  />
                  Guardar como borrador
                </label>

                <div className="botones-formulario-empresa">
                  <button type="submit" disabled={subiendoImagen}>Guardar</button>
                  <button type="button" onClick={() => setFormServicioVisible(false)}>Cancelar</button>
                </div>
              </form>
            )}

            {categorias.length === 0 && (
              <p className="texto-ayuda-empresa">Todavia no hay categorias, pedile al administrador que cree alguna.</p>
            )}
            {categorias.length > 0 && servicios.length === 0 && (
              <p className="texto-ayuda-empresa">Todavia no cargaste ningun servicio.</p>
            )}

            {/* Recorro el array de servicios con map para mostrarlos */}
            <ul className="lista-empresa">
              {servicios.map((servicio) => (
                <li key={servicio.id} className="item-lista-empresa">
                  <span>
                    <b>{servicio.nombre}</b> - categoria: {servicio.categoria.nombre} ({servicio.draft ? 'borrador' : 'publicado'})
                  </span>
                  <span className="botones-item-empresa">
                    <button
                      onClick={() => {
                        setServicioEditando(servicio);
                        setFormServicio({
                          nombre: servicio.nombre,
                          descripcion: servicio.descripcion ?? '',
                          imagen: servicio.imagen ?? '',
                          categoriaId: servicio.categoria.id,
                          draft: servicio.draft
                        });
                        setFormServicioVisible(true);
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => borrarServicio(servicio)}>Borrar</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

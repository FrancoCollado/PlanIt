import { useState } from 'react';
import {
  listEventosRequest,
  createEventoRequest,
  updateEventoRequest,
  deleteEventoRequest
} from '../../eventos/services/eventoService';
import type { Evento } from '../../eventos/services/eventoService';
import {
  listCategoriasRequest,
  createCategoriaRequest,
  updateCategoriaRequest,
  deleteCategoriaRequest
} from '../../eventos/services/categoriaService';
import type { Categoria } from '../../eventos/services/categoriaService';
import { listUsuariosRequest, setUsuarioActivoRequest } from '../services/usuarioService';
import type { Usuario } from '../services/usuarioService';
import {
  listServiciosRevisionRequest,
  aprobarServicioRequest,
  denegarServicioRequest
} from '../services/servicioAdminService';
import type { ServicioRevision } from '../services/servicioAdminService';
import { formatearTitulo } from '../../../shared/formatters';
import { mensajeDeError } from '../../../shared/api';

export type SeccionAdmin = 'eventos' | 'categorias' | 'cuentas' | 'servicios' | null;

export type FormEvento = {
  nombre: string;
  descripcion: string;
  imagen: string;
  draft: boolean;
};

export type FormCategoria = {
  nombre: string;
  descripcion: string;
  eventoId: number;
};

const eventoVacio: FormEvento = { nombre: '', descripcion: '', imagen: '', draft: true };
const categoriaVacia: FormCategoria = { nombre: '', descripcion: '', eventoId: 0 };

export function useAdminDashboard(token: string) {
  const [seccion, setSeccion] = useState<SeccionAdmin>(null);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [formEventoVisible, setFormEventoVisible] = useState(false);
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [formEvento, setFormEvento] = useState(eventoVacio);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formCategoriaVisible, setFormCategoriaVisible] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [formCategoria, setFormCategoria] = useState(categoriaVacia);

  const [cuentas, setCuentas] = useState<Usuario[]>([]);
  const [serviciosRevision, setServiciosRevision] = useState<ServicioRevision[]>([]);
  const [mensaje, setMensaje] = useState('');

  async function cargarEventos() {
    try {
      const datos = await listEventosRequest(token);
      setEventos(datos);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudieron cargar los eventos'));
    }
  }

  async function cargarCategorias() {
    try {
      const datos = await listCategoriasRequest(token);
      setCategorias(datos);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudieron cargar las categorias'));
    }
  }

  async function cargarCuentas() {
    try {
      const [empresas, clientes] = await Promise.all([
        listUsuariosRequest('empresa', token),
        listUsuariosRequest('cliente', token)
      ]);
      setCuentas([...empresas, ...clientes]);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudieron cargar las cuentas'));
    }
  }

  async function cargarServiciosRevision() {
    try {
      const datos = await listServiciosRevisionRequest(token);
      setServiciosRevision(datos);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudieron cargar los servicios en revision'));
    }
  }

  function mostrarEventos() {
    setMensaje('');
    setSeccion('eventos');
    setFormEventoVisible(false);
    cargarEventos();
  }

  function mostrarCategorias() {
    setMensaje('');
    setSeccion('categorias');
    setFormCategoriaVisible(false);
    cargarCategorias();
    cargarEventos();
  }

  function mostrarCuentas() {
    setMensaje('');
    setSeccion('cuentas');
    cargarCuentas();
  }

  function mostrarServicios() {
    setMensaje('');
    setSeccion('servicios');
    cargarServiciosRevision();
  }

  function abrirFormularioEvento() {
    setEventoEditando(null);
    setFormEvento(eventoVacio);
    setFormEventoVisible(true);
  }

  function empezarEdicionEvento(evento: Evento) {
    setEventoEditando(evento);
    setFormEvento({
      nombre: evento.nombre,
      descripcion: evento.descripcion ?? '',
      imagen: evento.imagen ?? '',
      draft: evento.draft
    });
    setFormEventoVisible(true);
  }

  async function guardarEvento(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    const datos = { ...formEvento, nombre: formatearTitulo(formEvento.nombre) };

    try {
      if (eventoEditando) {
        await updateEventoRequest(eventoEditando.id, datos, token);
      } else {
        await createEventoRequest(datos, token);
      }
      await cargarEventos();
      setFormEventoVisible(false);
      setEventoEditando(null);
      setFormEvento(eventoVacio);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo guardar el evento'));
    }
  }

  async function borrarEvento(evento: Evento) {
    if (!window.confirm('Seguro que queres borrar el evento ' + evento.nombre + '?')) return;

    try {
      await deleteEventoRequest(evento.id, token);
      await cargarEventos();
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo borrar el evento'));
    }
  }

  function abrirFormularioCategoria() {
    setCategoriaEditando(null);
    setFormCategoria({ ...categoriaVacia, eventoId: eventos[0]?.id ?? 0 });
    setFormCategoriaVisible(true);
  }

  function empezarEdicionCategoria(categoria: Categoria) {
    setCategoriaEditando(categoria);
    setFormCategoria({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion ?? '',
      eventoId: categoria.evento.id
    });
    setFormCategoriaVisible(true);
  }

  async function guardarCategoria(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    if (!formCategoria.eventoId) {
      setMensaje('Tenes que elegir un evento');
      return;
    }

    try {
      if (categoriaEditando) {
        await updateCategoriaRequest(categoriaEditando.id, formCategoria, token);
      } else {
        await createCategoriaRequest(formCategoria, token);
      }
      await cargarCategorias();
      setFormCategoriaVisible(false);
      setCategoriaEditando(null);
      setFormCategoria(categoriaVacia);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo guardar la categoria'));
    }
  }

  async function borrarCategoria(categoria: Categoria) {
    if (!window.confirm('Seguro que queres borrar la categoria ' + categoria.nombre + '?')) return;

    try {
      await deleteCategoriaRequest(categoria.id, token);
      await cargarCategorias();
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo borrar la categoria'));
    }
  }

  async function cambiarEstadoCuenta(cuenta: Usuario) {
    if (!window.confirm('Queres cambiar el estado de la cuenta ' + cuenta.nombre + '?')) return;

    const activoNuevo = !cuenta.activo;
    setMensaje('');
    setCuentas((actuales) => actuales.map((item) => (
      item.id === cuenta.id ? { ...item, activo: activoNuevo } : item
    )));

    try {
      await setUsuarioActivoRequest(cuenta.id, activoNuevo, token);
    } catch (error) {
      setCuentas((actuales) => actuales.map((item) => (
        item.id === cuenta.id ? { ...item, activo: cuenta.activo } : item
      )));
      setMensaje(mensajeDeError(error, 'No se pudo cambiar el estado de la cuenta'));
    }
  }

  async function aprobarServicio(servicio: ServicioRevision) {
    if (!window.confirm('Seguro que queres aprobar y publicar el servicio ' + servicio.nombre + '?')) return;

    try {
      await aprobarServicioRequest(servicio.id, token);
      await cargarServiciosRevision();
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo aprobar el servicio'));
    }
  }

  async function denegarServicio(servicio: ServicioRevision) {
    if (!window.confirm('Seguro que queres denegar el servicio ' + servicio.nombre + '? Se va a borrar.')) return;

    try {
      await denegarServicioRequest(servicio.id, token);
      await cargarServiciosRevision();
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo denegar el servicio'));
    }
  }

  return {
    seccion,
    mensaje,
    eventos,
    formEventoVisible,
    eventoEditando,
    formEvento,
    setFormEvento,
    setFormEventoVisible,
    categorias,
    formCategoriaVisible,
    categoriaEditando,
    formCategoria,
    setFormCategoria,
    setFormCategoriaVisible,
    cuentas,
    serviciosRevision,
    mostrarEventos,
    mostrarCategorias,
    mostrarCuentas,
    mostrarServicios,
    abrirFormularioEvento,
    empezarEdicionEvento,
    guardarEvento,
    borrarEvento,
    abrirFormularioCategoria,
    empezarEdicionCategoria,
    guardarCategoria,
    borrarCategoria,
    cambiarEstadoCuenta,
    aprobarServicio,
    denegarServicio
  };
}

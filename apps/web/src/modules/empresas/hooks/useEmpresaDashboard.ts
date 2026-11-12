import { useEffect, useState } from 'react';
import {
  listServiciosRequest,
  createServicioRequest,
  updateServicioRequest,
  deleteServicioRequest
} from '../services/servicioService';
import { subirImagenServicioRequest } from '../services/imagenService';
import {
  crearCheckoutPlanProRequest,
  confirmarPlanProRequest,
  getUsuarioPlanRequest
} from '../services/planService';
import { mensajeDeError } from '../../../shared/api';
import type { Servicio } from '../services/servicioService';
import { listCategoriasRequest } from '../../eventos/services/categoriaService';
import type { Categoria } from '../../eventos/services/categoriaService';
import { formatearTitulo } from '../../../shared/formatters';

export const LIMITE_SERVICIOS_PLAN_GRATIS = 3;

export type SeccionEmpresa = 'servicios' | null;

export type FormServicio = {
  nombre: string;
  descripcion: string;
  imagen: string;
  categoriaId: number;
  estado: 'borrador' | 'revision';
};

export type MensajePago = {
  tipo: 'exito' | 'error';
  mensaje: string;
};

const servicioVacio: FormServicio = {
  nombre: '',
  descripcion: '',
  imagen: '',
  categoriaId: 0,
  estado: 'borrador'
};

export function textoEstadoServicio(estado: Servicio['estado']): string {
  if (estado === 'borrador') {
    return 'borrador';
  } else if (estado === 'revision') {
    return 'en revision, esperando al administrador';
  } else {
    return 'publicado';
  }
}

export function useEmpresaDashboard(usuarioId: number | undefined, token: string) {
  const [seccion, setSeccion] = useState<SeccionEmpresa>(null);

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formServicioVisible, setFormServicioVisible] = useState(false);
  const [servicioEditando, setServicioEditando] = useState<Servicio | null>(null);
  const [formServicio, setFormServicio] = useState(servicioVacio);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  const [plan, setPlan] = useState<'gratis' | 'pro'>('gratis');
  const [creandoPagoPro, setCreandoPagoPro] = useState(false);
  const [mensajePago, setMensajePago] = useState<MensajePago | null>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState('');

  async function cargarServicios() {
    if (!usuarioId) return;

    try {
      const datos = await listServiciosRequest(usuarioId, token);
      setServicios(datos);
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudieron cargar los servicios'));
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

  async function cargarPlan() {
    if (!usuarioId) return;

    try {
      const planDelUsuario = await getUsuarioPlanRequest(usuarioId, token);
      setPlan(planDelUsuario);
    } catch {
      setPlan('gratis');
    }
  }

  function mostrarServicios() {
    setMensaje('');
    setSeccion('servicios');
    setFormServicioVisible(false);
    cargarServicios();
    cargarCategorias();
    cargarPlan();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- cargarPlan hace un fetch y recien ahi actualiza el estado
    cargarPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) return;

    const parametros = new URLSearchParams(window.location.search);
    const pago = parametros.get('pago');

    if (pago !== 'pro') return;

    const paymentId = parametros.get('payment_id');
    const status = parametros.get('status');

    window.history.replaceState({}, '', window.location.pathname);

    if (status !== 'approved' || !paymentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- es el resultado de leer la url al entrar, no un render en loop
      setMensajePago({
        tipo: 'error',
        mensaje: 'El pago no se aprobo. Si fue un error, podes intentar pasar a Pro de nuevo.'
      });
      return;
    }

    confirmarPlanProRequest(usuarioId, paymentId, token)
      .then(() => {
        setPlan('pro');
        setMensajePago({
          tipo: 'exito',
          mensaje: 'Listo! Tu cuenta ahora es Pro, ya podes subir todos los servicios que quieras.'
        });
      })
      .catch(() => {
        setMensajePago({
          tipo: 'error',
          mensaje: 'Mercado Pago aprobo el pago pero no pudimos confirmarlo en el servidor.'
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  async function seleccionarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo || !usuarioId) return;

    setSubiendoImagen(true);
    setMensaje('');

    try {
      const url = await subirImagenServicioRequest(usuarioId, archivo);
      setFormServicio((actual) => ({ ...actual, imagen: url }));
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo subir la imagen'));
    } finally {
      setSubiendoImagen(false);
      e.target.value = '';
    }
  }

  function abrirFormularioServicio() {
    setServicioEditando(null);
    setFormServicio({ ...servicioVacio, categoriaId: categorias[0]?.id ?? 0 });
    setFormServicioVisible(true);
  }

  function empezarEdicionServicio(servicio: Servicio) {
    setServicioEditando(servicio);

    let estadoParaEditar: 'borrador' | 'revision';
    if (servicio.estado === 'publicado') {
      estadoParaEditar = 'revision';
    } else {
      estadoParaEditar = servicio.estado;
    }

    setFormServicio({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion ?? '',
      imagen: servicio.imagen ?? '',
      categoriaId: servicio.categoria.id,
      estado: estadoParaEditar
    });
    setFormServicioVisible(true);
  }

  async function guardarServicio(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    if (!usuarioId) return;

    if (!formServicio.categoriaId) {
      setMensaje('Tenes que elegir una categoria');
      return;
    }

    if (!servicioEditando && plan === 'gratis' && servicios.length >= LIMITE_SERVICIOS_PLAN_GRATIS) {
      setMensaje('Llegaste al limite de ' + LIMITE_SERVICIOS_PLAN_GRATIS + ' servicios del plan gratis. Pasate a Pro para seguir subiendo.');
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
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo guardar el servicio'));
    }
  }

  async function manejarPasarAPro() {
    if (!usuarioId) return;

    setCreandoPagoPro(true);
    setMensajePago(null);
    try {
      const checkout = await crearCheckoutPlanProRequest(usuarioId, token);
      const urlDePago = checkout.sandboxInitPoint ?? checkout.initPoint;
      window.location.assign(urlDePago);
    } catch (error) {
      setMensajePago({
        tipo: 'error',
        mensaje: mensajeDeError(error, 'No se pudo iniciar el pago del plan Pro.')
      });
    } finally {
      setCreandoPagoPro(false);
    }
  }

  async function borrarServicio(servicio: Servicio) {
    if (!usuarioId) return;

    if (!window.confirm('Seguro que queres borrar el servicio ' + servicio.nombre + '?')) return;

    try {
      await deleteServicioRequest(servicio.id, usuarioId, token);
      await cargarServicios();
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo borrar el servicio'));
    }
  }

  const llegoAlLimiteDelPlanGratis = plan === 'gratis' && servicios.length >= LIMITE_SERVICIOS_PLAN_GRATIS;

  return {
    seccion,
    mensaje,
    mensajePago,
    plan,
    servicios,
    categorias,
    formServicioVisible,
    servicioEditando,
    formServicio,
    setFormServicio,
    setFormServicioVisible,
    subiendoImagen,
    creandoPagoPro,
    llegoAlLimiteDelPlanGratis,
    mostrarServicios,
    seleccionarImagen,
    abrirFormularioServicio,
    empezarEdicionServicio,
    guardarServicio,
    manejarPasarAPro,
    borrarServicio
  };
}

import { useState } from 'react';
import { Boxes, Users, Pencil, Trash2 } from 'lucide-react';
import Card from './card';
import './dashboard.css';

interface Servicio {
  id: number;
  nombre: string;
  precio: string;
}

interface Perfil {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface AdminDashboardProps {
  onLogout?: () => void; // Función que viene de App.tsx para "cerrar sesión"
  servicios?: Servicio[];
  perfiles?: Perfil[];
  onEditServicio?: (servicio: Servicio) => void;
  onDeleteServicio?: (servicio: Servicio) => void;
  onEditPerfil?: (perfil: Perfil) => void;
  onDeletePerfil?: (perfil: Perfil) => void;
}

// Lista falsa de servicios, usada como valor por defecto si no se pasa la prop "servicios"
const serviciosFalsos: Servicio[] = [
  { id: 1, nombre: 'Corte de pelo', precio: '$ 5.000' },
  { id: 2, nombre: 'Manicura', precio: '$ 8.000' },
  { id: 3, nombre: 'Masaje relajante', precio: '$ 15.000' },
];

// Lista falsa de perfiles (usuarios), usada como valor por defecto si no se pasa la prop "perfiles"
const perfilesFalsos: Perfil[] = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@planit.com', rol: 'Cliente' },
  { id: 2, nombre: 'Peluquería Bella', email: 'empresa@planit.com', rol: 'Empresa' },
  { id: 3, nombre: 'María Gómez', email: 'maria@planit.com', rol: 'Cliente' },
];

export default function AdminDashboard({
  onLogout,
  servicios = serviciosFalsos,
  perfiles = perfilesFalsos,
  onEditServicio,
  onDeleteServicio,
  onEditPerfil,
  onDeletePerfil
}: AdminDashboardProps) {
  function volverAIniciarSesion() {
    onLogout?.();
  }

  // Controla qué lista se muestra en el modal: 'servicios', 'perfiles' o ninguna (null)
  const [listaAbierta, setListaAbierta] = useState<'servicios' | 'perfiles' | null>(null);

  function abrirServicios() {
    setListaAbierta('servicios');
  }

  function abrirPerfiles() {
    setListaAbierta('perfiles');
  }

  function cerrarLista() {
    setListaAbierta(null);
  }

  // Si el padre pasó un callback, lo usamos; si no, avisamos que falta desarrollarlo
  function editarServicio(servicio: Servicio) {
    if (onEditServicio) onEditServicio(servicio);
    else alert(`Editar "${servicio.nombre}": función no implementada todavía.`);
  }

  function borrarServicio(servicio: Servicio) {
    if (onDeleteServicio) onDeleteServicio(servicio);
    else alert(`Borrar "${servicio.nombre}": función no implementada todavía.`);
  }

  function editarPerfil(perfil: Perfil) {
    if (onEditPerfil) onEditPerfil(perfil);
    else alert(`Editar "${perfil.nombre}": función no implementada todavía.`);
  }

  function borrarPerfil(perfil: Perfil) {
    if (onDeletePerfil) onDeletePerfil(perfil);
    else alert(`Borrar "${perfil.nombre}": función no implementada todavía.`);
  }

  return (
    <div className="admin-container">
      <main className="admin-main">
        {/* Fila de arriba: título a la izquierda y botón de logout a la derecha */}
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Dashboard</h1>
          <button className="admin-boton-logout" onClick={volverAIniciarSesion}>
            Volver a iniciar sesión
          </button>
        </div>

        {/* Banner */}
        <div id="admin-subtitulo"> Observa tus estadísticas </div>

        {/* TARJETAS SUPERIORES: iguales a las del dashboard de businesses */}
        <div className="admin-cards-grid">
          <Card id="admin-verde" amount="$ 153.000" label="Ingresos" icon="money.svg" />
          <Card id="admin-amarillo" amount="20" label="Ventas" icon="cart.svg" />
          <Card id="admin-azul" amount="20" label="Clientes" icon="badge.svg" />
          <Card id="admin-gris" amount="20" label="Empleados" icon="gift.svg" />
        </div>

        {/* Las 2 tarjetas verticales exclusivas de admin */}
        <div className="admin-acciones-grid">
          <button className="admin-accion-card" onClick={abrirServicios}>
            <Boxes size={32} className="admin-accion-icono" />
            <h3 className="admin-accion-titulo">Administrar Servicios</h3>
            <p className="admin-accion-descripcion">Mira, edita o borra los servicios cargados</p>
          </button>

          <button className="admin-accion-card" onClick={abrirPerfiles}>
            <Users size={32} className="admin-accion-icono" />
            <h3 className="admin-accion-titulo">Administrar Perfiles</h3>
            <p className="admin-accion-descripcion">Mira, edita o borra los perfiles registrados</p>
          </button>
        </div>
      </main>

      {/* Modal con la lista de servicios (editar / borrar sin desarrollar todavía) */}
      {listaAbierta === 'servicios' && (
        <div className="admin-modal-overlay" onClick={cerrarLista}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-titulo">Servicios</h3>
            <div className="admin-lista">
              {servicios.map((servicio) => (
                <div key={servicio.id} className="admin-fila">
                  <div className="admin-fila-info">
                    <span className="admin-fila-nombre">{servicio.nombre}</span>
                    <span className="admin-fila-detalle">{servicio.precio}</span>
                  </div>
                  <div className="admin-fila-botones">
                    <button className="admin-boton-icono" onClick={() => editarServicio(servicio)} aria-label="Editar">
                      <Pencil size={18} />
                    </button>
                    <button className="admin-boton-icono" onClick={() => borrarServicio(servicio)} aria-label="Borrar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-modal-actions">
              <button type="button" onClick={cerrarLista}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal con la lista de perfiles (editar / borrar sin desarrollar todavía) */}
      {listaAbierta === 'perfiles' && (
        <div className="admin-modal-overlay" onClick={cerrarLista}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-titulo">Perfiles</h3>
            <div className="admin-lista">
              {perfiles.map((perfil) => (
                <div key={perfil.id} className="admin-fila">
                  <div className="admin-fila-info">
                    <span className="admin-fila-nombre">{perfil.nombre}</span>
                    <span className="admin-fila-detalle">{perfil.email} · {perfil.rol}</span>
                  </div>
                  <div className="admin-fila-botones">
                    <button className="admin-boton-icono" onClick={() => editarPerfil(perfil)} aria-label="Editar">
                      <Pencil size={18} />
                    </button>
                    <button className="admin-boton-icono" onClick={() => borrarPerfil(perfil)} aria-label="Borrar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-modal-actions">
              <button type="button" onClick={cerrarLista}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

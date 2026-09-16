import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  FileText, 
  Table, 
  Plus, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Gift, 
  MessageSquare, 
  Bell, 
  Power, 
  ChevronDown,
  Pencil,
  Trash2
} from 'lucide-react';

import Card from './card';
import { HorizontalCard } from './HorizontalCard';
import './dashboard.css';

interface DashboardProps {
  role?: string; // O role?: 'admin' | 'business' | 'client';
  onLogout?: () => void; // Función que viene de App.tsx para "cerrar sesión"
}

export default function AdminDashboard({ role, onLogout }: DashboardProps) {
  // Controla si el menú lateral (sidebar) muestra sus sub-items o no
  const [uiComponentsOpen, setUiComponentsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Botón "Volver a iniciar sesión": simplemente llama a onLogout,
  // que en App.tsx borra el usuario logueado y por eso vuelve a mostrarse AuthPage
  function volverAIniciarSesion() {
    onLogout?.();
  }

  // Estado del modal "Crear Servicio" y de los campos del formulario
  const [showCrearServicio, setShowCrearServicio] = useState(false);
  const [nombreServicio, setNombreServicio] = useState('');
  const [precioServicio, setPrecioServicio] = useState('');
  const [descripcionServicio, setDescripcionServicio] = useState('');

  function abrirCrearServicio() {
    setShowCrearServicio(true);
  }

  function cerrarCrearServicio() {
    setShowCrearServicio(false);
    setNombreServicio('');
    setPrecioServicio('');
    setDescripcionServicio('');
  }

  function guardarServicio(e: React.FormEvent) {
    e.preventDefault(); // evita que el formulario recargue la página
    alert(`Servicio creado:\nNombre: ${nombreServicio}\nPrecio: ${precioServicio}\nDescripción: ${descripcionServicio}`);
    cerrarCrearServicio();
  }

  // Lista falsa de servicios, solo para mostrar cómo se vería
  const serviciosFalsos = [
    { id: 1, nombre: 'Corte de pelo', precio: '$ 5.000', descripcion: 'Corte clásico para caballero' },
    { id: 2, nombre: 'Manicura', precio: '$ 8.000', descripcion: 'Manicura completa con esmalte' },
    { id: 3, nombre: 'Masaje relajante', precio: '$ 15.000', descripcion: 'Masaje de 30 minutos' },
  ];

  // Indica si mostramos la lista para "editar" o para "eliminar" (o ninguna, null)
  const [listaServicios, setListaServicios] = useState<'editar' | 'eliminar' | null>(null);

  function abrirListaEditar() {
    setListaServicios('editar');
  }

  function abrirListaEliminar() {
    setListaServicios('eliminar');
  }

  function cerrarListaServicios() {
    setListaServicios(null);
  }

  function editarServicio(nombre: string) {
    alert(`Editar servicio: ${nombre}`);
  }

  function eliminarServicio(nombre: string) {
    alert(`Servicio eliminado: ${nombre}`);
  }

  // Datos para las 3 tarjetas exclusivas de la empresa
  const businessCardsData = [
    {
      id: 'card-1',
      category: 'Crear Servicio',
      title: ' Crea bienes o servicios',
      description: 'Amplia tu oferta para que más gente te vea',
      date: '10 de Octubre',
      action: abrirCrearServicio
    },
    {
      id: 'card-2',
      category: 'Actualizar Servicios',
      title: 'Actualiza tus Bienes o Servicios ya creados',
      description: 'Puedes modificar los servicios que tiene disponibles hasta el momento',
      date: '12 de Octubre',
      action: abrirListaEditar
    },
    {
      id: 'card-3',
      category: 'Eliminar Servicios',
      title: 'Da de baja un servicio',
      description: 'Puedes eliminar servicios que no uses',
      date: '15 de Octubre',
      action: abrirListaEliminar
    },
  ];

  return (
    // Contenedor general de toda la pantalla del dashboard
    <div className='container'>
      {/* Navegacion */}
      <aside>
        <div>
          {/* Logo  */}
          <div> </div>

          <nav>
            {/* Menu Item */}
            <div>
              {/* Sub-items: solo se muestran si uiComponentsOpen es true */}
              {uiComponentsOpen && (
                <div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      <main>
        {/* Fila de arriba: título a la izquierda y botón de logout a la derecha */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <button className="boton-logout" onClick={volverAIniciarSesion}>
            Volver a iniciar sesión
          </button>
        </div>

        {/* Banner */}
        <div id="subtitulo"> Observa tus estadísticas </div>

        {/* TARJETAS SUPERIORES: solo muestran datos fijos de ejemplo */}
        <div className="cards-grid">
          <Card id="verde" amount="$ 153.000" label="Ingresos" icon="money.svg" />
          <Card id="amarillo" amount="20" label="Ventas" icon="cart.svg" />
          <Card id="azul" amount="20" label="Clientes" icon="badge.svg" />
          <Card id="gris" amount="20" label="Empleados" icon="gift.svg" />
        </div>

        {/* --- POSICIÓN MEDIA: 3 Tarjetas distintas para 'business' --- */}
        {/* Solo se ven si el usuario logueado tiene rol 'business' */}
        {role === 'business' && (
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {/* Recorremos businessCardsData y dibujamos una HorizontalCard por cada una */}
            {businessCardsData.map((card) => (
              <HorizontalCard
                key={card.id}
                category={card.category}
                title={card.title}
                description={card.description}
                date={card.date}
                onClick={card.action} // al hacer click se ejecuta la función guardada en "action"
              />
            ))}
          </div>
        )}

        {/* Paneles Principales (todavía vacío, reservado para más contenido) */}
        <div>
        </div>
      </main>

      {/* Modal simple para crear un servicio, con el mismo estilo que las cards */}
      {/* Solo se dibuja en pantalla cuando showCrearServicio es true */}
      {showCrearServicio && (
        <div className="modal-overlay" onClick={cerrarCrearServicio}>
          <div
            className="horizontal-card modal-card"
            onClick={(e) => e.stopPropagation()} // evita cerrar el modal al hacer click adentro
          >
            <div className="card-accent" />
            <div className="card-content">
              <div className="card-header">
                <span className="card-category">Crear Servicio</span>
              </div>
              <h3 className="card-title">Completa los datos del servicio</h3>

              <form onSubmit={guardarServicio} className="modal-form">
                <label>
                  Nombre
                  <input
                    type="text"
                    value={nombreServicio}
                    onChange={(e) => setNombreServicio(e.target.value)}
                    required
                  />
                </label>

                <label>
                  Precio
                  <input
                    type="number"
                    value={precioServicio}
                    onChange={(e) => setPrecioServicio(e.target.value)}
                    required
                  />
                </label>

                <label>
                  Descripción
                  <textarea
                    value={descripcionServicio}
                    onChange={(e) => setDescripcionServicio(e.target.value)}
                    required
                  />
                </label>

                <div className="modal-actions">
                  <button type="button" onClick={cerrarCrearServicio}>Cancelar</button>
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal simple con la lista de servicios, para editar o eliminar */}
      {/* Se reutiliza el mismo modal para los dos casos: solo cambia el texto y el ícono del botón */}
      {listaServicios && (
        <div className="modal-overlay" onClick={cerrarListaServicios}>
          <div
            className="horizontal-card modal-card modal-card-lista"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-accent" />
            <div className="card-content">
              <div className="card-header">
                <span className="card-category">
                  {listaServicios === 'editar' ? 'Actualizar Servicios' : 'Eliminar Servicios'}
                </span>
              </div>
              <h3 className="card-title">
                {listaServicios === 'editar' ? 'Elige un servicio para editar' : 'Elige un servicio para eliminar'}
              </h3>

              <div className="service-list">
                {serviciosFalsos.map((servicio) => (
                  <div key={servicio.id} className="service-row">
                    <div className="service-row-info">
                      <span className="service-row-nombre">{servicio.nombre}</span>
                      <span className="service-row-precio">{servicio.precio}</span>
                    </div>

                    {listaServicios === 'editar' ? (
                      <button
                        className="service-row-boton"
                        onClick={() => editarServicio(servicio.nombre)}
                        aria-label="Editar servicio"
                      >
                        <Pencil size={18} />
                      </button>
                    ) : (
                      <button
                        className="service-row-boton"
                        onClick={() => eliminarServicio(servicio.nombre)}
                        aria-label="Eliminar servicio"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button type="button" onClick={cerrarListaServicios}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
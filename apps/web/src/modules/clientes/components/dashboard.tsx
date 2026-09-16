import Card from './card';
import './dashboard.css';

interface ClienteDashboardProps {
  onLogout?: () => void; // Función que viene de App.tsx para "cerrar sesión"
}

// Lista falsa de servicios que un cliente podría contratar.
// Son datos "hardcodeados" (fijos en el código), no vienen de ninguna base de datos todavía.
// La imagen viene de picsum.photos, un sitio que da fotos random gratis para pruebas.
// Usamos "seed" (semilla) para que cada servicio muestre siempre la misma foto.
const serviciosDisponibles = [
  {
    id: 1,
    nombre: 'Corte de pelo',
    precio: '$ 5.000',
    descripcion: 'Corte clásico para caballero, incluye lavado.',
    imagen: 'https://picsum.photos/seed/corte-de-pelo/300/200',
  },
  {
    id: 2,
    nombre: 'Manicura',
    precio: '$ 8.000',
    descripcion: 'Manicura completa con esmalte a elección.',
    imagen: 'https://picsum.photos/seed/manicura/300/200',
  },
  {
    id: 3,
    nombre: 'Masaje relajante',
    precio: '$ 15.000',
    descripcion: 'Masaje de 30 minutos para aliviar el estrés.',
    imagen: 'https://picsum.photos/seed/masaje-relajante/300/200',
  },
  {
    id: 4,
    nombre: 'Limpieza facial',
    precio: '$ 12.000',
    descripcion: 'Limpieza profunda de cutis con productos naturales.',
    imagen: 'https://picsum.photos/seed/limpieza-facial/300/200',
  },
];

export default function ClienteDashboard({ onLogout }: ClienteDashboardProps) {
  // Botón "Volver a iniciar sesión": llama a onLogout (viene de App.tsx)
  // y eso hace que la app vuelva a mostrar la pantalla de login.
  function volverAIniciarSesion() {
    onLogout?.();
  }

  // Por ahora "Contratar" no hace nada real, solo avisa que está en construcción.
  function contratarServicio(nombre: string) {
    alert(`Todavía no se puede contratar "${nombre}". ¡Función en construcción!`);
  }

  return (
    <div className="cliente-container">
      <main className="cliente-main">
        {/* Fila de arriba: título a la izquierda y botón de logout a la derecha */}
        {/* Copiado igual que en el dashboard de businesses */}
        <div className="cliente-dashboard-header">
          <h1 className="cliente-dashboard-title">Dashboard</h1>
          <button className="cliente-boton-logout" onClick={volverAIniciarSesion}>
            Volver a iniciar sesión
          </button>
        </div>

        {/* Banner */}
        <div id="cliente-subtitulo"> Observa tus estadísticas </div>

        {/* TARJETAS SUPERIORES: iguales a las del dashboard de businesses */}
        <div className="cliente-cards-grid">
          <Card id="cliente-verde" amount="$ 153.000" label="Ingresos" icon="money.svg" />
          <Card id="cliente-amarillo" amount="20" label="Ventas" icon="cart.svg" />
          <Card id="cliente-azul" amount="20" label="Clientes" icon="badge.svg" />
          <Card id="cliente-gris" amount="20" label="Empleados" icon="gift.svg" />
        </div>

        {/* Título de la sección de servicios */}
        <h2 className="cliente-servicios-title">Servicios disponibles</h2>

        {/* Lista de servicios: usa el mismo estilo visual (fondo blanco, barra de color, sombra) */}
        <div className="cliente-servicios-lista">
          {serviciosDisponibles.map((servicio) => (
            <div key={servicio.id} className="cliente-servicio-card">
              <div className="cliente-servicio-accent" />
              <img className="cliente-servicio-imagen" src={servicio.imagen} alt={servicio.nombre} />
              <div className="cliente-servicio-content">
                <div className="cliente-servicio-header">
                  <span className="cliente-servicio-nombre">{servicio.nombre}</span>
                  <span className="cliente-servicio-precio">{servicio.precio}</span>
                </div>
                <p className="cliente-servicio-descripcion">{servicio.descripcion}</p>

                {/* Botón que por el momento no lleva a ningún lado */}
                <button
                  className="cliente-boton-contratar"
                  onClick={() => contratarServicio(servicio.nombre)}
                >
                  Contratar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

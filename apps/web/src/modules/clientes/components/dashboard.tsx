import { useState } from 'react';
import { Search, CalendarDays, Tags } from 'lucide-react';
import './dashboard.css';

import {
  buscarServiciosRequest
} from '../services/servicioService';

import type {
  Servicio
} from '../services/servicioService';

import CategoriasPage from './CategoriasPage';
import EventosPage from './EventosPage';


interface ClienteDashboardProps {
  nombreUsuario: string;
  onLogout?: () => void;
}


export default function ClienteDashboard({
  nombreUsuario,
  onLogout
}: ClienteDashboardProps) {

  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  const [pantalla, setPantalla] =
    useState<'inicio' | 'categorias' | 'eventos'>('inicio');


  function volverAIniciarSesion() {
    onLogout?.();
  }


  // ======================================================
  // BUSCAR SERVICIOS POR NOMBRE
  // ======================================================

  async function buscarServicios(e: React.FormEvent) {
    e.preventDefault();

    const texto = textoBusqueda.trim();

    if (!texto) {
      return;
    }

    setBuscando(true);
    setErrorBusqueda('');
    setBusquedaRealizada(true);

    try {

      const resultados =
        await buscarServiciosRequest(texto);

      setServicios(resultados);

    } catch (error) {

      setServicios([]);

      setErrorBusqueda(
        error instanceof Error
          ? error.message
          : 'Error al buscar los servicios'
      );

    } finally {

      setBuscando(false);

    }
  }


  return (
    <div className="cliente-container">

      <main className="cliente-main">

        {/* ==========================================
            ENCABEZADO
            ========================================== */}

        <div className="cliente-header">

          <div>

            <h1 className="cliente-titulo">
              PlanIt
            </h1>

            <p className="cliente-bienvenida">
              Bienvenido {nombreUsuario}
            </p>

          </div>


          <button
            className="cliente-boton-logout"
            onClick={volverAIniciarSesion}
          >
            Cerrar sesión
          </button>

        </div>


        {/* ==========================================
            PANTALLA DE CATEGORÍAS
            ========================================== */}

        {pantalla === 'categorias' && (

          <CategoriasPage
            onVolver={() => setPantalla('inicio')}
          />

        )}


        {/* ==========================================
            PANTALLA DE EVENTOS
            ========================================== */}

        {pantalla === 'eventos' && (

          <EventosPage
            onVolver={() => setPantalla('inicio')}
          />

        )}


        {/* ==========================================
            PANTALLA PRINCIPAL
            ========================================== */}

        {pantalla === 'inicio' && (
          <>

            {/* ==========================================
                BUSCADOR DIRECTO
                ========================================== */}

            <section className="cliente-buscador-seccion">

              <h2>
                ¿Buscás algo específico?
              </h2>

              <p>
                Buscá directamente el servicio que necesitás
              </p>


              <form
                className="cliente-buscador"
                onSubmit={buscarServicios}
              >

                <input
                  type="text"
                  placeholder="Buscar servicios por nombre..."
                  value={textoBusqueda}
                  onChange={(e) =>
                    setTextoBusqueda(e.target.value)
                  }
                />

                <button
                  type="submit"
                  className="cliente-buscador-boton"
                  aria-label="Buscar servicios"
                >
                  <Search size={22} />
                </button>

              </form>

            </section>


            {/* ==========================================
                RESULTADOS DE BÚSQUEDA
                ========================================== */}

            {buscando && (

              <p className="cliente-mensaje-busqueda">
                Buscando servicios...
              </p>

            )}


            {errorBusqueda && (

              <p className="cliente-error-busqueda">
                {errorBusqueda}
              </p>

            )}


            {!buscando &&
              busquedaRealizada &&
              !errorBusqueda &&
              servicios.length === 0 && (

                <p className="cliente-mensaje-busqueda">
                  No encontramos servicios con ese nombre.
                </p>

              )}


            {!buscando &&
              servicios.length > 0 && (

                <section className="cliente-resultados">

                  <h2 className="cliente-resultados-titulo">
                    Servicios encontrados
                  </h2>


                  <div className="cliente-resultados-grid">

                    {servicios.map((servicio) => (

                      <article
                        key={servicio.id}
                        className="cliente-servicio-card"
                      >

                        <div className="cliente-servicio-imagen">

                          {servicio.imagen ? (

                            <img
                              src={servicio.imagen}
                              alt={servicio.nombre}
                            />

                          ) : (

                            <Search size={36} />

                          )}

                        </div>


                        <div className="cliente-servicio-contenido">

                          <span className="cliente-servicio-categoria">
                            {servicio.categoria.nombre}
                          </span>

                          <h3>
                            {servicio.nombre}
                          </h3>

                          {servicio.descripcion && (

                            <p>
                              {servicio.descripcion}
                            </p>

                          )}

                        </div>

                      </article>

                    ))}

                  </div>

                </section>

              )}


            {/* ==========================================
                FORMAS DE BÚSQUEDA
                ========================================== */}

            <section className="cliente-opciones">


              {/* EVENTOS */}

              <button
                className="cliente-opcion-card"
                onClick={() => setPantalla('eventos')}
              >

                <div className="cliente-opcion-icono">
                  <CalendarDays size={42} />
                </div>

                <div className="cliente-opcion-numero">
                  1
                </div>

                <span className="cliente-opcion-texto">
                  Buscar servicio por
                </span>

                <h2>
                  EVENTO
                </h2>

                <p>
                  Elegí el tipo de evento y descubrí las categorías
                  de servicios disponibles.
                </p>

                <span className="cliente-opcion-boton">
                  Ver eventos
                </span>

              </button>


              {/* CATEGORÍAS */}

              <button
                className="cliente-opcion-card"
                onClick={() => setPantalla('categorias')}
              >

                <div className="cliente-opcion-icono">
                  <Tags size={42} />
                </div>

                <div className="cliente-opcion-numero">
                  2
                </div>

                <span className="cliente-opcion-texto">
                  Buscar servicio por
                </span>

                <h2>
                  CATEGORÍA
                </h2>

                <p>
                  Explorá las categorías y encontrá los servicios
                  disponibles en cada una.
                </p>

                <span className="cliente-opcion-boton">
                  Ver categorías
                </span>

              </button>

            </section>

          </>
        )}

      </main>

    </div>
  );
}

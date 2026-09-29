const API_URL = 'http://localhost:4000';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  draft: boolean;
  creadoEn?: string;
  categoria: {
    id: number;
    nombre: string;
  };
}


// ======================================================
// BUSCAR SERVICIOS POR NOMBRE
// ======================================================

export const buscarServiciosRequest = async (
  nombre: string,
  zona = '',
  empresa = ''
): Promise<Servicio[]> => {

  const params = new URLSearchParams();
  if (nombre.trim()) params.set('nombre', nombre.trim());
  if (zona.trim()) params.set('zona', zona.trim());
  if (empresa.trim()) params.set('empresa', empresa.trim());

  const response = await fetch(
    `${API_URL}/api/servicios/buscar?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Error al buscar los servicios'
    );
  }

  return data.servicios;
};


// ======================================================
// BUSCAR SERVICIOS POR CATEGORÍA
// ======================================================

export const buscarServiciosPorCategoriaRequest = async (
  categoriaId: number
): Promise<Servicio[]> => {

  const response = await fetch(
    `${API_URL}/api/servicios/categoria/${categoriaId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Error al buscar los servicios por categoría'
    );
  }

  return data.servicios;
};
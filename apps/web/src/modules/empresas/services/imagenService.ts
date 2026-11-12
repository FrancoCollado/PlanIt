import { ApiError } from '../../../shared/api';
import { supabase, SERVICIOS_IMAGENES_BUCKET } from '../../../config/supabase';

export const subirImagenServicioRequest = async (usuarioId: number, file: File): Promise<string> => {
  const extension = file.name.split('.').pop() ?? 'jpg';
  const path = `${usuarioId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(SERVICIOS_IMAGENES_BUCKET)
    .upload(path, file, { upsert: false });

  if (error) {
    throw new ApiError(error.message || 'Error al subir la imagen', 0);
  }

  const { data } = supabase.storage.from(SERVICIOS_IMAGENES_BUCKET).getPublicUrl(path);

  if (!data.publicUrl) {
    throw new ApiError('No se pudo obtener la URL de la imagen', 0);
  }

  return data.publicUrl;
};

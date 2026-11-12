import { describe, expect, it } from 'vitest';
import { mensajeDeError, mensajeDesdeCuerpo, ApiError } from './api';

describe('mensajeDesdeCuerpo', () => {
  it('usa el error del servidor cuando viene en el cuerpo', () => {
    expect(mensajeDesdeCuerpo({ error: 'Categoria en uso' }, 'fallback')).toBe('Categoria en uso');
  });

  it('usa el fallback si el cuerpo no trae un error util', () => {
    expect(mensajeDesdeCuerpo(null, 'fallback')).toBe('fallback');
    expect(mensajeDesdeCuerpo({ error: '   ' }, 'fallback')).toBe('fallback');
    expect(mensajeDesdeCuerpo('no json', 'fallback')).toBe('fallback');
  });
});

describe('mensajeDeError', () => {
  it('muestra el mensaje de ApiError y si no, el fallback', () => {
    expect(mensajeDeError(new ApiError('No se pudo conectar con el servidor', 0), 'fallback'))
      .toBe('No se pudo conectar con el servidor');
    expect(mensajeDeError('otra cosa', 'fallback')).toBe('fallback');
  });
});

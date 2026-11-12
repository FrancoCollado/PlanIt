import { ApiError, headersConToken, requestJson } from '../../../shared/api';

export interface MercadoPagoCheckoutResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint?: string;
}

type CheckoutBody = {
  preferenceId?: unknown;
  initPoint?: unknown;
  sandboxInitPoint?: unknown;
  error?: string;
};

type UsuarioPlanResponse = {
  usuario: {
    plan: 'gratis' | 'pro';
  };
};

function validarCheckout(data: CheckoutBody): MercadoPagoCheckoutResponse {
  if (
    typeof data.preferenceId !== 'string' ||
    typeof data.initPoint !== 'string' ||
    (data.sandboxInitPoint !== undefined && typeof data.sandboxInitPoint !== 'string')
  ) {
    throw new ApiError('Mercado Pago devolvió una respuesta inválida al iniciar el pago', 0);
  }

  return {
    preferenceId: data.preferenceId,
    initPoint: data.initPoint,
    ...(data.sandboxInitPoint ? { sandboxInitPoint: data.sandboxInitPoint } : {})
  };
}

export const crearCheckoutPlanProRequest = async (
  usuarioId: number,
  token: string
): Promise<MercadoPagoCheckoutResponse> => {
  const data = await requestJson<CheckoutBody>(
    '/api/payment/plan-pro/preference',
    'No se pudo iniciar el pago del plan Pro',
    {
      method: 'POST',
      headers: headersConToken(token, true),
      body: JSON.stringify({ usuarioId, origin: window.location.origin })
    }
  );

  return validarCheckout(data);
};

export const confirmarPlanProRequest = async (
  usuarioId: number,
  paymentId: string,
  token: string
): Promise<'pro'> => {
  await requestJson(
    '/api/payment/plan-pro/confirmar',
    'No se pudo confirmar el pago del plan Pro',
    {
      method: 'POST',
      headers: headersConToken(token, true),
      body: JSON.stringify({ usuarioId, paymentId })
    }
  );

  return 'pro';
};

export const getUsuarioPlanRequest = async (usuarioId: number, token: string): Promise<'gratis' | 'pro'> => {
  const data = await requestJson<UsuarioPlanResponse>(
    `/api/usuarios/${usuarioId}`,
    'Error al obtener el usuario',
    { headers: headersConToken(token) }
  );

  return data.usuario.plan;
};

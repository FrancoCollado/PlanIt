import type { Request, Response } from 'express';
import { respondWithError, sendApiError } from '../../../shared/api-error.js';
import {
  crearPreferenciaMercadoPago,
  MercadoPagoIntegrationError,
  verificarIntegracionMercadoPago
} from '../mercadoPago.js';
import type { CreatePaymentPreferenceDto } from '../dtos/payment.dto.js';

const sendMercadoPagoError = (res: Response, error: unknown, fallbackMessage: string) => {
  if (error instanceof MercadoPagoIntegrationError) {
    const code = error.status === 503 ? 'SERVICE_UNAVAILABLE' : 'BAD_GATEWAY';
    return respondWithError(res, error.status, code, error.message);
  }
  return sendApiError(res, error, fallbackMessage);
};

export const probarIntegracionMercadoPago = async (_req: Request, res: Response) => {
  try {
    await verificarIntegracionMercadoPago();
    res.json({ message: 'La integración con Mercado Pago funciona correctamente' });
  } catch (error) {
    return sendMercadoPagoError(res, error, 'No se pudo verificar la integración con Mercado Pago');
  }
};

export const crearPreferenciaPago = async (
  req: Request<{}, {}, CreatePaymentPreferenceDto>,
  res: Response
) => {
  try {
    const preferencia = await crearPreferenciaMercadoPago(req.body.items);
    res.status(201).json({
      preferenceId: preferencia.id,
      initPoint: preferencia.init_point,
      ...(preferencia.sandbox_init_point
        ? { sandboxInitPoint: preferencia.sandbox_init_point }
        : {})
    });
  } catch (error) {
    return sendMercadoPagoError(res, error, 'No se pudo crear la preferencia de pago');
  }
};

export const crearCheckoutPruebaMercadoPago = async (_req: Request, res: Response) => {
  try {
    const preferencia = await crearPreferenciaMercadoPago([
      {
        title: 'Prueba de integración con Mercado Pago',
        quantity: 1,
        unit_price: 100
      }
    ]);
    res.status(201).json({
      preferenceId: preferencia.id,
      initPoint: preferencia.init_point,
      ...(preferencia.sandbox_init_point
        ? { sandboxInitPoint: preferencia.sandbox_init_point }
        : {})
    });
  } catch (error) {
    return sendMercadoPagoError(res, error, 'No se pudo iniciar el checkout de prueba');
  }
};

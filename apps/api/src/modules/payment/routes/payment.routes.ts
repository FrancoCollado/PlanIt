import { Router } from 'express';
import {
  authenticate,
  ensureActiveUser,
  requireOwnUserId,
  requireRoles
} from '../../../middlewares/authorization.js';
import { ensureOrm } from '../../../middlewares/ensure-orm.js';
import { validateRequest } from '../../../shared/request-validation.js';
import { requestSchemas } from '../../../shared/request-schemas.js';
import {
  crearCheckoutPruebaMercadoPago,
  crearPreferenciaPago,
  probarIntegracionMercadoPago
} from '../controllers/payment.controller.js';

const router = Router();

router.post(
  '/test',
  authenticate,
  requireRoles('empresa'),
  requireOwnUserId,
  ensureOrm,
  ensureActiveUser,
  probarIntegracionMercadoPago
);

router.post(
  '/test/checkout',
  authenticate,
  requireRoles('empresa'),
  validateRequest(requestSchemas.testPaymentCheckout),
  requireOwnUserId,
  ensureOrm,
  ensureActiveUser,
  crearCheckoutPruebaMercadoPago
);

router.post(
  '/preferences',
  authenticate,
  requireRoles('empresa'),
  validateRequest(requestSchemas.createPaymentPreference),
  requireOwnUserId,
  ensureOrm,
  ensureActiveUser,
  crearPreferenciaPago
);

export default router;

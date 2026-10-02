import { Router } from 'express';

import {
  getCategorias,
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
} from '../controllers/categoria.controller';
import { validateRequest } from '../../../shared/request-validation';
import { requestSchemas } from '../../../shared/request-schemas';
import { ensureOrm } from '../../../middlewares/ensure-orm';
import { authenticate, ensureActiveUser, requireRoles } from '../../../middlewares/authorization';

const router = Router();

router.get('/', authenticate, requireRoles('cliente', 'empresa', 'administrador'), ensureOrm, ensureActiveUser, getCategorias);
router.get('/:id', authenticate, requireRoles('cliente', 'empresa', 'administrador'), validateRequest(requestSchemas.idParams), ensureOrm, ensureActiveUser, getCategoria);
router.post('/', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.createCategoria), ensureOrm, ensureActiveUser, crearCategoria);
router.put('/:id', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.updateCategoria), ensureOrm, ensureActiveUser, actualizarCategoria);
router.delete('/:id', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.idParams), ensureOrm, ensureActiveUser, borrarCategoria);

export default router;

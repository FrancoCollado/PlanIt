import { Router } from 'express';

import { getUsuarios, patchUsuarioActivo } from '../controllers/usuario.controller.js';
import { validateRequest } from '../../../shared/request-validation.js';
import { requestSchemas } from '../../../shared/request-schemas.js';
import { ensureOrm } from '../../../middlewares/ensure-orm.js';
import { authenticate, ensureActiveUser, requireRoles } from '../../../middlewares/authorization.js';

const router = Router();

router.get('/', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.listUsuarios), ensureOrm, ensureActiveUser, getUsuarios);
router.patch('/:id/activo', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.setUsuarioActivo), ensureOrm, ensureActiveUser, patchUsuarioActivo);

export default router;

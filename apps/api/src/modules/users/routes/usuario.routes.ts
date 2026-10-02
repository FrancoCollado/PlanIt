import { Router } from 'express';

import { getUsuarios, patchUsuarioActivo } from '../controllers/usuario.controller';
import { validateRequest } from '../../../shared/request-validation';
import { requestSchemas } from '../../../shared/request-schemas';
import { ensureOrm } from '../../../middlewares/ensure-orm';
import { authenticate, ensureActiveUser, requireRoles } from '../../../middlewares/authorization';

const router = Router();

router.get('/', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.listUsuarios), ensureOrm, ensureActiveUser, getUsuarios);
router.patch('/:id/activo', authenticate, requireRoles('administrador'), validateRequest(requestSchemas.setUsuarioActivo), ensureOrm, ensureActiveUser, patchUsuarioActivo);

export default router;

import { Router } from 'express';

import { getAdminDashboardStats, getBusinessDashboardStats } from '../controllers/stats.controller';
import { validateRequest } from '../../../shared/request-validation';
import { requestSchemas } from '../../../shared/request-schemas';
import { ensureOrm } from '../../../middlewares/ensure-orm';
import { authenticate, ensureActiveUser, requireOwnUserId, requireRoles } from '../../../middlewares/authorization';

const router = Router();

router.get('/admin', authenticate, requireRoles('administrador'), ensureOrm, ensureActiveUser, getAdminDashboardStats);
router.get('/business', authenticate, requireRoles('empresa'), validateRequest(requestSchemas.businessStats), requireOwnUserId, ensureOrm, ensureActiveUser, getBusinessDashboardStats);

export default router;

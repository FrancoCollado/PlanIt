import { Router } from 'express';

import { getAdminDashboardStats, getBusinessDashboardStats } from '../controllers/stats.controller';

const router = Router();

router.get('/admin', getAdminDashboardStats);
router.get('/business', getBusinessDashboardStats);

export default router;

import { Router } from 'express';

import {
  login,
  register
} from '../controllers/auth.controller';
import { validateRequest } from '../../../shared/request-validation';
import { requestSchemas } from '../../../shared/request-schemas';
import { ensureOrm } from '../../../middlewares/ensure-orm';

const router = Router();

router.post('/login', validateRequest(requestSchemas.login), ensureOrm, login);

router.post('/register', validateRequest(requestSchemas.register), ensureOrm, register);

export default router;
import { Router } from 'express';

import { getUsuarios, patchUsuarioActivo } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getUsuarios);
router.patch('/:id/activo', patchUsuarioActivo);

export default router;

import { Router } from 'express';

import {
  getServicios,
  crearServicio,
  actualizarServicio,
  borrarServicio
} from '../controllers/servicio.controller';

const router = Router();

router.get('/', getServicios);
router.post('/', crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', borrarServicio);

export default router;

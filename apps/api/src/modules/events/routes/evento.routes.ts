import { Router } from 'express';

import {
  getEventos,
  getEvento,
  crearEvento,
  actualizarEvento,
  borrarEvento
} from '../controllers/evento.controller';

const router = Router();

router.get('/', getEventos);
router.get('/:id', getEvento);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', borrarEvento);

export default router;

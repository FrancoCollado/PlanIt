import { Router } from 'express';

import {
  getCategorias,
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
} from '../controllers/categoria.controller';

const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoria);
router.post('/', crearCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', borrarCategoria);

export default router;

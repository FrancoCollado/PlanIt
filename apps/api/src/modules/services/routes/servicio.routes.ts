import { Router } from 'express';

import {
  getServicios,
  buscarServicios,
  buscarServiciosCategoria,
  crearServicio,
  actualizarServicio,
  borrarServicio
} from '../controllers/servicio.controller';

const router = Router();

router.get('/', getServicios);

router.get('/buscar', buscarServicios);

router.get('/categoria/:categoriaId', buscarServiciosCategoria);

router.post('/', crearServicio);

router.put('/:id', actualizarServicio);

router.delete('/:id', borrarServicio);

export default router;

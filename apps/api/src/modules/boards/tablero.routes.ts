import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getOrm } from '../../config/orm';
import { Tablero } from '../../entities/tablero';
import { TableroServicio } from '../../entities/tablero-servicio';
import { Evento } from '../../entities/evento';
import { Servicio } from '../../entities/servicio';
import { User } from '../../entities/usuario';

const router = Router();
type ClientRequest = Request & { clienteId?: number };

router.use((req: ClientRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (!token || !process.env.JWT_SECRET) {
    res.status(401).json({ error: 'Iniciá sesión para gestionar tableros' });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string' || payload.rol !== 'cliente' || !payload.sub || !Number.isSafeInteger(Number(payload.sub))) {
      res.status(403).json({ error: 'Acceso exclusivo para clientes' });
      return;
    }
    req.clienteId = Number(payload.sub);
    next();
  } catch {
    res.status(401).json({ error: 'La sesión expiró. Iniciá sesión nuevamente' });
  }
});

const validId = (value: string) => /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0;
const serialize = (tablero: Tablero, servicios: TableroServicio[] = []) => ({
  id: tablero.id,
  nombre: tablero.nombre,
  evento: tablero.evento ? { id: tablero.evento.id, nombre: tablero.evento.nombre } : null,
  fechaCreacion: tablero.fechaCreacion,
  servicios: servicios.map(({ servicio }) => ({
    id: servicio.id, nombre: servicio.nombre, descripcion: servicio.descripcion,
    imagen: servicio.imagen, categoria: { id: servicio.categoria.id, nombre: servicio.categoria.nombre }
  }))
});

router.get('/', async (req: ClientRequest, res: Response) => {
  try {
    const em = getOrm().em.fork();
    const tableros = await em.find(Tablero, { cliente: req.clienteId! }, { populate: ['evento'], orderBy: { fechaCreacion: 'DESC' } });
    const guardados = await em.find(TableroServicio, { tablero: { cliente: req.clienteId! } }, { populate: ['servicio.categoria'] });
    res.json({ tableros: tableros.map(tablero => serialize(tablero, guardados.filter(item => item.tablero.id === tablero.id))) });
  } catch (error) {
    console.error('Error al listar tableros:', error);
    res.status(500).json({ error: 'Error al obtener los tableros' });
  }
});

router.post('/', async (req: ClientRequest, res: Response) => {
  const { nombre, eventoId } = req.body ?? {};
  if (typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 100 || !validId(String(eventoId))) {
    res.status(400).json({ error: 'Ingresá un nombre (hasta 100 caracteres) y un evento válido' });
    return;
  }
  try {
    const em = getOrm().em.fork();
    const [cliente, evento] = await Promise.all([
      em.findOne(User, { id: req.clienteId!, rol: 'cliente', activo: true }),
      em.findOne(Evento, { id: Number(eventoId), draft: false })
    ]);
    if (!cliente || !evento) {
      res.status(400).json({ error: 'Cliente o evento no disponible' });
      return;
    }
    const tablero = em.create(Tablero, { nombre: nombre.trim(), cliente, evento, fechaCreacion: new Date() });
    await em.persist(tablero).flush();
    res.status(201).json({ tablero: serialize(tablero) });
  } catch (error) {
    console.error('Error al crear tablero:', error);
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
});

router.use('/:id', (req, res, next) => {
  if (!validId(req.params.id as string)) {
    res.status(400).json({ error: 'Tablero inválido' });
    return;
  }
  next();
});

router.get('/:id', async (req: ClientRequest, res: Response) => {
  try {
    const em = getOrm().em.fork();
    const tablero = await em.findOne(Tablero, { id: Number(req.params.id), cliente: req.clienteId! }, { populate: ['evento'] });
    if (!tablero) { res.status(404).json({ error: 'Tablero no encontrado' }); return; }
    const guardados = await em.find(TableroServicio, { tablero: tablero.id }, { populate: ['servicio.categoria'] });
    res.json({ tablero: serialize(tablero, guardados) });
  } catch (error) {
    console.error('Error al obtener tablero:', error);
    res.status(500).json({ error: 'Error al obtener el tablero' });
  }
});

router.put('/:id', async (req: ClientRequest, res: Response) => {
  const { nombre, eventoId } = req.body ?? {};
  if (typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 100 || !validId(String(eventoId))) {
    res.status(400).json({ error: 'Ingresá un nombre (hasta 100 caracteres) y un evento válido' });
    return;
  }
  try {
    const em = getOrm().em.fork();
    const tablero = await em.findOne(Tablero, { id: Number(req.params.id), cliente: req.clienteId! }, { populate: ['evento'] });
    if (!tablero) { res.status(404).json({ error: 'Tablero no encontrado' }); return; }
    const evento = await em.findOne(Evento, { id: Number(eventoId), draft: false });
    if (!evento) { res.status(400).json({ error: 'Evento no disponible' }); return; }
    tablero.nombre = nombre.trim();
    tablero.evento = evento;
    await em.flush();
    const guardados = await em.find(TableroServicio, { tablero: tablero.id }, { populate: ['servicio.categoria'] });
    res.json({ tablero: serialize(tablero, guardados) });
  } catch (error) {
    console.error('Error al editar tablero:', error);
    res.status(500).json({ error: 'Error al editar el tablero' });
  }
});

router.delete('/:id', async (req: ClientRequest, res: Response) => {
  try {
    const em = getOrm().em.fork();
    const tablero = await em.findOne(Tablero, { id: Number(req.params.id), cliente: req.clienteId! });
    if (!tablero) { res.status(404).json({ error: 'Tablero no encontrado' }); return; }
    await em.remove(tablero).flush();
    res.status(204).end();
  } catch (error) {
    console.error('Error al borrar tablero:', error);
    res.status(500).json({ error: 'Error al borrar el tablero' });
  }
});

router.post('/:id/servicios', async (req: ClientRequest, res: Response) => {
  if (!validId(String(req.body?.servicioId))) { res.status(400).json({ error: 'Servicio inválido' }); return; }
  try {
    const em = getOrm().em.fork();
    const tablero = await em.findOne(Tablero, { id: Number(req.params.id), cliente: req.clienteId! });
    if (!tablero) { res.status(404).json({ error: 'Tablero no encontrado' }); return; }
    const servicio = await em.findOne(Servicio, { id: Number(req.body.servicioId), draft: false });
    if (!servicio) { res.status(404).json({ error: 'Servicio no disponible' }); return; }
    const existing = await em.findOne(TableroServicio, { tablero: tablero.id, servicio: servicio.id });
    if (existing) { res.status(409).json({ error: 'El servicio ya está en este tablero' }); return; }
    await em.persist(em.create(TableroServicio, { tablero, servicio, guardadoEn: new Date() })).flush();
    res.status(201).json({ message: 'Servicio agregado al tablero' });
  } catch (error) {
    console.error('Error al guardar servicio:', error);
    res.status(500).json({ error: 'Error al guardar el servicio' });
  }
});

router.delete('/:id/servicios/:servicioId', async (req: ClientRequest, res: Response) => {
  if (!validId(req.params.servicioId as string)) { res.status(400).json({ error: 'Servicio inválido' }); return; }
  try {
    const em = getOrm().em.fork();
    const guardado = await em.findOne(TableroServicio, {
      tablero: { id: Number(req.params.id), cliente: req.clienteId! }, servicio: Number(req.params.servicioId)
    });
    if (!guardado) { res.status(404).json({ error: 'Servicio no encontrado en el tablero' }); return; }
    await em.remove(guardado).flush();
    res.status(204).end();
  } catch (error) {
    console.error('Error al quitar servicio:', error);
    res.status(500).json({ error: 'Error al quitar el servicio' });
  }
});

export default router;
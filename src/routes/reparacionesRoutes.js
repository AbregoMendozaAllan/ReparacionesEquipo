import { vistaCrearReparacion, crearReparacion, cambiarEstado } from '../controllers/reparacionesController.js';
import express from 'express';

const router = express.Router();

// Vista para crear reparaciones
router.get('/crear-reparacion', vistaCrearReparacion);

// Crear una nueva reparación
router.post('/crear-reparacion', crearReparacion);

// Cambiar estado de reparación
router.post('/cambiar-estado/:id_reparacion', cambiarEstado);

export default router;

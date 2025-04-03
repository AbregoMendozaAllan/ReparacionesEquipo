import express from 'express';
import { vistaCrearReparacion, crearReparacion, listarReparaciones } from '../controllers/reparacionesController.js';

const router = express.Router();

// Ruta para mostrar el formulario de creación de reparaciones (crear.ejs)
router.get('/crear', vistaCrearReparacion);

// Ruta para procesar el formulario y crear la reparación
router.post('/crear', crearReparacion);

// Ruta para listar las reparaciones (listado.ejs)
router.get('/listado', listarReparaciones);

export default router;

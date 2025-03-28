import express from 'express';
import {
    mostrarHistorialReparaciones,
    mostrarHistorialReparacionPorId,
    formularioCrearHistorialReparacion,
    crearHistorialReparacionNuevo,
    formularioEditarHistorialReparacion,
    actualizarHistorialReparacion,
    eliminarHistorialReparacion
} from '../controllers/historialReparacionesController.js';

const router = express.Router();

// Rutas para el historial de reparaciones
router.get("/", mostrarHistorialReparaciones);
router.get("/view/:id", mostrarHistorialReparacionPorId);
router.get("/create", formularioCrearHistorialReparacion);
router.post("/create", crearHistorialReparacionNuevo);
router.get("/edit/:id", formularioEditarHistorialReparacion);
router.post("/edit/:id", actualizarHistorialReparacion);
router.get("/delete/:id", eliminarHistorialReparacion);

export default router;

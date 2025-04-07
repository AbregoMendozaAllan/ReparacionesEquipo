import express from "express";
import {
  showCrearReparacion,
  handleCrearReparacion,
  showCambiarEstado,
  handleCambiarEstado,
  formularioReparaciones,
  showEditarReparacion,
  handleEditarReparacion
} from "../controllers/reparacionesController.js";

const router = express.Router();

router.get('/', formularioReparaciones);  // Esta ruta maneja la solicitud GET a /reparaciones/

// Ruta para mostrar formulario de creación de reparación
router.get("/crear", showCrearReparacion);

// Ruta para procesar la creación de una reparación
router.post("/crear", handleCrearReparacion);

// Ruta para técnicos: mostrar reparaciones asignadas para cambiar estado
router.get("/cambiarestado", showCambiarEstado);

// Ruta para procesar cambio de estado
router.post("/cambiarestado", handleCambiarEstado);

// Ruta para listar todas las reparaciones
router.get("/listado", formularioReparaciones);

// Ruta para mostrar el formulario de edición (estado y diagnóstico)
router.get("/edit/:id", showEditarReparacion);

// Ruta para procesar la edición
router.post("/edit/:id", handleEditarReparacion);

export default router;

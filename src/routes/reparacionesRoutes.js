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
import {allowRoles, authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authenticateToken, allowRoles(1, 2), formularioReparaciones);  // Esta ruta maneja la solicitud GET a /reparaciones/

// Ruta para mostrar formulario de creación de reparación
router.get("/crear", authenticateToken, allowRoles(2), showCrearReparacion);

// Ruta para procesar la creación de una reparación
router.post("/crear", authenticateToken, allowRoles(2), handleCrearReparacion);

// Ruta para técnicos: mostrar reparaciones asignadas para cambiar estado
router.get("/cambiarestado", authenticateToken, allowRoles(2), showCambiarEstado);

// Ruta para procesar cambio de estado
router.post("/cambiarestado", authenticateToken, allowRoles(2), handleCambiarEstado);

// Ruta para listar todas las reparaciones
router.get("/listado", authenticateToken, allowRoles(2), formularioReparaciones);

// Ruta para mostrar el formulario de edición (estado y diagnóstico)
router.get("/edit/:id", authenticateToken, allowRoles(2), showEditarReparacion);

// Ruta para procesar la edición
router.post("/edit/:id", authenticateToken, allowRoles(2), handleEditarReparacion);

export default router;

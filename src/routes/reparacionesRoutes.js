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

router.get('/', authenticateToken, allowRoles(1, 2), formularioReparaciones);
router.get("/crear", authenticateToken, allowRoles(2), showCrearReparacion);
router.post("/crear", authenticateToken, allowRoles(2), handleCrearReparacion);
router.get("/cambiarestado", authenticateToken, allowRoles(2), showCambiarEstado);
router.post("/cambiarestado", authenticateToken, allowRoles(2), handleCambiarEstado);
router.get("/listado", authenticateToken, allowRoles(2), formularioReparaciones);
router.get("/edit/:id", authenticateToken, allowRoles(2), showEditarReparacion);
router.post("/edit/:id", authenticateToken, allowRoles(2), handleEditarReparacion);

export default router;

import express from "express";
import * as EquiposController from "../controllers/equiposController.js";
import {allowRoles, authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, allowRoles(1), EquiposController.mostrarEquipos); // Listado de equipos
router.get("/create", authenticateToken, allowRoles(1), EquiposController.formularioCrearEquipo); // Formulario para crear equipo
router.post("/create", authenticateToken, allowRoles(1), EquiposController.crearNuevoEquipo); // Crear nuevo equipo
router.post("/delete/:id", authenticateToken, allowRoles(1), EquiposController.eliminarEquipo); // Eliminar equipo
router.get("/edit/:id", authenticateToken, allowRoles(1), EquiposController.mostrarEquipoPorId); // edit get
router.post("/edit/:id", authenticateToken, allowRoles(1), ); //necesita controlador para confirmar edit

export default router;

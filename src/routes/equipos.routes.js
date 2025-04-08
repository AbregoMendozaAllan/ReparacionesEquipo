import express from "express";
import {
    actualizarEquipo,
    crearNuevoEquipo,
    eliminarEquipo, formularioCrearEquipo, formularioEditarEquipo,
    mostrarEquipoPorId, mostrarEquipos
} from "../controllers/equiposController.js";
import {allowRoles, authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, allowRoles(1, 2), mostrarEquipos); // Listado de equipos
router.get("/create", authenticateToken, allowRoles(1, 2), formularioCrearEquipo); // Formulario para crear equipo
router.post("/create", authenticateToken, allowRoles(1, 2), crearNuevoEquipo); // Crear nuevo equipo
router.get("/:id", authenticateToken, allowRoles(1, 2), mostrarEquipoPorId); // Detalle de un equipo
router.get("/edit/:id", authenticateToken, allowRoles(1, 2), formularioEditarEquipo); // Formulario para editar equipo
router.post("/edit/:id", authenticateToken, allowRoles(1, 2), actualizarEquipo); // Actualizar equipo
router.post("/delete/:id", authenticateToken, allowRoles(1, 2), eliminarEquipo); // Eliminar equipo

export default router;

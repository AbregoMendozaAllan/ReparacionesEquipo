import express from "express";
import * as EquiposController from "../controllers/equiposController.js";

const router = express.Router();

router.get("/", EquiposController.mostrarEquipos); // Listado de equipos
router.get("/create", EquiposController.formularioCrearEquipo); // Formulario para crear equipo
router.post("/create", EquiposController.crearNuevoEquipo); // Crear nuevo equipo
router.get("/edit/:id", EquiposController.formularioEditarEquipo); // Formulario para editar equipo
router.post("/edit/:id", EquiposController.actualizarEquipo); // Actualizar equipo
router.post("/delete/:id", EquiposController.eliminarEquipo); // Eliminar equipo

export default router;

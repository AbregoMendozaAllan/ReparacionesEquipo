import express from "express";
import * as EquiposController from "../controllers/equiposController.js";

const router = express.Router();

router.get("/", EquiposController.mostrarEquipos); // Listado de equipos
router.get("/create", EquiposController.formularioCrearEquipo); // Formulario para crear equipo
router.post("/create", EquiposController.crearNuevoEquipo); // Crear nuevo equipo
router.post("/delete/:id", EquiposController.eliminarEquipo); // Eliminar equipo

export default router;

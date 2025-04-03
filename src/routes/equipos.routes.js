import express from "express";
import * as EquiposController from "../controllers/equiposController.js";
import {mostrarEquipoPorId} from "../controllers/equiposController.js";

const router = express.Router();

router.get("/", EquiposController.mostrarEquipos); // Listado de equipos
router.get("/create", EquiposController.formularioCrearEquipo); // Formulario para crear equipo
router.post("/create", EquiposController.crearNuevoEquipo); // Crear nuevo equipo
router.post("/delete/:id", EquiposController.eliminarEquipo); // Eliminar equipo
router.get("/edit/:id", EquiposController.mostrarEquipoPorId); // edit get
router.post("/edit/:id"); //necesita controlador para confirmar edit

export default router;

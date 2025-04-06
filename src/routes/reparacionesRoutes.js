import express from "express";
import {
    showCrearReparacion,
    handleCrearReparacion,
    showCambiarEstado,
    handleCambiarEstado, formularioReparaciones
} from "../controllers/reparacionesController.js";

const router = express.Router();

router.get('/', formularioReparaciones)

// Ruta para mostrar el formulario de creación de reparación
router.get("/crear", showCrearReparacion);

// Ruta para crear una nueva reparación
router.post("/crear", handleCrearReparacion);

// Ruta para mostrar el formulario de cambiar estado
router.get("/cambiarestado", showCambiarEstado);

// Ruta para cambiar el estado de la reparación
router.post("/cambiarestado", handleCambiarEstado);

router.get("/edit/:id");
router.post("/edit/:id");

export default router;
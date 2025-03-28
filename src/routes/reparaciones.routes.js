import express from "express";
import * as ReparacionesController from "../controllers/reparacionesController.js";

const router = express.Router();

router.get("/", ReparacionesController.mostrarReparaciones);
router.get("/create", ReparacionesController.formularioCrearReparacion);
router.post("/create", ReparacionesController.crearNuevaReparacion);
router.get("/edit/:id", ReparacionesController.formularioEditarReparacion);
router.post("/edit/:id", ReparacionesController.actualizarReparacion);
router.post("/delete/:id", ReparacionesController.eliminarReparacion);

export default router;

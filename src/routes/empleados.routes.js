import express from "express";
import * as EmpleadosController from "../controllers/empleadosController.js";

const router = express.Router();

router.get("/", EmpleadosController.mostrarEmpleados);
router.get("/create", EmpleadosController.formularioCrearEmpleado);
router.post("/create", EmpleadosController.crearNuevoEmpleado);
router.get("/edit/:id", EmpleadosController.formularioEditarEmpleado);
router.post("/edit/:id", EmpleadosController.actualizarEmpleado);
router.post("/delete/:id", EmpleadosController.eliminarEmpleado);

export default router;

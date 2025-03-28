import express from "express";
import * as ClientesController from "../controllers/clientesController.js";

const router = express.Router();


router.get("/", ClientesController.mostrarClientes);  

router.get("/create", ClientesController.formularioCrearCliente);
router.post("/create", ClientesController.crearNuevoCliente);
router.get("/edit/:id", ClientesController.formularioEditarCliente);
router.post("/edit/:id", ClientesController.actualizarCliente);
router.post("/delete/:id", ClientesController.eliminarCliente);

export default router;

import express from 'express';
import {
    mostrarInventarios,
    mostrarInventarioPorId,
    formularioCrearInventario,
    crearInventarioNuevo,
    formularioEditarInventario,
    actualizarInventario,
    eliminarInventario
} from '../controllers/inventariosController.js';

const router = express.Router();

// Rutas de inventarios
router.get("/", mostrarInventarios);
router.get("/view/:id", mostrarInventarioPorId);
router.get("/create", formularioCrearInventario);
router.post("/create", crearInventarioNuevo);
router.get("/edit/:id", formularioEditarInventario);
router.post("/edit/:id", actualizarInventario);
router.get("/delete/:id", eliminarInventario);

export default router;

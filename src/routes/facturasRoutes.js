import express from 'express';
import {
    mostrarFacturas,
    mostrarFacturaPorId,
    formularioCrearFactura,
    crearFacturaNueva,
    formularioEditarFactura,
    actualizarFactura,
    eliminarFactura
} from '../controllers/facturasController.js';

const router = express.Router();

// Rutas de facturas
router.get("/", mostrarFacturas);
router.get("/view/:id", mostrarFacturaPorId);
router.get("/create", formularioCrearFactura);
router.post("/create", crearFacturaNueva);
router.get("/edit/:id", formularioEditarFactura);
router.post("/edit/:id", actualizarFactura);
router.get("/delete/:id", eliminarFactura);

export default router;

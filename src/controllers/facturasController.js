import { getAllFacturas, getFacturaById, createFactura, updateFactura, deleteFactura } from "../dao/facturasDao.js";

// Mostrar todas las facturas
export const mostrarFacturas = async (req, res) => {
    try {
        const facturas = await getAllFacturas();
        res.render("facturas/facturas-listado", { facturas });
    } catch (error) {
        console.error("Error al obtener las facturas:", error);
        res.status(500).send("Error al obtener las facturas");
    }
};

// Mostrar factura por ID
export const mostrarFacturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const factura = await getFacturaById(id);
        if (!factura) {
            return res.status(404).send("Factura no encontrada");
        }
        res.render("facturas/facturas-detalle", { factura });
    } catch (error) {
        console.error("Error al obtener la factura:", error);
        res.status(500).send("Error al obtener la factura");
    }
};

// Mostrar formulario para crear factura
export const formularioCrearFactura = (req, res) => {
    res.render("facturas/facturas-crear");
};

// Crear nueva factura
export const crearFacturaNueva = async (req, res) => {
    try {
        const { id_cliente, id_empleado, fecha_emision, total, estado } = req.body;
        await createFactura(id_cliente, id_empleado, fecha_emision, total, estado);
        res.redirect("/facturas");
    } catch (error) {
        console.error("Error al crear factura:", error);
        res.status(500).send("Error al crear factura");
    }
};

// Mostrar formulario para editar factura
export const formularioEditarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const factura = await getFacturaById(id);
        if (!factura) {
            return res.status(404).send("Factura no encontrada");
        }
        res.render("facturas/facturas-editar", { factura });
    } catch (error) {
        console.error("Error al obtener factura para editar:", error);
        res.status(500).send("Error al obtener factura para editar");
    }
};

// Actualizar factura
export const actualizarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cliente, id_empleado, fecha_emision, total, estado } = req.body;
        await updateFactura(id, id_cliente, id_empleado, fecha_emision, total, estado);
        res.redirect("/facturas");
    } catch (error) {
        console.error("Error al actualizar factura:", error);
        res.status(500).send("Error al actualizar factura");
    }
};

// Eliminar factura
export const eliminarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteFactura(id);
        res.redirect("/facturas");
    } catch (error) {
        console.error("Error al eliminar factura:", error);
        res.status(500).send("Error al eliminar factura");
    }
};

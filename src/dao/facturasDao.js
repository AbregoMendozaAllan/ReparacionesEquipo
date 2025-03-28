import { executeQuery } from "../config/db.js";

// Obtener todas las facturas
export const getAllFacturas = async () => {
    const query = 'SELECT * FROM facturas';
    return await executeQuery(query, []);
};

// Obtener factura por ID
export const getFacturaById = async (id) => {
    const query = 'SELECT * FROM facturas WHERE id_factura = ?';
    return await executeQuery(query, [id]);
};

// Crear nueva factura
export const createFactura = async (id_cliente, id_empleado, fecha_emision, total, estado) => {
    const query = 'INSERT INTO facturas (id_cliente, id_empleado, fecha_emision, total, estado) VALUES (?, ?, ?, ?, ?)';
    return await executeQuery(query, [id_cliente, id_empleado, fecha_emision, total, estado]);
};

// Actualizar factura
export const updateFactura = async (id, id_cliente, id_empleado, fecha_emision, total, estado) => {
    const query = 'UPDATE facturas SET id_cliente = ?, id_empleado = ?, fecha_emision = ?, total = ?, estado = ? WHERE id_factura = ?';
    return await executeQuery(query, [id_cliente, id_empleado, fecha_emision, total, estado, id]);
};

// Eliminar factura
export const deleteFactura = async (id) => {
    const query = 'DELETE FROM facturas WHERE id_factura = ?';
    return await executeQuery(query, [id]);
};

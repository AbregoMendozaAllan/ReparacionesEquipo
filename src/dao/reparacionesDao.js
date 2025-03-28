import { executeQuery } from "../config/db.js";

// Obtener todas las reparaciones
export const getAllReparaciones = async () => {
    const query = 'SELECT * FROM reparaciones';
    return await executeQuery(query, []);
};

// Obtener reparación por ID
export const getReparacionById = async (id) => {
    const query = 'SELECT * FROM reparaciones WHERE id = ?';
    return await executeQuery(query, [id]);
};

// Crear nueva reparación
export const createReparacion = async (descripcion, fecha, idCliente, idEquipo) => {
    const query = 'INSERT INTO reparaciones (descripcion, fecha, id_cliente, id_equipo) VALUES (?, ?, ?, ?)';
    return await executeQuery(query, [descripcion, fecha, idCliente, idEquipo]);
};

// Actualizar reparación
export const updateReparacion = async (id, descripcion, fecha, idCliente, idEquipo) => {
    const query = 'UPDATE reparaciones SET descripcion = ?, fecha = ?, id_cliente = ?, id_equipo = ? WHERE id = ?';
    return await executeQuery(query, [descripcion, fecha, idCliente, idEquipo, id]);
};

// Eliminar reparación
export const deleteReparacion = async (id) => {
    const query = 'DELETE FROM reparaciones WHERE id = ?';
    return await executeQuery(query, [id]);
};

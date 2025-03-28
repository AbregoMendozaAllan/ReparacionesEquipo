import { executeQuery } from "../config/db.js";

// Obtener todos los registros de historial de reparaciones
export const getAllHistorialReparaciones = async () => {
    const query = 'SELECT * FROM historial_reparaciones';
    return await executeQuery(query, []);
};

// Obtener historial de reparación por ID
export const getHistorialReparacionById = async (id) => {
    const query = 'SELECT * FROM historial_reparaciones WHERE id_historial = ?';
    return await executeQuery(query, [id]);
};

// Crear nuevo registro de historial de reparación
export const createHistorialReparacion = async (id_reparacion, descripcion, fecha) => {
    const query = 'INSERT INTO historial_reparaciones (id_reparacion, descripcion, fecha) VALUES (?, ?, ?)';
    return await executeQuery(query, [id_reparacion, descripcion, fecha]);
};

// Actualizar registro de historial de reparación
export const updateHistorialReparacion = async (id, descripcion, fecha) => {
    const query = 'UPDATE historial_reparaciones SET descripcion = ?, fecha = ? WHERE id_historial = ?';
    return await executeQuery(query, [descripcion, fecha, id]);
};

// Eliminar registro de historial de reparación
export const deleteHistorialReparacion = async (id) => {
    const query = 'DELETE FROM historial_reparaciones WHERE id_historial = ?';
    return await executeQuery(query, [id]);
};

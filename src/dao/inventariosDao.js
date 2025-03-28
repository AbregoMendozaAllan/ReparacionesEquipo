import { executeQuery } from "../config/db.js";

// Obtener todos los productos en el inventario
export const getAllInventarios = async () => {
    const query = 'SELECT * FROM inventarios';
    return await executeQuery(query, []);
};

// Obtener producto por ID
export const getInventarioById = async (id) => {
    const query = 'SELECT * FROM inventarios WHERE id_inventario = ?';
    return await executeQuery(query, [id]);
};

// Crear nuevo producto en el inventario
export const createInventario = async (id_producto, cantidad, precio_unitario, fecha_ingreso) => {
    const query = 'INSERT INTO inventarios (id_producto, cantidad, precio_unitario, fecha_ingreso) VALUES (?, ?, ?, ?)';
    return await executeQuery(query, [id_producto, cantidad, precio_unitario, fecha_ingreso]);
};

// Actualizar inventario
export const updateInventario = async (id, cantidad, precio_unitario, fecha_ingreso) => {
    const query = 'UPDATE inventarios SET cantidad = ?, precio_unitario = ?, fecha_ingreso = ? WHERE id_inventario = ?';
    return await executeQuery(query, [cantidad, precio_unitario, fecha_ingreso, id]);
};

// Eliminar producto del inventario
export const deleteInventario = async (id) => {
    const query = 'DELETE FROM inventarios WHERE id_inventario = ?';
    return await executeQuery(query, [id]);
};

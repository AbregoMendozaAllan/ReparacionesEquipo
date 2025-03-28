import { executeQuery } from "../config/db.js";

export const getAllClientes = async () => {
    const query = "SELECT * FROM clientes";
    return await executeQuery(query, []);
};

export const getClienteById = async (id) => {
    const query = "SELECT * FROM clientes WHERE id_cliente = ?";
    const result = await executeQuery(query, [id]);
    return result[0]; // Solo un cliente
};

export const createCliente = async (nombre, direccion, telefono, correo) => {
    const query = `
        INSERT INTO clientes (nombre, direccion, telefono, correo)
        VALUES (?, ?, ?, ?)
    `;
    return await executeQuery(query, [nombre, direccion, telefono, correo]);
};

export const updateCliente = async (id, nombre, direccion, telefono, correo) => {
    const query = `
        UPDATE clientes 
        SET nombre = ?, direccion = ?, telefono = ?, correo = ?
        WHERE id_cliente = ?
    `;
    return await executeQuery(query, [nombre, direccion, telefono, correo, id]);
};

export const deleteCliente = async (id) => {
    const query = "DELETE FROM clientes WHERE id_cliente = ?";
    return await executeQuery(query, [id]);
};

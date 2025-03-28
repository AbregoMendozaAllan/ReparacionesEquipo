import { executeQuery } from "../config/db.js";

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
    const query = 'SELECT * FROM usuarios';
    return await executeQuery(query, []);
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    return await executeQuery(query, [id]);
};

// Crear nuevo usuario
export const createUsuario = async (nombre, email, telefono, rol) => {
    const query = 'INSERT INTO usuarios (nombre, email, telefono, rol) VALUES (?, ?, ?, ?)';
    return await executeQuery(query, [nombre, email, telefono, rol]);
};

// Actualizar usuario
export const updateUsuario = async (id, nombre, email, telefono, rol) => {
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, rol = ? WHERE id_usuario = ?';
    return await executeQuery(query, [nombre, email, telefono, rol, id]);
};

// Eliminar usuario
export const deleteUsuario = async (id) => {
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    return await executeQuery(query, [id]);
};

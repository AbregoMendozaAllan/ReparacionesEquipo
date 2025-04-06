import { executeQuery } from "../config/db.js";

// Obtener Todos los Equipos
export const getAllEquipos = async () => {
    const query = `
        SELECT *
        FROM equipos;
    `;
    return await executeQuery(query);
};


// Obtener un equipo por su ID
export const getEquipoById = async (id) => {
  const query = "SELECT * FROM equipos WHERE id_equipo = ?";
  return await executeQuery(query, [id]);
};

// Obtener un equipo por su ID de usuario asignado
export const getEquipoByUsuarioAsignadoId = async (id) => {
  const query = "SELECT id_equipo, tipo, modelo, serie FROM equipos WHERE id_usuario_asignado = ?";
  return await executeQuery(query, [id]);
};

// Crear un nuevo equipo
export const createEquipo = async (tipo, marca, modelo, serie, estado, usuarioId) => {
  const query = "INSERT INTO equipos (tipo, marca, modelo, serie, estado, id_usuario_asignado) VALUES (?, ?, ?, ?, ?, ?)";
  return await executeQuery(query, [tipo, marca, modelo, serie, estado, usuarioId]);
};

export const createEquipoSinUsuarioId = async (tipo, marca, modelo, serie, estado) => {
    const query = "INSERT INTO equipos (tipo, marca, modelo, serie, estado) VALUES (?, ?, ?, ?, ?)";
    return await executeQuery(query, [tipo, marca, modelo, serie, estado]);
};

// Actualizar un equipo existente
export const updateEquipo = async (id, tipo, marca, modelo, serie, estado, usuarioId) => {
  const query = "UPDATE equipos SET tipo = ?, marca = ?, modelo = ?, serie = ?, estado = ?, id_usuario_asignado = ? WHERE id_equipo = ?";
  return await executeQuery(query, [tipo, marca, modelo, serie, estado, usuarioId, id]);
};

// Eliminar un equipo
export const deleteEquipo = async (id) => {
  const query = "DELETE FROM equipos WHERE id_equipo = ?";
  return await executeQuery(query, [id]);
};
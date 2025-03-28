import { executeQuery } from "../config/db.js";

// Obtener todos los equipos
export const getAllEquipos = async () => {
  const query = "SELECT * FROM equipos";
  return await executeQuery(query);
};

// Obtener un equipo por su ID
export const getEquipoById = async (id) => {
  const query = "SELECT * FROM equipos WHERE id_equipo = ?";
  return await executeQuery(query, [id]);
};

// Crear un nuevo equipo
export const createEquipo = async (nombre, descripcion, fecha_creacion) => {
  const query = "INSERT INTO equipos (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)";
  return await executeQuery(query, [nombre, descripcion, fecha_creacion]);
};

// Actualizar un equipo
export const updateEquipo = async (id, nombre, descripcion, fecha_creacion) => {
  const query = "UPDATE equipos SET nombre = ?, descripcion = ?, fecha_creacion = ? WHERE id_equipo = ?";
  return await executeQuery(query, [nombre, descripcion, fecha_creacion, id]);
};

// Eliminar un equipo
export const deleteEquipo = async (id) => {
  const query = "DELETE FROM equipos WHERE id_equipo = ?";
  return await executeQuery(query, [id]);
};

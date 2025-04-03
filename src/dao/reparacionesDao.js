import { executeQuery } from "../config/db.js";

// Obtener lista de técnicos (solo usuarios con rol técnico)
export const obtenerTecnicos = async () => {
    const query = "SELECT id_usuario, nombre FROM usuarios WHERE id_rol = 2";
    return await executeQuery(query);
};

// Obtener lista de equipos disponibles
export const obtenerEquipos = async () => {
    const query = "SELECT id_equipo, equipo FROM equipos";  // Cambio aquí para usar 'equipo' en lugar de 'nombre'
    return await executeQuery(query);
};

// Obtener lista de solicitudes activas
export const obtenerSolicitudesSoporte = async () => {  // Asegúrate de que esta función esté exportada correctamente
    const query = "SELECT id_solicitud, descripcion_problema FROM SolicitudesSoporte WHERE estado = 'Pendiente'"; // Cambio a la tabla correcta
    return await executeQuery(query);
};

// Crear una reparación con estado inicial 'En espera' y fecha automática
export const crearReparacion = async (id_equipo, id_solicitud, id_tecnico_asignado) => {
    const query = `
        INSERT INTO reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado)
        VALUES (?, ?, ?, NOW(), 'En espera');
    `;
    return await executeQuery(query, [id_equipo, id_solicitud, id_tecnico_asignado]);
};

// Obtener todas las reparaciones
export const obtenerReparaciones = async () => {
    const query = `
        SELECT r.id_reparacion, e.equipo AS equipo, s.descripcion_problema AS solicitud, u.nombre AS tecnico, r.estado, r.fecha_reporte, r.fecha_finalizacion
        FROM reparaciones r
        JOIN equipos e ON r.id_equipo = e.id_equipo
        JOIN SolicitudesSoporte s ON r.id_solicitud = s.id_solicitud
        JOIN usuarios u ON r.id_tecnico_asignado = u.id_usuario
    `;
    return await executeQuery(query);
};

// Actualizar el estado de una reparación y registrar fecha de finalización si se cambia a 'Reparado' o 'Descartado'
export const actualizarEstadoReparacion = async (id_reparacion, nuevoEstado) => {
    let query;
    let params;

    if (nuevoEstado === 'Reparado' || nuevoEstado === 'Descartado') {
        query = "UPDATE reparaciones SET estado = ?, fecha_finalizacion = NOW() WHERE id_reparacion = ?";
        params = [nuevoEstado, id_reparacion];
    } else {
        query = "UPDATE reparaciones SET estado = ? WHERE id_reparacion = ?";
        params = [nuevoEstado, id_reparacion];
    }

    return await executeQuery(query, params);
};

export const ReparacionDAO = {
    obtenerTecnicos,
    obtenerEquipos,
    obtenerSolicitudesSoporte,  // Asegúrate de que esta función está exportada correctamente
    crearReparacion,
    obtenerReparaciones,
    actualizarEstadoReparacion
};

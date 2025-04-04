import {executeQuery} from "../config/db.js";

export const createSolicitud = async (usuarioId, equipoId, problema, estadoSolicitud) => {
    const query = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
    await executeQuery(query, [usuarioId, equipoId, problema, estadoSolicitud]);
};

export const getAllSolicitudesByUsuarioId = async (usuarioId) => {
    const query = `
        SELECT CONCAT(e.tipo, ' ', e.marca, ' ', e.modelo, ' ', e.serie) AS equipo, s.descripcion_problema, s.fecha_solicitud, s.estado FROM solicitudessoporte s
            INNER JOIN equipos e ON e.id_equipo = s.id_equipo
        WHERE id_usuario_solicitante = ?;
        `;
    return await executeQuery(query, [usuarioId]);
};

export const getRecentSolicitudesByUsuarioId = async (usuarioId) => {
    const query = `
        SELECT
            CONCAT(e.tipo, ' ', e.marca, ' ', e.modelo, ' ', e.serie) AS equipo,
            s.descripcion_problema,
            s.fecha_solicitud,
            s.estado
        FROM solicitudessoporte s
                 INNER JOIN equipos e ON e.id_equipo = s.id_equipo
        WHERE s.id_usuario_solicitante = ?
        ORDER BY s.fecha_solicitud DESC
        LIMIT 3;
    `;
    return await executeQuery(query, [usuarioId]);
};

export const getSolicitudesTerminadasByUsuarioId = async (usuarioId) => {
    const query = `
        SELECT
            CONCAT(e.tipo, ' ', e.marca, ' ', e.modelo, ' ', e.serie) AS equipo,
            s.descripcion_problema,
            s.fecha_solicitud,
            s.estado
        FROM solicitudessoporte s
                 INNER JOIN equipos e ON e.id_equipo = s.id_equipo
        WHERE s.id_usuario_solicitante = ?
          AND (s.estado = 'Resuelto' OR s.estado = 'Cancelado')
        ORDER BY s.fecha_solicitud DESC;
    `;
    return await executeQuery(query, [usuarioId]);
};
// dao/soporteDao.js
import { executeQuery } from "../config/db.js";

export const createSolicitud = async (usuarioId, equipoId, problema, estadoSolicitud) => {
    const query = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
    await executeQuery(query, [usuarioId, equipoId, problema, estadoSolicitud]);
};

export const getAllSolicitudesByUsuarioId = async (usuarioId) => {
    const query = `
        SELECT CONCAT(e.tipo, ' ', e.marca, ' ', e.modelo, ' ', e.serie) AS equipo, s.descripcion_problema, s.fecha_solicitud, s.estado
        FROM solicitudessoporte s
        INNER JOIN equipos e ON e.id_equipo = s.id_equipo
        WHERE s.id_usuario_solicitante = ?;
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

export const getSolicitudesActivas = async () => {
    const query = `
        SELECT id_solicitud, descripcion_problema
        FROM solicitudessoporte
        WHERE estado = 'Pendiente';
    `;
    return await executeQuery(query);
};

export const getSolicitudConSolicitantePorId = async (idSolicitud) => {
    const query = `
        SELECT s.descripcion_problema,
               s.fecha_solicitud,
               u.nombre AS solicitante,
               u.telefono AS telefono,
               s.id_usuario_solicitante
        FROM solicitudessoporte s
        INNER JOIN usuarios u ON u.id_usuario = s.id_usuario_solicitante
        WHERE s.id_solicitud = ?
    `;
    const resultados = await executeQuery(query, [idSolicitud]);
    return resultados[0];
};

export const createSoporteConAsignacion = async (usuarioId, equipoId, problema, estadoSolicitud, idTecnicoAsignado) => {
    try {
        await executeQuery("START TRANSACTION;", []);

        const solicitudQuery = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
        const solicitudResult = await executeQuery(solicitudQuery, [usuarioId, equipoId, problema, estadoSolicitud]);
        const solicitudId = solicitudResult.insertId;

        const reparacionQuery = `
            INSERT INTO reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado)
            VALUES (?, ?, ?, NOW(), 'En espera')
        `;
        await executeQuery(reparacionQuery, [equipoId, solicitudId, idTecnicoAsignado]);

        await executeQuery("COMMIT;", []);
    } catch (error) {
        await executeQuery("ROLLBACK;", []);
        throw error;
    }
};
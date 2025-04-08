import { executeQuery } from "../config/db.js";

export const crearReparacion = async (idEquipo, idSolicitud, idTecnicoAsignado) => {
    const query = `
        INSERT INTO reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado)
        VALUES (?, ?, ?, NOW(), 'En espera')
    `;
    return await executeQuery(query, [idEquipo, idSolicitud, idTecnicoAsignado]);
};

export const actualizarEstadoReparacion = async (idReparacion, nuevoEstado) => {
    let query;
    let params;

    if (nuevoEstado === 'Reparado' || nuevoEstado === 'Descartado') {
        query = `
            UPDATE reparaciones
            SET estado = ?, fecha_finalizacion = NOW()
            WHERE id_reparacion = ?
        `;
        params = [nuevoEstado, idReparacion];
    } else {
        query = `
            UPDATE reparaciones
            SET estado = ?
            WHERE id_reparacion = ?
        `;
        params = [nuevoEstado, idReparacion];
    }

    return await executeQuery(query, params);
};


export const obtenerReparacionesPorTecnico = async (idTecnico) => {
    const query = `
        SELECT r.id_reparacion, r.estado, e.id_equipo, s.descripcion_problema, s.fecha_solicitud, u.nombre AS 'solicitante', u.telefono, 
               t.nombre AS 'tecnico', CONCAT(e.marca, '-', e.modelo, '-', e.serie) AS equipo, r.fecha_reporte
        FROM reparaciones r
        INNER JOIN equipos e ON e.id_equipo = r.id_equipo
        INNER JOIN solicitudessoporte s ON s.id_solicitud = r.id_solicitud
        INNER JOIN usuarios u ON u.id_usuario = s.id_usuario_solicitante
        INNER JOIN usuarios t ON t.id_usuario = r.id_tecnico_asignado
        WHERE r.id_tecnico_asignado = ?
    `;
    return await executeQuery(query, [idTecnico]);
};

export const getAllReparaciones = async () => {
    const query = `
        SELECT r.id_reparacion, r.id_tecnico_asignado, r.fecha_reporte, r.fecha_inicio_reparacion,
               r.fecha_finalizacion, r.diagnostico, r.estado AS 'estado_reparacion', CONCAT(e.marca,'-',e.modelo,'-',e.serie) AS 'equipo',
               s.descripcion_problema, s.fecha_solicitud, s.estado AS 'estado_solicitud', u.nombre AS 'tecnico', us.nombre AS 'solicitante',
               us.telefono
        FROM reparaciones r
        INNER JOIN equipos e ON e.id_equipo = r.id_equipo
        INNER JOIN solicitudessoporte s ON s.id_solicitud = r.id_solicitud
        INNER JOIN usuarios u ON u.id_usuario = r.id_tecnico_asignado
        INNER JOIN usuarios us ON us.id_usuario = s.id_usuario_solicitante
    `;
    return await executeQuery(query);
};

export const getTecnicosDisponibles = async () => {
    const query = `
        SELECT u.id_usuario AS id_tecnico, u.nombre, MAX(r.fecha_finalizacion) AS fecha_finalizacion
        FROM usuarios u
        LEFT JOIN reparaciones r ON u.id_usuario = r.id_tecnico_asignado
        WHERE u.id_rol = 2
        GROUP BY u.id_usuario
        ORDER BY IFNULL(r.fecha_finalizacion, '0000-00-00') DESC
    `;
    const tecnicos = await executeQuery(query);
    let technician = tecnicos[0];

    tecnicos.forEach(tecnico => {
        if (tecnico.fecha_finalizacion === null || (technician.fecha_finalizacion && new Date(tecnico.fecha_finalizacion) < new Date(technician.fecha_finalizacion))) {
            technician = tecnico;
        }
    });

    return technician;
};

export const insertBitacoraReparaciones = async (reparacionId, estado, tecnicoId) => {
    const query = `
        INSERT INTO bitacora_reparaciones (id_reparacion, fecha, accion, usuario_responsable) VALUES (?, now(), ?, ?)
    `;
    await executeQuery(query, [reparacionId, estado, tecnicoId]);
};

export const getReparacionPorId = async (idReparacion) => {
    const query = `
        SELECT *
        FROM reparaciones
        WHERE id_reparacion = ?
    `;
    const resultados = await executeQuery(query, [idReparacion]);
    return resultados[0];
};

export const actualizarReparacionConDiagnostico = async (
    id,
    id_tecnico_asignado,
    fecha_inicio_reparacion,
    fecha_finalizacion,
    diagnostico,
    estado
) => {
    const query = `
        UPDATE reparaciones
        SET
            id_tecnico_asignado = ?,
            fecha_inicio_reparacion = ?,
            fecha_finalizacion = ?,
            diagnostico = ?,
            estado = ?
        WHERE id_reparacion = ?
    `;
    return await executeQuery(query, [
        id_tecnico_asignado,
        fecha_inicio_reparacion,
        fecha_finalizacion,
        diagnostico,
        estado,
        id
    ]);
};
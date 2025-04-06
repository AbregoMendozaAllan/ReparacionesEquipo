import { executeQuery } from "../config/db.js";

// Crear una nueva reparación
export const crearReparacion = async (idEquipo, idSolicitud, idTecnicoAsignado) => {
    const query = `
        INSERT INTO reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado)
        VALUES (?, ?, ?, NOW(), 'En espera')
    `;
    return await executeQuery(query, [idEquipo, idSolicitud, idTecnicoAsignado]);
};

// Actualizar el estado de una reparación
export const actualizarEstadoReparacion = async (idReparacion, nuevoEstado) => {
    let fechaFinalizacion = null;
    if (nuevoEstado === 'Reparado' || nuevoEstado === 'Descartado') {
        fechaFinalizacion = 'NOW()'; // Si el estado es 'Reparado' o 'Descartado', se asigna la fecha de finalización
    }

    const query = `
        UPDATE reparaciones
        SET estado = ?, fecha_finalizacion = ${fechaFinalizacion}
        WHERE id_reparacion = ?
    `;
    return await executeQuery(query, [nuevoEstado, idReparacion]);
};

// Obtener reparaciones asignadas a un técnico
export const obtenerReparacionesPorTecnico = async (idTecnico) => {
    const query = `
        SELECT id_reparacion, id_equipo, estado FROM reparaciones WHERE id_tecnico_asignado = ?
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
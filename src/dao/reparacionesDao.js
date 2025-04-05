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

import { executeQuery } from "../config/db.js";

// Crear una nueva solicitud
export const createSolicitud = async (usuarioId, equipoId, problema, estadoSolicitud) => {
    const insertLoginQuery = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
    await executeQuery(insertLoginQuery, [usuarioId, equipoId, problema, estadoSolicitud]);
};

// Obtener lista de solicitudes activas (solo id_solicitud y descripcion_problema)
export const getSolicitudesActivas = async () => {
    const query = `
        SELECT s.id_solicitud, s.descripcion_problema
        FROM solicitudessoporte s
        WHERE s.estado = 'Pendiente';  -- Puedes cambiar el estado si es necesario
    `;
    return await executeQuery(query);
};

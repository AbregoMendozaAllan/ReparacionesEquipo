import {executeQuery} from "../config/db.js";

export const createSolicitud = async (usuarioId, equipoId, problema, estadoSolicitud) => {
    const insertLoginQuery = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
    await executeQuery(insertLoginQuery, [usuarioId, equipoId, problema, estadoSolicitud]);
};
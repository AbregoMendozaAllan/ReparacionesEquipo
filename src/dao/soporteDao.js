import {executeQuery} from "../config/db.js";

export const createEquipo = async (equipo, tipo, marca, modelo, serie, estado) => {
    const query = `INSERT INTO equipos (equipo, tipo, marca, modelo, serie, estado) VALUES (?, ?, ?, ?, ?, ?)`;
    await executeQuery(query, [equipo, tipo, marca, modelo, serie, estado]);
};

export const createEquipoAndSolicitud = async (equipo, tipo, marca, modelo, serie, estadoEquipo, usuarioAsignadoID, problema, estadoSolicitud) => {
    try {

        await executeQuery("START TRANSACTION;", []);

        const insertUserQuery = "INSERT INTO equipos (equipo, tipo, marca, modelo, serie, estado, id_usuario_asignado) VALUES (?, ?, ?, ?, ?, ?, ?);";
        const userResult = await executeQuery(insertUserQuery, [equipo, tipo, marca, modelo, serie, estadoEquipo, usuarioAsignadoID]);

        const equipoId = userResult.insertId;

        const insertLoginQuery = "INSERT INTO solicitudessoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES (?, ?, ?, NOW(), ?);";
        await executeQuery(insertLoginQuery, [usuarioAsignadoID, equipoId, problema, estadoSolicitud]);

        await executeQuery("COMMIT;", []);
    } catch (error) {
        await executeQuery("ROLLBACK;", []);
        throw error;
    }
};
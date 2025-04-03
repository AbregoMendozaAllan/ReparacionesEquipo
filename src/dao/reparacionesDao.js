import { executeQuery } from "../config/db.js";

// Función para verificar si un usuario es técnico
export const verificarTecnico = async (usuarioId) => {
    const query = `
        SELECT u.id_rol
        FROM usuarios u
        WHERE u.id_usuario = ?
    `;
    const result = await executeQuery(query, [usuarioId]);
    return result.length > 0 && result[0].id_rol === 2;  
};

// Función para crear una reparación
export const crearReparacion = async (id_equipo, id_solicitud, id_tecnico_asignado) => {
    const esTecnico = await verificarTecnico(id_tecnico_asignado);
    if (!esTecnico) {
        throw new Error("El usuario asignado no es un técnico.");
    }

    try {
        await executeQuery("START TRANSACTION;", []);

        const query = `
            INSERT INTO Reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado)
            VALUES (?, ?, ?, NOW(), 'En espera');
        `;
        await executeQuery(query, [id_equipo, id_solicitud, id_tecnico_asignado]);

        await executeQuery("COMMIT;", []);
    } catch (error) {
        await executeQuery("ROLLBACK;", []);
        throw error;
    }
};

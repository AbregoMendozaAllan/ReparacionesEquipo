import {executeQuery} from "../config/db.js";

export const getLoginStats = async () => {
    const query = `
        SELECT status, COUNT(*) as total
        FROM bitacora_login
        GROUP BY status;
    `;
    return await executeQuery(query);
};

export const getReparacionEstadoStats  = async () => {
    const query = `
        SELECT estado, COUNT(*) as total
        FROM reparaciones
        GROUP BY estado;
    `;
    return await executeQuery(query);
};

export const getEquipoTipoStats   = async () => {
    const query = `
        SELECT tipo, COUNT(*) as total
        FROM equipos
        GROUP BY tipo;
    `;
    return await executeQuery(query);
};
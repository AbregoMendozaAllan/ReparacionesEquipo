import {executeQuery} from "../config/db.js";

export const getUsernameByUsername = async (username) => {
    const query =  'SELECT username FROM login WHERE username = ?';
    return await executeQuery(query, username);
}

export const getPasswordHashByUsername = async (username) => {
    const query =  'SELECT password_hash FROM login WHERE username = ?';
    return await executeQuery(query, username);
}

export const getEmailByEmail = async (email) => {
    const query = 'SELECT email FROM usuarios WHERE email = ?';
    return await executeQuery(query, email);
}

export const createUsuarioAndLogin = async (nombre, email, telefono, idRol, username, passwordHash) => {
    try {
        await executeQuery("START TRANSACTION;", []);

        const insertUserQuery = "INSERT INTO usuarios (nombre, email, telefono, id_rol) VALUES (?, ?, ?, ?);";
        const userResult = await executeQuery(insertUserQuery, [nombre, email, telefono, idRol]);

        const usuarioId = userResult.insertId;

        const insertLoginQuery = "INSERT INTO login (id_usuario, username, password_hash, fecha_creacion) VALUES (?, ?, ?, NOW());";
        await executeQuery(insertLoginQuery, [usuarioId, username, passwordHash]);

        await executeQuery("COMMIT;", []);
    } catch (error) {
        await executeQuery("ROLLBACK;", []);
        throw error;
    }
};

export const getUserIdAndRoleId = async (username) => {
    const query = `
        SELECT l.id_usuario, u.id_rol FROM login l 
        INNER JOIN usuarios u ON l.id_usuario = u.id_usuario
        WHERE username = ?
    `;
    return await executeQuery(query, [username]);
};

export const createBitacoraLogin = async (Usuario, ipAdd, status, error, userAgent) => {
    try {
        const query = `INSERT INTO bitacora_login (username, time_stamp, ip_add, status, error, user_agent)  
    VALUES (?, NOW(), ?, ?, ?, ?);`;
        await executeQuery(query, [Usuario, ipAdd, status, error, userAgent]);
    } catch (e) {
        console.log(e);
    }
};

export const getAllFromUsername = async (userId) => {
    const query = `
        SELECT l.username, u.nombre, u.email, u.telefono, r.rol, l.ultimo_login FROM usuarios u
            INNER JOIN login l ON l.id_usuario = u.id_usuario
            INNER JOIN roles r ON r.id_rol = u.id_rol
            WHERE u.id_usuario = ?
        `;
    return await executeQuery(query, [userId]);
};

export const updateLastLogin = async (username) => {
    const query = `UPDATE login SET ultimo_login = NOW() WHERE username = ?;`;
    await executeQuery(query, [username]);
};

export const updateUsuarioById = async (id, email, telefono) => {
    const query = `
        UPDATE usuarios SET email = ?, telefono = ?
        WHERE id_usuario = ?;
        `;
    await executeQuery(query, [email, telefono, id]);
};

export const obtenerTecnicos = async () => {
    const query = `SELECT id_usuario, nombre FROM usuarios WHERE id_rol = 2`; // 2 = técnicos
    return await executeQuery(query, []);
};
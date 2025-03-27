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

const existsUsername = async (username) => {
    const query = "SELECT EXISTS(SELECT 1 FROM login WHERE username = ?) AS username_exists";
    return await executeQuery(query, [username]);
};

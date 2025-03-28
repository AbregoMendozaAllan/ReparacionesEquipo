import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crecer",
    port: process.env.DB_PORT || 3306, 
    connectionLimit: 5,
});

export const executeQuery = async (query, params) => {
    try {
        const [row] = await pool.query(query, params);
        return row;
    } catch (e) {
        console.error(`Fallo en la consulta: ${e.message}`);
        throw e;
    }
};

export const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log("Conexión a la base de datos exitosa");
        conn.release();
        return true;
    } catch (e) {
        console.error(`Fallo en la conexión a la base de datos: ${e.message}`);
        throw e;
    }
};
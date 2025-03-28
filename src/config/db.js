import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crecer",
    connectionLimit: 5,
});

export const executeQuery = async (query, params) => {
    const [row] = await pool.query(query, params);
    return row;
}

export const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log("Conexion Exitosa");
        conn.release();
    } catch (e) {
        console.error(`Se presento un error: ${e}`);
        throw e;
    }
}
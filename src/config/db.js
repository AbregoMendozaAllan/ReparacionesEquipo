import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
<<<<<<< Updated upstream
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "reparacionesequipo",
    port: process.env.PORT || 3306, 
=======
    password: process.env.DB_PASSWORD || "Pulguito",
    database: process.env.DB_NAME || "reparacionesequipo",
>>>>>>> Stashed changes
    connectionLimit: 5,
});

// Función para ejecutar una consulta
export const executeQuery = async (query, params) => {
    try {
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw error;
    }
}

// Función para probar la conexión
export const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log("Conexión exitosa");
        conn.release();
    } catch (e) {
        console.error(`Se presentó un error: ${e}`);
        throw e;
    }
}

import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboadRoutes from "./routes/dashboadRoutes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import soporteRouter from "./routes/soporteRoutes.js";
import reparacionesRoutes from "./routes/reparacionesRoutes.js";  // Solo una vez
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar motor de vistas y directorio de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", )); 

// Configurar Express para servir archivos estáticos desde la carpeta public
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/user", authRoutes);
app.use("/reparaciones", reparacionesRoutes); // Solo una vez
app.use("/soporte", soporteRouter);
app.use("/dashboard", dashboadRoutes);
app.use("/equipos", equiposRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/user/login`);
});

testConnection();

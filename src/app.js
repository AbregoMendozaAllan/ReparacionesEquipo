import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboadRoutes from "./routes/dashboadRoutes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import reparacionesRoutes from "./routes/reparaciones.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import facturasRoutes from "./routes/facturasRoutes.js";
import inventariosRoutes from "./routes/inventariosRoutes.js";
import historialReparacionesRoutes from "./routes/historialReparacionesRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar motor de vistas y directorio de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configurar Express para servir archivos estáticos desde la carpeta public
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/users", authRoutes);
app.use("/dashboard", dashboadRoutes);
app.use("/clientes", clientesRoutes);
app.use("/empleados", empleadosRoutes);
app.use("/equipos", equiposRoutes);
app.use("/reparaciones", reparacionesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/facturas", facturasRoutes);
app.use("/inventarios", inventariosRoutes);
app.use("/historial-reparaciones", historialReparacionesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/users/login`);
});

testConnection();

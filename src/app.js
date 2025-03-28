import dotenv from "dotenv";
import express from "express";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboadRoutes from "./routes/dashboadRoutes.js";
import clientesRoutes from "./routes/clientes.routes.js";  // rutas de clientes xd
import empleadosRoutes from "./routes/empleados.routes.js";  // rutas de empleados xdd
import equiposRoutes from "./routes/equipos.routes.js";  // rutas de equipos
import reparacionesRoutes from "./routes/reparaciones.routes.js";  // Rutas de reparaciones
import usuariosRoutes from "./routes/usuarios.routes.js";// rutas de usuarios xdddddd
import facturasRoutes from './routes/facturasRoutes.js';// rutas de facturas xd 
import inventariosRoutes from './routes/inventariosRoutes.js';// rutas de inventarios xd 
import historialReparacionesRoutes from './routes/historialReparacionesRoutes.js';// rutas de historial de reparaciones xd
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Routes
app.use('/users', authRoutes);
app.use('/dashboard', dashboadRoutes);
app.use('/clientes', clientesRoutes);  // lo de clientes xd
app.use('/empleados', empleadosRoutes);  // lo de empleados xdd
app.use('/equipos', equiposRoutes);  // lo de equipos xdd
app.use('/reparaciones', reparacionesRoutes);  // Rutas de reparaciones
app.use('/usuarios', usuariosRoutes); // lo de las rutas de usuarios xd
app.use('/facturas', facturasRoutes); // lo de las rutas de facturas xd
app.use('/inventarios', inventariosRoutes); // lo de las rutas de inventarios xd 
app.use('/historial-reparaciones', historialReparacionesRoutes); // lo de las rutas de historial de reparaciones xd
app.use('/static', express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/users/login`);
});

testConnection();

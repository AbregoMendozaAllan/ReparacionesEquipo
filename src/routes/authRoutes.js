import express from "express";
import {
    getUsuarioInfo, getUsuarios,
    loginUser,
    logout,
    registerUser,
    showLoginForm,
    showRegisterForm, updateRoles, updateUsuario
} from "../controllers/authController.js";
import {allowRoles, authenticateToken} from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.get("/login", showLoginForm)
authRoutes.post("/login", loginUser)

authRoutes.get("/register", showRegisterForm)
authRoutes.post("/register", registerUser)

authRoutes.get('/logout', logout);

authRoutes.get('/perfil', authenticateToken, getUsuarioInfo);
authRoutes.post('/perfil', authenticateToken, updateUsuario);

authRoutes.get('/listado', authenticateToken, allowRoles(1), getUsuarios);
authRoutes.post('/listado', authenticateToken, allowRoles(1), updateRoles);

export default authRoutes;
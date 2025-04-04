import express from "express";
import {
    getUsuarioInfo,
    loginUser,
    logout,
    registerUser,
    showLoginForm,
    showRegisterForm, updateUsuario
} from "../controllers/authController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.get("/login", showLoginForm)
authRoutes.post("/login", loginUser)

authRoutes.get("/register", showRegisterForm)
authRoutes.post("/register", registerUser)

authRoutes.get('/logout', logout);

authRoutes.get('/perfil', authenticateToken, getUsuarioInfo);
authRoutes.post('/perfil', authenticateToken, updateUsuario);

export default authRoutes;
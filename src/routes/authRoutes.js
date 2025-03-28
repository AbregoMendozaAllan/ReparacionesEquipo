import express from "express";
import {loginUser, logout, registerUser, showLoginForm, showRegisterForm} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.get("/login", showLoginForm)
authRoutes.post("/login", loginUser)

authRoutes.get("/register", showRegisterForm)
authRoutes.post("/register", registerUser)

authRoutes.get('/logout', logout);

export default authRoutes;
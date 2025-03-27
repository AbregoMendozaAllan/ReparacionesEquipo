import express from "express";
import {loginUser, registerUser, showLoginForm, showRegisterForm} from "../controllers/userController.js";

const loginRoutes = express.Router();

loginRoutes.get("/login", showLoginForm)
loginRoutes.post("/login", loginUser)

loginRoutes.get("/register", showRegisterForm)
loginRoutes.post("/register", registerUser)

export default loginRoutes;
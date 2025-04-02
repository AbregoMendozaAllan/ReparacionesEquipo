import express from "express";
import {loginUser, logout, registerUser, showLoginForm, showRegisterForm} from "../controllers/authController.js";
import {createSoporte, showSoporte} from "../controllers/soporteController.js";

const soporteRouter = express.Router();

soporteRouter.get("/crear", showSoporte);
soporteRouter.post("/crear", createSoporte);

export default soporteRouter;
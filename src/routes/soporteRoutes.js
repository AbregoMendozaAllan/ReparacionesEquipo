import express from "express";
import {
    createSoporte,
    getHistorial,
    getSoportesByUsuarioId,
    showSoporteCrear
} from "../controllers/soporteController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const soporteRouter = express.Router();

soporteRouter.get("/crear", authenticateToken,showSoporteCrear);
soporteRouter.post("/crear", authenticateToken, createSoporte);

soporteRouter.get("/", authenticateToken, getSoportesByUsuarioId);

soporteRouter.get('/historial', authenticateToken, getHistorial);
export default soporteRouter;
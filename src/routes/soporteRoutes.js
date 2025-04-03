import express from "express";
import {createSoporte, showSoporte} from "../controllers/soporteController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const soporteRouter = express.Router();

soporteRouter.get("/crear", authenticateToken,showSoporte);
soporteRouter.post("/crear", authenticateToken, createSoporte);

export default soporteRouter;
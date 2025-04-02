import express from "express";
import {createSoporte, showSoporte} from "../controllers/soporteController.js";

const soporteRouter = express.Router();

soporteRouter.get("/crear", showSoporte);
soporteRouter.post("/crear", createSoporte);

export default soporteRouter;
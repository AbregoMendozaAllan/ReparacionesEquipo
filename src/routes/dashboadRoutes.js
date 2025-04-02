import express from "express";
import {getDashboard} from "../controllers/dashboardController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get('/', authenticateToken, getDashboard);

export default dashboardRoutes;

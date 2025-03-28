import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import {getDashboard} from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get('/', authenticateToken, getDashboard);

export default dashboardRoutes;

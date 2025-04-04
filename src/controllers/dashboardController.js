import jwt from 'jsonwebtoken';
import {getUserFromToken} from "../middleware/authMiddleware.js";
import {getRecentSolicitudesByUsuarioId} from "../dao/soporteDao.js";

export const getDashboard = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send("Unauthorized");
        }
        const {userId, role} = decoded;
        try {
            const solicitudes = await getRecentSolicitudesByUsuarioId(userId);
            res.render("dashboard", {userId, role, solicitudes});
        } catch (e) {
            console.log(e);
        }
    });
};
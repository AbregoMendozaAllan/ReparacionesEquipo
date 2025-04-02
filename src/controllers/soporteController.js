import {createEquipoAndSolicitud} from "../dao/soporteDao.js";
import jwt from "jsonwebtoken";
import {verifyToken} from "../middleware/authMiddleware.js";

export const showSoporte = (req, res) => {
    res.render("soporte/soporte-crear");
};

export const createSoporte = async (req, res) => {
    try {
        const { equipo, tipo, marca, modelo, serie, estadoEquipo, problema} = req.body;

        const { userId } = await verifyToken(req);

        await createEquipoAndSolicitud(equipo, tipo, marca, modelo, serie, estadoEquipo, userId, problema, 'Pendiente');
        res.send('<script>alert("Solicitud creada exitosamente!"); window.location.href = "dashboard"</script>');
    } catch (e) {
        console.log(e);
        res.send('<script>alert("Error: Solicitud no se pudo crear!"); window.location.href = "dashboard"</script>');
    }
}
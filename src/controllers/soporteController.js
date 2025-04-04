import {getUserFromToken} from "../middleware/authMiddleware.js";
import {
    createSolicitud,
    getAllSolicitudesByUsuarioId,
    getRecentSolicitudesByUsuarioId,
    getSolicitudesTerminadasByUsuarioId
} from "../dao/soporteDao.js";
import {getEquipoByUsuarioAsignadoId} from "../dao/equiposDao.js";

export const showSoporteCrear = async (req, res) => {
    const { idUsuario } = await getUserFromToken(req);
    const equipos = await getEquipoByUsuarioAsignadoId(idUsuario);
    res.render("soporte/soporte-crear", { equipos });
};

export const createSoporte = async (req, res) => {
    try {
        const { equipoId, problema } = req.body;
        const { idUsuario } = await getUserFromToken(req);
        await createSolicitud(idUsuario, equipoId, problema, 'Pendiente');
        res.send('<script>alert("Solicitud creada exitosamente!"); window.location.href = "/dashboard"</script>');
    } catch (e) {
        console.log(e);
        res.send('<script>alert("Error: Solicitud no se pudo crear!"); window.location.href = "/dashboard"</script>');
    }
};

export const getSoportesByUsuarioId = async (req, res) => {
    try {
        const { idUsuario } = await getUserFromToken(req);
        console.log(idUsuario);
        const solicitudes = await getAllSolicitudesByUsuarioId(idUsuario);
        console.log(solicitudes);
        res.render('soporte/soporte-list', { solicitudes });
    } catch (e) {
        console.log(e);
    }
};

export const getHistorial = async (req, res) => {
    try {
        const { idUsuario } = await getUserFromToken(req);
        const solicitudes = await getSolicitudesTerminadasByUsuarioId(idUsuario);
        console.log(solicitudes);
        res.render('soporte/soporte-historial', { solicitudes });
    } catch (e) {
        console.log(e);
    }
};
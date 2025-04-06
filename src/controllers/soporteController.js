import {getUserFromToken} from "../middleware/authMiddleware.js";
import {
    createSoporteConAsignacion,
    getAllSolicitudesByUsuarioId,
    getSolicitudesTerminadasByUsuarioId
} from "../dao/soporteDao.js";
import {getEquipoByUsuarioAsignadoId} from "../dao/equiposDao.js";
import {getTecnicosDisponibles} from "../dao/reparacionesDao.js";

export const showSoporteCrear = async (req, res) => {
    const { idUsuario } = await getUserFromToken(req);
    const equipos = await getEquipoByUsuarioAsignadoId(idUsuario);
    res.render("soporte/soporte-crear", { equipos });
};

export const createSoporte = async (req, res) => {
    try {
        const { equipoId, problema } = req.body;
        const { idUsuario } = await getUserFromToken(req);
        const { id_tecnico } = await getTecnicosDisponibles();
        console.log(id_tecnico);
        await createSoporteConAsignacion(idUsuario, equipoId, problema, 'Pendiente', id_tecnico);

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


import {getUserFromToken} from "../middleware/authMiddleware.js";

export const showSoporte = (req, res) => {
    res.render("soporte/soporte-crear");
};

export const createSoporte = async (req, res) => {
    try {
        const { equipoId, problema } = req.body;
        console.log(problema);
        console.log(equipoId);
        const { idUsuario } = await getUserFromToken(req);
        console.log(idUsuario);
        //await createSolicitud(userId, equipoId, problema, 'Pendiente');
        res.send('<script>alert("Solicitud creada exitosamente!"); window.location.href = "/dashboard"</script>');
    } catch (e) {
        console.log(e);
        res.send('<script>alert("Error: Solicitud no se pudo crear!"); window.location.href = "/dashboard"</script>');
    }
}
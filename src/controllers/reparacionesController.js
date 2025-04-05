import { obtenerReparacionesPorTecnico } from "../dao/reparacionesDao.js"; 
import { getSolicitudesActivas } from "../dao/soporteDao.js";
import { obtenerTecnicos } from "../dao/authDao.js"; 
import { getAllEquipos } from "../dao/equiposDao.js"; 

// Mostrar formulario para crear reparación
export const showCrearReparacion = async (req, res) => {
    try {
        const tecnicos = await obtenerTecnicos();
        const solicitudes = await getSolicitudesActivas();
        const equipos = await getAllEquipos(); 

        res.render("reparaciones/crear", {
            tecnicos,
            solicitudes,
            equipos
        });
    } catch (error) {
        console.log(error);
        res.send("Error al cargar el formulario");
    }
};

// Crear reparación
export const handleCrearReparacion = async (req, res) => {
    try {
        const { id_equipo, id_solicitud, id_tecnico } = req.body;
        await crearReparacion(id_equipo, id_solicitud, id_tecnico);
        res.send('<script>alert("Reparación creada correctamente."); window.location.href="/dashboard"</script>');
    } catch (error) {
        console.log(error);
        res.send('<script>alert("Error al crear reparación."); window.location.href="/dashboard"</script>');
    }
};

// Mostrar formulario para cambiar estado (solo para técnicos)
export const showCambiarEstado = async (req, res) => {
    try {
        const idTecnico = req.usuario?.id_usuario; // Obtener el ID del técnico desde el middleware de autenticación
        const reparaciones = await obtenerReparacionesPorTecnico(idTecnico);
        res.render("reparaciones/cambiarestado", { reparaciones });
    } catch (error) {
        console.log(error);
        res.send("Error al cargar reparaciones.");
    }
};

// Procesar cambio de estado
export const handleCambiarEstado = async (req, res) => {
    try {
        const { id_reparacion, nuevo_estado } = req.body;
        await actualizarEstadoReparacion(id_reparacion, nuevo_estado);
        res.send('<script>alert("Estado actualizado."); window.location.href="/dashboard"</script>');
    } catch (error) {
        console.log(error);
        res.send('<script>alert("Error al actualizar estado."); window.location.href="/dashboard"</script>');
    }
};

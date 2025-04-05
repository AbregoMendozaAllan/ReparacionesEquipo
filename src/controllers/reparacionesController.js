import { ReparacionDAO } from '../dao/reparacionesDao.js';

// Controlador para mostrar el formulario de creación de reparaciones
export const vistaCrearReparacion = async (req, res) => {
    try {
        const equipos = await ReparacionDAO.obtenerEquipos();
        const solicitudes = await ReparacionDAO.obtenerSolicitudesSoporte();  // Cambio aquí para llamar la función correcta
        const tecnicos = await ReparacionDAO.obtenerTecnicos();

        res.render('reparaciones/crear', { equipos, solicitudes, tecnicos });
    } catch (error) {
        console.error("Error al cargar la vista de creación de reparación:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Controlador para procesar la creación de una reparación
export const crearReparacion = async (req, res) => {
    try {
        const { id_equipo, id_solicitud, id_tecnico_asignado } = req.body;
        await ReparacionDAO.crearReparacion(id_equipo, id_solicitud, id_tecnico_asignado);
        res.redirect('/reparaciones/listado');
    } catch (error) {
        console.error("Error al crear la reparación:", error);
        res.status(500).send("Error al crear la reparación");
    }
};

// Controlador para listar reparaciones
export const listarReparaciones = async (req, res) => {
    try {
        const reparaciones = await ReparacionDAO.obtenerReparaciones();
        res.render('reparaciones/listado', { reparaciones });
    } catch (error) {
        console.error("Error al obtener la lista de reparaciones:", error);
        res.status(500).send("Error al obtener la lista de reparaciones");
    }
};

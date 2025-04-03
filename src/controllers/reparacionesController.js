import * as ReparacionDAO from '../dao/reparacionesDao.js'; // Importa correctamente el DAO

// Obtener la vista para crear reparaciones
export const vistaCrearReparacion = async (req, res) => {
    try {
        const tecnicos = await ReparacionDAO.obtenerTecnicos();
        res.render('crear-reparacion', { tecnicos });
    } catch (error) {
        console.error('Error al obtener técnicos:', error);
        res.status(500).send('Error al obtener técnicos');
    }
};

// Crear una nueva reparación
export const crearReparacion = async (req, res) => {
    const { id_equipo, id_solicitud, id_tecnico_asignado } = req.body;

    try {
        await ReparacionDAO.crearReparacion(id_equipo, id_solicitud, id_tecnico_asignado);
        res.redirect('/reparaciones/lista-reparaciones');
    } catch (error) {
        console.error('Error al crear la reparación:', error);
        res.status(500).send('Error al crear la reparación');
    }
};

// Cambiar estado de reparación
export const cambiarEstado = async (req, res) => {
    const { nuevo_estado } = req.body;
    const { id_reparacion } = req.params;

    try {
        await ReparacionDAO.cambiarEstadoReparacion(id_reparacion, nuevo_estado);
        res.redirect('/reparaciones/lista-reparaciones');
    } catch (error) {
        console.error('Error al cambiar el estado:', error);
        res.status(500).send('Error al cambiar el estado');
    }
};

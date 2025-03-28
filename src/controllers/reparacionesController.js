import {
    getAllReparaciones,
    getReparacionById,
    createReparacion,
    updateReparacion,
    deleteReparacion
} from "../dao/reparacionesDao.js";

// Mostrar lista de reparaciones
export const mostrarReparaciones = async (req, res) => {
    try {
        const reparaciones = await getAllReparaciones();
        res.render("reparaciones/reparaciones-listado", { reparaciones });
    } catch (error) {
        console.error("Error al obtener las reparaciones:", error);
        res.status(500).send("Error al obtener las reparaciones");
    }
};

// Mostrar detalle de una reparación por ID
export const mostrarReparacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const reparacion = await getReparacionById(id);
        if (!reparacion) {
            return res.status(404).send("Reparación no encontrada");
        }
        res.render("reparaciones/reparaciones-detalle", { reparacion });
    } catch (error) {
        console.error("Error al obtener la reparación:", error);
        res.status(500).send("Error al obtener la reparación");
    }
};

// Mostrar formulario para crear reparación
export const formularioCrearReparacion = (req, res) => {
    res.render("reparaciones/reparaciones-crear");
};

// Crear nueva reparación
export const crearNuevaReparacion = async (req, res) => {
    try {
        const { descripcion, fecha, idCliente, idEquipo } = req.body;
        await createReparacion(descripcion, fecha, idCliente, idEquipo);
        res.redirect("/reparaciones");
    } catch (error) {
        console.error("Error al crear reparación:", error);
        res.status(500).send("Error al crear reparación");
    }
};

// Mostrar formulario para editar reparación
export const formularioEditarReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const reparacion = await getReparacionById(id);
        if (!reparacion) {
            return res.status(404).send("Reparación no encontrada");
        }
        res.render("reparaciones/reparaciones-editar", { reparacion });
    } catch (error) {
        console.error("Error al obtener reparación para editar:", error);
        res.status(500).send("Error al obtener reparación para editar");
    }
};

// Actualizar reparación
export const actualizarReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fecha, idCliente, idEquipo } = req.body;
        await updateReparacion(id, descripcion, fecha, idCliente, idEquipo);
        res.redirect("/reparaciones");
    } catch (error) {
        console.error("Error al actualizar reparación:", error);
        res.status(500).send("Error al actualizar reparación");
    }
};

// Eliminar reparación
export const eliminarReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteReparacion(id);
        res.redirect("/reparaciones");
    } catch (error) {
        console.error("Error al eliminar reparación:", error);
        res.status(500).send("Error al eliminar reparación");
    }
};

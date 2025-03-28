import { getAllHistorialReparaciones, getHistorialReparacionById, createHistorialReparacion, updateHistorialReparacion, deleteHistorialReparacion } from "../dao/historialReparacionesDao.js";

// Mostrar todos los registros del historial de reparaciones
export const mostrarHistorialReparaciones = async (req, res) => {
    try {
        const historial = await getAllHistorialReparaciones();
        res.render("historialReparaciones/historial-listado", { historial });
    } catch (error) {
        console.error("Error al obtener el historial de reparaciones:", error);
        res.status(500).send("Error al obtener el historial de reparaciones");
    }
};

// Mostrar historial de reparación por ID
export const mostrarHistorialReparacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await getHistorialReparacionById(id);
        if (!historial) {
            return res.status(404).send("Historial de reparación no encontrado");
        }
        res.render("historialReparaciones/historial-detalle", { historial });
    } catch (error) {
        console.error("Error al obtener el historial de reparación:", error);
        res.status(500).send("Error al obtener el historial de reparación");
    }
};

// Mostrar formulario para crear un nuevo historial de reparación
export const formularioCrearHistorialReparacion = (req, res) => {
    res.render("historialReparaciones/historial-crear");
};

// Crear nuevo historial de reparación
export const crearHistorialReparacionNuevo = async (req, res) => {
    try {
        const { id_reparacion, descripcion, fecha } = req.body;
        await createHistorialReparacion(id_reparacion, descripcion, fecha);
        res.redirect("/historial-reparaciones");
    } catch (error) {
        console.error("Error al crear el historial de reparación:", error);
        res.status(500).send("Error al crear el historial de reparación");
    }
};

// Mostrar formulario para editar historial de reparación
export const formularioEditarHistorialReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await getHistorialReparacionById(id);
        if (!historial) {
            return res.status(404).send("Historial de reparación no encontrado");
        }
        res.render("historialReparaciones/historial-editar", { historial });
    } catch (error) {
        console.error("Error al obtener historial para editar:", error);
        res.status(500).send("Error al obtener historial para editar");
    }
};

// Actualizar historial de reparación
export const actualizarHistorialReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fecha } = req.body;
        await updateHistorialReparacion(id, descripcion, fecha);
        res.redirect("/historial-reparaciones");
    } catch (error) {
        console.error("Error al actualizar el historial de reparación:", error);
        res.status(500).send("Error al actualizar el historial de reparación");
    }
};

// Eliminar historial de reparación
export const eliminarHistorialReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteHistorialReparacion(id);
        res.redirect("/historial-reparaciones");
    } catch (error) {
        console.error("Error al eliminar el historial de reparación:", error);
        res.status(500).send("Error al eliminar el historial de reparación");
    }
};

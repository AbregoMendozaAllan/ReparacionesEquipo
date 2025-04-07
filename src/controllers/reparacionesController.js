// src/controllers/reparacionesController.js
import {
    getAllReparaciones,
    getTecnicosDisponibles,
    crearReparacion,
    actualizarEstadoReparacion,
    getReparacionPorId,
    actualizarReparacionConDiagnostico
} from "../dao/reparacionesDao.js";
import { getSolicitudesActivas, getSolicitudConSolicitantePorId } from "../dao/soporteDao.js";
import { obtenerTecnicos } from "../dao/authDao.js";
import { getAllEquipos, getEquipoById } from "../dao/equiposDao.js";
import { executeQuery } from "../config/db.js";

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
        console.error(error);
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
        console.error(error);
        res.send('<script>alert("Error al crear reparación."); window.location.href="/dashboard"</script>');
    }
};

// Mostrar formulario para cambiar estado y diagnóstico (solo para técnicos)
export const showCambiarEstado = async (req, res) => {
    try {
        const reparaciones = await getAllReparaciones(); // Obtener TODAS las reparaciones

        res.render("reparaciones/cambiarestado", { reparaciones });
    } catch (error) {
        console.error(error);
        res.send("Error al cargar reparaciones.");
    }
};

// Procesar cambio de estado
export const handleCambiarEstado = async (req, res) => {
    try {
        const { id_reparacion, estado, diagnostico } = req.body;

        if (!estado) {
            throw new Error("El estado es requerido");
        }

        const fecha_finalizacion = (estado === 'Reparado' || estado === 'Descartado') ? new Date() : null;

        const query = `
            UPDATE reparaciones
            SET estado = ?, diagnostico = ?, fecha_finalizacion = ?
            WHERE id_reparacion = ?
        `;
        await executeQuery(query, [estado, diagnostico, fecha_finalizacion, id_reparacion]);

        res.send('<script>alert("Estado y diagnóstico actualizados."); window.location.href="/dashboard"</script>');
    } catch (error) {
        console.error(error);
        res.send('<script>alert("Error al actualizar."); window.location.href="/dashboard"</script>');
    }
};

// Mostrar listado general
export const formularioReparaciones = async (req, res) => {
    try {
        const reparaciones = await getAllReparaciones();
        res.render('reparaciones/listado', { reparaciones });
    } catch (e) {
        console.error(e);
        res.send("Error al cargar listado.");
    }
};

// Mostrar formulario de edición
export const showEditarReparacion = async (req, res) => {
    try {
        const id = req.params.id;
        const reparacion = await getReparacionPorId(id);
        const tecnicos = await obtenerTecnicos();

        const equipoInfoArray = await getEquipoById(reparacion.id_equipo);
        const equipoInfo = equipoInfoArray[0]; // <--- Accede al primer elemento del array

        const solicitudInfo = await getSolicitudConSolicitantePorId(reparacion.id_solicitud);

        res.render("reparaciones/edit", {
            reparacion,
            tecnicos,
            equipo: equipoInfo,
            solicitud: solicitudInfo
        });
    } catch (error) {
        console.error(error);
        res.send("Error al cargar el formulario de edición");
    }
};

// Guardar cambios desde edición
export const handleEditarReparacion = async (req, res) => {
    try {
        const { id_tecnico_asignado, fecha_inicio_reparacion, fecha_finalizacion, diagnostico, estado } = req.body;
        const id = req.params.id; // Obtener el ID de los parámetros de la ruta

        await actualizarReparacionConDiagnostico(
            id,
            id_tecnico_asignado,
            fecha_inicio_reparacion || null,
            fecha_finalizacion || null,
            diagnostico,
            estado
        );

        res.send('<script>alert("Reparación actualizada correctamente."); window.location.href="/reparaciones"</script>');
    } catch (error) {
        console.error(error);
        res.send('<script>alert("Error al actualizar reparación."); window.location.href="/reparaciones"</script>');
    }
};
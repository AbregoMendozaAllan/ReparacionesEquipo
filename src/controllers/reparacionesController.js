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
        const equipos = await getAllEquipos(); // Solo necesitamos técnicos y equipos

        res.render("reparaciones/crear", {
            tecnicos,
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
        const { id_equipo, id_tecnico } = req.body; // Solo necesitamos id_equipo e id_tecnico
        await crearReparacion(id_equipo, null, id_tecnico); // Pasamos null para id_solicitud
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
        const equipoInfo = equipoInfoArray[0];

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
        const { id_tecnico_asignado, diagnostico, estado } = req.body; // Quitamos fecha_inicio y fecha_finalizacion
        const id = req.params.id; // Obtener el ID de los parámetros de la ruta

        await actualizarReparacionConDiagnostico(
            id,
            id_tecnico_asignado,
            null, // fecha_inicio_reparacion siempre null
            null, // fecha_finalizacion siempre null (se maneja por estado)
            diagnostico,
            estado
        );

        res.send('<script>alert("Reparación actualizada correctamente."); window.location.href="/reparaciones"</script>');
    } catch (error) {
        console.error(error);
        res.send('<script>alert("Error al actualizar reparación."); window.location.href="/reparaciones"</script>');
    }
};
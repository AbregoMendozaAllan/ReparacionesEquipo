<<<<<<< Updated upstream
import express from 'express';
import { vistaCrearReparacion, crearReparacion, listarReparaciones } from '../controllers/reparacionesController.js';

const router = express.Router();

// Ruta para mostrar el formulario de creación de reparaciones (crear.ejs)
router.get('/crear', vistaCrearReparacion);

// Ruta para procesar el formulario y crear la reparación
router.post('/crear', crearReparacion);

// Ruta para listar las reparaciones (listado.ejs)
router.get('/listado', listarReparaciones);
=======
import express from "express";
import { executeQuery } from "../config/db.js"; // Asegúrate de que esta ruta esté correcta
import { crearReparacionControlador, actualizarEstadoReparacionControlador } from "../controllers/reparacionesController.js";

const router = express.Router();

// Ruta GET para mostrar el formulario de creación de reparación
router.get('/crear', async (req, res) => {
    try {
        // Obtener equipos, solicitudes y técnicos desde la base de datos
        const equipos = await executeQuery('SELECT * FROM Equipos');
        const solicitudes = await executeQuery('SELECT * FROM SolicitudesSoporte');
        const tecnicos = await executeQuery('SELECT * FROM Usuarios WHERE id_rol = 2'); // Suponiendo que el rol 2 es para técnicos
        
        res.render('reparaciones/crear', { // Cambié el nombre de la vista a 'reparaciones/crear'
            equipos: equipos, 
            solicitudes: solicitudes,
            tecnicos: tecnicos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos para la creación de la reparación');
    }
});

// Ruta GET para mostrar el formulario de cambio de estado de reparación
router.get('/cambiarestado', async (req, res) => {
    try {
        // Obtener reparaciones que están en espera desde la base de datos
        const reparaciones = await executeQuery('SELECT * FROM Reparaciones WHERE estado = "En espera"');
        
        res.render('reparaciones/cambiarestado', { reparaciones }); // Aquí se hace la referencia a la vista correcta
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las reparaciones para cambiar el estado');
    }
});


// Ruta POST para crear la reparación
router.post('/crear', crearReparacionControlador);

// Ruta POST para actualizar el estado de la reparación
router.post('/cambiarestado', actualizarEstadoReparacionControlador);
>>>>>>> Stashed changes

export default router;

import {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../dao/empleadosDao.js";

// Mostrar lista de empleados
export const mostrarEmpleados = async (req, res) => {
    try {
        const empleados = await getAllEmpleados();
        res.render("empleados/lista", { empleados });
    } catch (error) {
        console.error("Error al obtener los empleados:", error);
        res.status(500).send("Error al obtener los empleados");
    }
};

// Mostrar detalle de un empleado por ID
export const mostrarEmpleadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await getEmpleadoById(id);
        if (!empleado) {
            return res.status(404).send("Empleado no encontrado");
        }
        res.render("empleados/detalle", { empleado });
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).send("Error al obtener el empleado");
    }
};

// Mostrar formulario para crear un nuevo empleado
export const formularioCrearEmpleado = (req, res) => {
    res.render("empleados/crear");
};

// Crear nuevo empleado
export const crearNuevoEmpleado = async (req, res) => {
    try {
        const { nombre, puesto, salario, telefono, correo } = req.body;
        await createEmpleado(nombre, puesto, salario, telefono, correo);
        res.redirect("/empleados");
    } catch (error) {
        console.error("Error al crear empleado:", error);
        res.status(500).send("Error al crear empleado");
    }
};

// Mostrar formulario para editar un empleado
export const formularioEditarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await getEmpleadoById(id);
        if (!empleado) {
            return res.status(404).send("Empleado no encontrado");
        }
        res.render("empleados/editar", { empleado });
    } catch (error) {
        console.error("Error al obtener empleado para editar:", error);
        res.status(500).send("Error al obtener empleado para editar");
    }
};

// Actualizar un empleado
export const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, puesto, salario, telefono, correo } = req.body;
        await updateEmpleado(id, nombre, puesto, salario, telefono, correo);
        res.redirect("/empleados");
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).send("Error al actualizar empleado");
    }
};

// Eliminar un empleado
export const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteEmpleado(id);
        res.redirect("/empleados");
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
        res.status(500).send("Error al eliminar empleado");
    }
};

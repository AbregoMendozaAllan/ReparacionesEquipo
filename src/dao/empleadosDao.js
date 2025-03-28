import { executeQuery } from "../config/db.js";

// aqui es donde optenes los datos del empleado
export const getAllEmpleados = async () => {
    const query = 'SELECT * FROM empleados';
    return await executeQuery(query);
};

// aqui optengo los daros del empleado por ID
export const getEmpleadoById = async (id) => {
    const query = 'SELECT * FROM empleados WHERE id = ?';
    return await executeQuery(query, [id]);
};

// aqui creo un nuevo empleado
export const createEmpleado = async (nombre, puesto, salario, telefono, correo) => {
    const query = 'INSERT INTO empleados (nombre, puesto, salario, telefono, correo) VALUES (?, ?, ?, ?, ?)';
    return await executeQuery(query, [nombre, puesto, salario, telefono, correo]);
};

// aqui actualizo un empleado
export const updateEmpleado = async (id, nombre, puesto, salario, telefono, correo) => {
    const query = 'UPDATE empleados SET nombre = ?, puesto = ?, salario = ?, telefono = ?, correo = ? WHERE id = ?';
    return await executeQuery(query, [nombre, puesto, salario, telefono, correo, id]);
};

// aqui se borra un empleado
export const deleteEmpleado = async (id) => {
    const query = 'DELETE FROM empleados WHERE id = ?';
    return await executeQuery(query, [id]);
};

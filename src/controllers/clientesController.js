import {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
  } from "../dao/clientesDao.js";
  
  // Mostrar lista de clientes
  export const mostrarClientes = async (req, res) => {
    try {
      const clientes = await getAllClientes();
      res.render("clientes/clientesListado", { clientes }); 
        } catch (error) {
      console.error("Error al obtener los clientes:", error);
      res.status(500).send("Error al obtener los clientes");
    }
  };
  
  // Mostrar detalle de un cliente por ID
  export const mostrarClientePorId = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await getClienteById(id);
      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }
      res.render("clientes/detalle", { cliente });
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      res.status(500).send("Error al obtener el cliente");
    }
  };
  
  // Mostrar formulario para crear cliente
  export const formularioCrearCliente = (req, res) => {
    res.render("clientes/crear");
  };
  
  // Crear nuevo cliente
  export const crearNuevoCliente = async (req, res) => {
    try {
      const { nombre, direccion, telefono, correo } = req.body;
      await createCliente(nombre, direccion, telefono, correo);
      res.redirect("/clientes");
    } catch (error) {
      console.error("Error al crear cliente:", error);
      res.status(500).send("Error al crear cliente");
    }
  };
  
  // Mostrar formulario para editar cliente
  export const formularioEditarCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await getClienteById(id);
      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }
      res.render("clientes/editar", { cliente });
    } catch (error) {
      console.error("Error al obtener cliente para editar:", error);
      res.status(500).send("Error al obtener cliente para editar");
    }
  };
  
  // Actualizar cliente
  export const actualizarCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, direccion, telefono, correo } = req.body;
      await updateCliente(id, nombre, direccion, telefono, correo);
      res.redirect("/clientes");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).send("Error al actualizar cliente");
    }
  };
  
  // Eliminar cliente
  export const eliminarCliente = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteCliente(id);
      res.redirect("/clientes");
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      res.status(500).send("Error al eliminar cliente");
    }
  };
  
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../dao/usuariosDao.js";

// Mostrar todos los usuarios
export const mostrarUsuarios = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        res.render("usuarios/usuarios-listado", { usuarios });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error al obtener los usuarios");
    }
};

// Mostrar detalle de un usuario por ID
export const mostrarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioById(id);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.render("usuarios/usuarios-detalle", { usuario });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Error al obtener el usuario");
    }
};

// Mostrar formulario para crear usuario
export const formularioCrearUsuario = (req, res) => {
    res.render("usuarios/usuarios-crear");
};

// Crear nuevo usuario
export const crearUsuarioNuevo = async (req, res) => {
    try {
        const { nombre, email, telefono, rol } = req.body;
        await createUsuario(nombre, email, telefono, rol);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send("Error al crear usuario");
    }
};

// Mostrar formulario para editar usuario
export const formularioEditarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioById(id);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.render("usuarios/usuarios-editar", { usuario });
    } catch (error) {
        console.error("Error al obtener usuario para editar:", error);
        res.status(500).send("Error al obtener usuario para editar");
    }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, rol } = req.body;
        await updateUsuario(id, nombre, email, telefono, rol);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error al actualizar usuario");
    }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUsuario(id);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).send("Error al eliminar usuario");
    }
};

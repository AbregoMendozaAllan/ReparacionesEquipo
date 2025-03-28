import { getAllInventarios, getInventarioById, createInventario, updateInventario, deleteInventario } from "../dao/inventariosDao.js";

// Mostrar todos los productos del inventario
export const mostrarInventarios = async (req, res) => {
    try {
        const inventarios = await getAllInventarios();
        res.render("inventarios/inventarios-listado", { inventarios });
    } catch (error) {
        console.error("Error al obtener los inventarios:", error);
        res.status(500).send("Error al obtener los inventarios");
    }
};

// Mostrar producto del inventario por ID
export const mostrarInventarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await getInventarioById(id);
        if (!inventario) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render("inventarios/inventarios-detalle", { inventario });
    } catch (error) {
        console.error("Error al obtener el producto del inventario:", error);
        res.status(500).send("Error al obtener el producto del inventario");
    }
};

// Mostrar formulario para crear un nuevo producto en inventario
export const formularioCrearInventario = (req, res) => {
    res.render("inventarios/inventarios-crear");
};

// Crear nuevo producto en el inventario
export const crearInventarioNuevo = async (req, res) => {
    try {
        const { id_producto, cantidad, precio_unitario, fecha_ingreso } = req.body;
        await createInventario(id_producto, cantidad, precio_unitario, fecha_ingreso);
        res.redirect("/inventarios");
    } catch (error) {
        console.error("Error al crear el inventario:", error);
        res.status(500).send("Error al crear el inventario");
    }
};

// Mostrar formulario para editar producto en inventario
export const formularioEditarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await getInventarioById(id);
        if (!inventario) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render("inventarios/inventarios-editar", { inventario });
    } catch (error) {
        console.error("Error al obtener producto para editar:", error);
        res.status(500).send("Error al obtener producto para editar");
    }
};

// Actualizar producto en inventario
export const actualizarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, precio_unitario, fecha_ingreso } = req.body;
        await updateInventario(id, cantidad, precio_unitario, fecha_ingreso);
        res.redirect("/inventarios");
    } catch (error) {
        console.error("Error al actualizar el inventario:", error);
        res.status(500).send("Error al actualizar el inventario");
    }
};

// Eliminar producto del inventario
export const eliminarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteInventario(id);
        res.redirect("/inventarios");
    } catch (error) {
        console.error("Error al eliminar el producto del inventario:", error);
        res.status(500).send("Error al eliminar el producto del inventario");
    }
};

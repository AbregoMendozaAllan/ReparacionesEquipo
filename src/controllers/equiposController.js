import {
  createEquipo,
  createEquipoSinUsuarioId,
  deleteEquipo,
  getAllEquipos,
  getEquipoById,
  updateEquipo
} from "../dao/equiposDao.js";
import {getAllIdAndNameFromUsuarios} from "../dao/authDao.js";

// Mostrar lista de equipos
export const mostrarEquipos = async (req, res) => {
  try {
    const equipos = await getAllEquipos();
    console.log(equipos);
    res.render("equipos/listado", { equipos });
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    res.status(500).send("Error al obtener los equipos");
  }
};

// Mostrar detalle de un equipo por ID
export const mostrarEquipoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await getEquipoById(id);
    if (!equipo) {
      return res.status(404).send("Equipo no encontrado");
    }
    res.render("equipos/detalle", { equipo });
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    res.status(500).send("Error al obtener el equipo");
  }
};

// Mostrar formulario para crear equipo
export const formularioCrearEquipo = async (req, res) => {
  const usuarios = await getAllIdAndNameFromUsuarios();
  console.log(usuarios);
  res.render("equipos/crear", { usuarios });
};

// Crear nuevo equipo -- funciona bien
export const crearNuevoEquipo = async (req, res) => {
  try {
    const { tipo, marca, modelo, serie, estado, usuarioId } = req.body;
    console.log(req.body);
    if (estado !== "Asignado") {
      await createEquipoSinUsuarioId(tipo, marca, modelo, serie, estado);
    } else {
      await createEquipo(tipo, marca, modelo, serie, estado, usuarioId);
    }
    res.send('<script>alert("Equipo ingresado exitosamente!"); window.location.href = "/equipos"</script>');
  } catch (error) {
    console.error("Error al crear equipo:", error);
    res.status(500).send("Error al crear equipo");
  }
};

// Mostrar formulario para editar equipo
export const formularioEditarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const [equipo] = await getEquipoById(id);
    const usuarios = await getAllIdAndNameFromUsuarios();
    if (!equipo) {
      return res.status(404).send("Equipo no encontrado");
    }
    res.render("equipos/editar", { equipo, usuarios });
  } catch (error) {
    console.error("Error al obtener el equipo para editar:", error);
    res.status(500).send("Error al obtener el equipo");
  }
};

// Actualizar un equipo existente
export const actualizarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, marca, modelo, serie, estado, usuarioId } = req.body;

    // Verificar si el equipo existe
    const equipo = await getEquipoById(id);
    if (!equipo) {
      return res.status(404).send("Equipo no encontrado");
    }

    // Actualizar el equipo
    await updateEquipo(id, tipo, marca, modelo, serie, estado, usuarioId);
    res.send('<script>alert("Equipo actualizado exitosamente!"); window.location.href = "/equipos"</script>');
  } catch (error) {
    console.error("Error al actualizar equipo:", error);
    res.status(500).send("Error al actualizar equipo");
  }
};

// Eliminar equipo
export const eliminarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEquipo(id);
    res.redirect("/equipos");
  } catch (error) {
    console.error("Error al eliminar equipo:", error);
    res.status(500).send("Error al eliminar equipo");
  }
};
import express from "express";
import * as UsuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", UsuariosController.mostrarUsuarios);
router.get("/create", UsuariosController.formularioCrearUsuario);
router.post("/create", UsuariosController.crearUsuarioNuevo);
router.get("/edit/:id", UsuariosController.formularioEditarUsuario);
router.post("/edit/:id", UsuariosController.actualizarUsuario);
router.get("/delete/:id", UsuariosController.eliminarUsuario);

export default router;

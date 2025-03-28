import bcrypt from 'bcryptjs';
import {
    createUsuarioAndLogin,
    getEmailByEmail, getPasswordHashByUsername, getUserIdAndRoleId,
    getUsernameByUsername
} from "../dao/userDao.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

export const showRegisterForm = (req, res) => {
    res.render('register');
}

export const registerUser = async (req, res) => {
    try {
        const { nombre, email, telefono, username, password, confirmPassword } = req.body;

        if (confirmPassword !== password) {
            return res.status(400).send("contraseñas deben ser iguales");
        }

        // check if username exists
        const [existingUsername] = await getUsernameByUsername(username);
        console.log(existingUsername);
        if (existingUsername) {
            return res.status(400).send("Usuario ya en uso");
        }
        // check if email exists
        const [existingEmail] = await getEmailByEmail(email);
        console.log(existingEmail);
        if (existingEmail) {
            return res.status(400).send("Correo electronico ya en uso");
        }

        // Creates salt and hashes password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUsuarioAndLogin(nombre, email, telefono, 1, username, passwordHash);
        res.send('<script>alert("Usuario creado exitosamente!"); window.location.href = "login"</script>');
    } catch (e) {
        console.error(e);
        res.send('<script>alert("Error: Registro no fue completado"); window.location.href = "login"</script>');
    }
}

export const showLoginForm = (req, res) => {
    res.render('login');
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUsernameByUsername(username);
        if (!user) {
            return res.status(401).send("Usuaro o contraseña invalido");
        }
        const [passwordHash] = await getPasswordHashByUsername(username);
        const { password_hash: storedHashedPassword } = passwordHash;

        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if (!isMatch) {
            return res.status(401).send("Usuaro o contraseña invalido");
        }

        const [ads] = await getUserIdAndRoleId(username);
        const { id_usuario: idUsuario, id_rol: idRol } = ads;
        const token = jwt.sign({ userId: idUsuario, role: idRol }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect("/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/users/login');
};
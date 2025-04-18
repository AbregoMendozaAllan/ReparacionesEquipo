import bcrypt from 'bcryptjs';
import {
    createBitacoraLogin,
    createUsuarioAndLogin, getAllFromUsername, getAllUsuariosWithRoles,
    getEmailByEmail,
    getPasswordHashByUsername, getRoles,
    getUserIdAndRoleId,
    getUsernameByUsername, updateLastLogin, updateRole, updateUsuarioById
} from "../dao/authDao.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {getUserFromToken} from "../middleware/authMiddleware.js";
import {executeQuery} from "../config/db.js";

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

        const [existingUsername] = await getUsernameByUsername(username);
        if (existingUsername) {
            return res.status(400).send("usuario ya en uso");
        }

        const [existingEmail] = await getEmailByEmail(email);
        if (existingEmail) {
            return res.status(400).send("Correo electronico ya en uso");
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUsuarioAndLogin(nombre, email, telefono, 3, username, passwordHash);
        res.send('<script>alert("usuario creado exitosamente!"); window.location.href = "login"</script>');
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
        const [user] = await getUsernameByUsername(username); // Add [user] to destructure properly
        const userAgent = req.headers['user-agent'];
        const ipAdd = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const logError = (errorMessage) => {
            return `Error occurred during login attempt for user: ${username}. Error message: ${errorMessage}. IP Address: ${ipAdd}. User Agent: ${userAgent}. Timestamp: ${new Date().toISOString()}`;
        };

        if (!user) {
            const errorLog = logError('Invalid username');
            await createBitacoraLogin(username, ipAdd, 'FAILED', errorLog, userAgent);
            return res.send('<script>alert("Error: Usuario o contraseña incorrectas!"); window.location.href = "/user/login"</script>');
        }

        const [passwordHash] = await getPasswordHashByUsername(username);
        if (!passwordHash) {
            const errorLog = logError('No password hash found');
            await createBitacoraLogin(username, ipAdd, 'FAILED', errorLog, userAgent);
            return res.send('<script>alert("Error: Usuario o contraseña incorrectas!"); window.location.href = "/user/login"</script>');
        }

        const { password_hash: storedHashedPassword } = passwordHash;
        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if (!isMatch) {
            const errorLog = logError('Invalid password');
            await createBitacoraLogin(username, ipAdd, 'FAILED', errorLog, userAgent);
            return res.send('<script>alert("Error: Usuario o contraseña incorrectas!"); window.location.href = "/user/login"</script>');
        }

        await updateLastLogin(username);
        await createBitacoraLogin(username, ipAdd, 'SUCCESS', 'Null', userAgent);

        const [ads] = await getUserIdAndRoleId(username);
        const { id_usuario: idUsuario, id_rol: idRol } = ads;
        const token = jwt.sign({ userId: idUsuario, role: idRol }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.redirect("/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
};


export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/login');
};

export const getUsuarioInfo = async (req, res) => {
    const { idUsuario } = await getUserFromToken(req);
    const [user] = await getAllFromUsername(idUsuario);
    res.render('usuario/configuracion', { user });
};

export const updateUsuario = async (req, res) => {
    try {
        const { idUsuario } = await getUserFromToken(req);
        const { email, telefono } = req.body;

        const [existingEmail] = await getEmailByEmail(email);
        if (existingEmail && existingEmail.id_usuario !== idUsuario) {
            return res.send('<script>alert("Error: Correo ya en uso"); window.location.href = "/user/perfil"</script>');
        }

        await updateUsuarioById(idUsuario, email, telefono);
        res.send('<script>alert("Actualizacion Completada!"); window.location.href = "/user/perfil"</script>');
    } catch (e) {
        console.error(e);
        res.status(500).send("Error actualizando usuario");
    }
};

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await getAllUsuariosWithRoles()
        const roles = await getRoles()
        res.render('usuario/listado', { usuarios, roles });
    } catch (e) {
        console.error(e);
    }
}

export const updateRoles = async (req, res) => {
    try {
        const { id_usuario: idUsuario, id_rol: idRole } = req.body;
        await updateRole(idUsuario, idRole);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error actualizando usuario");
    }
}
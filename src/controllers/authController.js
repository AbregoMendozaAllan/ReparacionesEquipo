import bcrypt from 'bcryptjs';
import {
    createBitacoraLogin,
    createUsuarioAndLogin,
    getEmailByEmail, getPasswordHashByUsername, getUserIdAndRoleId,
    getUsernameByUsername
} from "../dao/authDao.js";
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

        const [existingUsername] = await getUsernameByUsername(username);
        console.log(existingUsername);
        if (existingUsername) {
            return res.status(400).send("usuario ya en uso");
        }

        const [existingEmail] = await getEmailByEmail(email);
        console.log(existingEmail);
        if (existingEmail) {
            return res.status(400).send("Correo electronico ya en uso");
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUsuarioAndLogin(nombre, email, telefono, 1, username, passwordHash);
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
        const user = await getUsernameByUsername(username);
        const userAgent = req.headers['user-agent'];
        const ipAdd = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const logError = (errorMessage) => {
            const errorLog =
                'Error occurred during login attempt for user: ' + username +
                '. Error message: ' + errorMessage +
                '. IP Address: ' + ipAdd +
                '. User Agent: ' + userAgent +
                '. Timestamp: ' + new Date().toISOString();
            return errorLog;
        };

        if (!user) {
            const errorLog = logError('Invalid username');
            await createBitacoraLogin(username, ipAdd, 'FAILED', errorLog, userAgent);
            return res.send('<script>alert("Error: Usuario o contraseña incorrectas!"); window.location.href = "/user/login"</script>');
        }

        const [passwordHash] = await getPasswordHashByUsername(username);
        const { password_hash: storedHashedPassword } = passwordHash;

        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!isMatch) {
            const { errorLog } = logError(username, ipAdd, userAgent, 'Invalid password');
            await createBitacoraLogin(username, ipAdd, 'FAILED', errorLog, userAgent);
            return res.send('<script>alert("Error: Usuario o contraseña incorrectas!"); window.location.href = "/user/login"</script>');
        }

        await createBitacoraLogin(username, ipAdd, 'SUCCESS', 'Null',userAgent);

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
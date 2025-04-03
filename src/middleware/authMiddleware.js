import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');

        req.user = decoded;
        next();
    });
}

export const getUserFromToken = async (req) => {
    const token = req.cookies?.token;
    if (!token) throw new Error("No token provided");

    const { userId: idUsuario, role: idRol } = jwt.verify(token, process.env.JWT_SECRET);
    return { idUsuario, idRol };
};

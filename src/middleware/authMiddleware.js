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

export const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies.token;
        if (!token) {
            return reject(new Error("No token provided"));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error("Unauthorized"));
            }

            const { userId, role } = decoded;
            resolve({ userId, role });
        });
    });
};
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

export const verifyToken = async (req, res) => {
    try {
        const { userId, role } = await verifyToken(req);
        console.log("Authenticated user:", userId, "Role:", role);
    } catch (err) {
        console.error(err.message);
        res.status(403).send("Unauthorized");
    }
};
import jwt from 'jsonwebtoken';

export const getDashboard = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Unauthorized");
        }
        const { userId, role } = decoded;
        res.render("dashboard", { userId, role });
    });
};
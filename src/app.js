import dotenv from "dotenv";
import express from "express";
import {testConnection} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboadRoutes from "./routes/dashboadRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

// Routes
app.use('/users', authRoutes);
app.use('/dashboard', dashboadRoutes);

app.use('/static', express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/users/login`);
})

testConnection();
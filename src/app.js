import dotenv from "dotenv";
import express from "express";
import {testConnection} from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
app.use('/users', loginRoutes);

app.use('/static', express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/users/login`);
})

testConnection();
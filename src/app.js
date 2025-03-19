import express from 'express';
import dotenv from 'dotenv';
import {testConnection} from "./config/db.js";

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//app.use('/empleados', empleadoRoutes);

app.use('/static', express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started. http://localhost:${port}/index`);
})

testConnection();
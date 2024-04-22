const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Middleware para parsear JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
const productosRoute = require('./../routes/productos.routes');
const userRoutes = require('./../routes/Users.routes');

app.use('/producto', productosRoute);
app.use('/users', userRoutes);

// Exportar la aplicación
module.exports = app;
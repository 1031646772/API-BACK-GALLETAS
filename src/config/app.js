const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para parsear JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de CORS
app.use(cors({
  origin: 'https://front-galletas.vercel.app', // Cambiar al dominio específico del frontend
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true // Permitir credenciales en las solicitudes
}));

// Rutas
const productosRoute = require('./../routes/productos.routes');
const userRoutes = require('./../routes/Users.routes');

app.use('/producto', productosRoute);
app.use('/users', userRoutes);

// Exportar la aplicación
module.exports = app;
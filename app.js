const express = require('express');
const path = require('path');
const app = express();
const productosRoutes = require('./routes/producto');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Para poder leer formularios con datos

// Ruta para la raíz (/)
app.get('/', (req, res) => {
  res.redirect('/producto');  // Redirige a la lista de productos
});

// Rutas
app.use('/producto', productosRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

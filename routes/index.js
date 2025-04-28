const express = require('express');
const app = express();
const productosRoutes = require('./routes/producto');

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/producto', productosRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

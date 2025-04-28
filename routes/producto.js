// routes/producto.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');  // Asegúrate de tener esta configuración

// Listar productos
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT p.id, p.nombre AS nombre_producto, p.precio, p.stock, c.nombre AS categoria
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id
      ORDER BY p.precio ASC
    `);
    res.render('index', { productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error del servidor');
  }
});
  



// ... Resto de las rutas
module.exports = router;

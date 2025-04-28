// config/database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',   // Cambia si usas otro usuario
  password: '',   // Cambia si tienes una contraseña
  database: 'tienda_productos' // Asegúrate de que el nombre de la base de datos sea correcto
});

module.exports = pool.promise();

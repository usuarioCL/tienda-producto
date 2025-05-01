const express = require('express') //Framework
const router = express.Router() //Rutas
const db = require('../config/database') //Acceso BD
const multer = require('multer');
const path = require('path');

// Ruta para acceder a la vista de creación de productos
router.get('/create', async (req, res) => {
  try {
    // Obtener los productos más recientes (por ejemplo, los últimos 5 productos)
    const [productosRecientes] = await db.query(`
      SELECT * 
      FROM productos 
      ORDER BY fecha_creacion DESC 
      LIMIT 4
    `);

    // Obtener categorías de la base de datos
    const [categorias] = await db.query("SELECT * FROM categorias");

    // Pasar productos recientes y categorías a la vista
    res.render('create', { productosRecientes, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos y categorías");
  }
});

//Muestra los datos
router.get('/listar', async (req, res) => {
  try{
    const query = `
    SELECT 
      p.idproducto,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
      p.imgurl,
      c.categoria
    FROM productos p
    INNER JOIN categorias c ON p.idcategoria = c.idcategoria
    ORDER BY p.idproducto ASC;
    `
    const [productos] = await db.query(query)
     // Convertir el precio a número
     const PrecioNum = productos.map(producto => ({
      ...producto,
      precio: Number(producto.precio) // Asegurarse de que el precio sea un número
    }));

    res.render('listar', {productos: PrecioNum})
  }catch(error){
    console.error(error)
  }
});

router.get('/catalogo', async (req, res) => {
  try {
    const { nombre, categoria, precio_min, precio_max } = req.query;

    let sql = `
      SELECT productos.*, categorias.categoria AS categoria
      FROM productos
      JOIN categorias ON productos.idcategoria = categorias.idcategoria
      WHERE 1=1
    `;
    const params = [];

    if (nombre) {
      sql += ' AND productos.nombre LIKE ?';
      params.push(`%${nombre}%`);
    }

    if (categoria) {
      sql += ' AND productos.idcategoria = ?';
      params.push(categoria);
    }

    if (precio_min) {
      sql += ' AND productos.precio >= ?';
      params.push(precio_min);
    }

    if (precio_max) {
      sql += ' AND productos.precio <= ?';
      params.push(precio_max);
    }

    const [productos] = await db.query(sql, params);
    const [categorias] = await db.query("SELECT * FROM categorias");

    res.render('catalogo', { productos, categorias, nombre, categoria, precio_min, precio_max });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos y categorías");
  }
});

//Esta ruta renderiza el formulario de edición, para ello se debe identificar el producto
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const origen = req.query.origen || 'listar';

  try {
    const [producto] = await db.query('SELECT * FROM productos WHERE idproducto = ?', [id]);
    const [categorias] = await db.query('SELECT * FROM categorias');

    res.render('edit', {
      producto: producto[0],
      categorias,
      origen
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener producto');
  }
});


//Eliminación
router.get('/delete/:id', async(req, res) => {
  try{
    //Datos que ingresan por el <form></form> req.body.objeto
    //Datos que ingresan por GET/URL req.params.atributo
    const [resultado] = await db.query("DELETE FROM productos WHERE idproducto = ?", [req.params.id])
    //res.send(resultado)
    res.redirect('/listar')
  }catch(error){
    console.error(error);
  }
})

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtro para solo imágenes
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos JPG, JPEG y PNG.'));
  }
};

// Instancia de multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});


// Ruta para crear productos (con imagen)
router.post('/create', upload.single('imagen'), async (req, res) => {
  const { categorias, nombre, descripcion, precio, stock } = req.body;
  const imgurl = req.file ? `/uploads/${req.file.filename}` : null; // La URL de la imagen almacenada
  //console.log(req.file); //confirmar en la consola si se subio la imagen
  try {
    // Guardar el nuevo producto con la URL de la imagen
    await db.query(`
      INSERT INTO productos (idcategoria, nombre, descripcion, precio, stock, imgurl) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [categorias, nombre, descripcion, precio, stock, imgurl]
    );

    res.redirect('create');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el producto");
  }
});

// Proceso de actualización de producto, incluyendo la imagen
router.post('/edit/:id', upload.single('imagen'), async (req, res) => {
  const { categorias, nombre, descripcion, precio, stock, origen } = req.body;
  let imgurl = req.body.imgurl;

  if (req.file) {
    imgurl = `/uploads/${req.file.filename}`;
  }

  try {
    await db.query(`
      UPDATE productos 
      SET idcategoria = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imgurl = ? 
      WHERE idproducto = ?`,
      [categorias, nombre, descripcion, precio, stock, imgurl, req.params.id]
    );

    // Redirige de vuelta al origen (index o create)
    res.redirect(`/${origen}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el producto');
  }
});

module.exports = router;
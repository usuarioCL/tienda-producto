const express = require('express') //Framework
const router = express.Router() //Rutas
const db = require('../config/database') //Acceso BD
const multer = require('multer');
const path = require('path');

// Ruta para acceder a la vista de creación de productos
router.get('/', async (req, res) => {
  try {
    // Obtener los productos más recientes (por ejemplo, los últimos 5 productos)
    const [productosRecientes] = await db.query(`
      SELECT * 
      FROM productos 
      ORDER BY fecha_creacion DESC 
      LIMIT 6
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
router.get('/index', async (req, res) => {
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
    res.render('index', {productos})
  }catch(error){
    console.error(error)
  }
});

//ruta para acceder a catalogos
router.get('/catalogo',async (req,res)=>{
  try {
    // Obtener productos y categorías de la base de datos
    const [productos] = await db.query("SELECT * FROM productos");
    const [categorias] = await db.query("SELECT * FROM categorias");

    // Pasar ambos productos y categorías a la vista
    res.render('catalogo', { productos, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos y categorías");
  }
})



//Esta ruta renderiza el formulario de edición, para ello se debe identificar el producto
router.get('/edit/:id', async(req, res) => {
  try{
    const [datos] = await db.query("SELECT * FROM categorias")
    const [registro] = await db.query("SELECT * FROM productos WHERE idproducto = ?", [req.params.id])

    if (registro.length > 0)
      res.render('edit', { categorias: datos, producto: registro[0] })
    else
      res.redirect('/')
  }
  catch(error){
    console.error(error)
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

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el producto");
  }
});

// Proceso de actualización de producto, incluyendo la imagen
router.post('/edit/:id', upload.single('imagen'), async (req, res) => {
  const { categorias, nombre, descripcion, precio, stock } = req.body;
  
  // Si hay una nueva imagen, se actualiza la URL de la imagen
  let imgurl = req.body.imgurl;  // La URL actual de la imagen

  if (req.file) {
    // Si se ha subido una nueva imagen, se actualiza la URL
    imgurl = `/uploads/${req.file.filename}`;
  }
  
  try {
    // Actualizar el producto en la base de datos
    await db.query(`
      UPDATE productos 
      SET idcategoria = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imgurl = ? 
      WHERE idproducto = ?`,
      [categorias, nombre, descripcion, precio, stock, imgurl, req.params.id]
    );

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});

//Eliminación
router.get('/delete/:id', async(req, res) => {
  try{
    //Datos que ingresan por el <form></form> req.body.objeto
    //Datos que ingresan por GET/URL req.params.atributo
    const [resultado] = await db.query("DELETE FROM productos WHERE idproducto = ?", [req.params.id])
    //res.send(resultado)
    res.redirect('/')
  }catch(error){
    console.error(error);
  }
})


module.exports = router;

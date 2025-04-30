const express = require('express') //Framework
const router = express.Router() //Rutas
const db = require('../config/database') //Acceso BD

//Muestra los datos
router.get('/', async (req, res) => {
  try{
    const query = `
    SELECT 
      p.idproducto,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
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

// Ruta para acceder a la vista de creación de productos
router.get('/create', async (req, res) => {
  try {
    // Obtener productos y categorías de la base de datos
    const [productos] = await db.query("SELECT * FROM productos");
    const [categorias] = await db.query("SELECT * FROM categorias");

    // Pasar ambos productos y categorías a la vista
    res.render('create', { productos, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos y categorías");
  }
});


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

router.post('/create', async(req, res) => {
  const {categorias, nombre, descripcion, precio, stock} = req.body
  //Obtener los datos
  try{
    //Guardar registro
    await db.query(`INSERT INTO productos (idcategoria, nombre, descripcion, precio, stock) VALUES (?,?,?,?,?)`, 
      [categorias, nombre, descripcion, precio, stock])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

//Proceso e actualización de datos
router.post('/edit/:id', async(req, res) => {
  try{
    //Obtener los datos
    const {categorias, nombre, descripcion, precio, stock} = req.body //<form></form>
    
    //Actualizar registro
    await db.query("UPDATE productos SET idcategoria=?, nombre=?, descripcion=?, precio=?, stock=? WHERE idproducto=?", 
      [categorias, nombre, descripcion, precio, stock, req.params.id])

    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

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

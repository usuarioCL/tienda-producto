const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//Acceso a rutas
const rutaProducto = require('./routes/producto')
//const rutaMarca = require('./routes/marca')

//Iniciar la App
const app = express();
const PORT = process.env.PORT || 3000

//Configurar "middleware" => "capa de comunicación"
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Configuración rutas
app.use('/', rutaProducto)          //Principal
//app.use('/api/marcas', rutaMarca)   //Suministrar datos

//Servidor Web
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:3000`)
});

//servir archivos estáticos (como imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

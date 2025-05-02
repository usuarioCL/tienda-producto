# Tienda de Productos

Una aplicación web de tienda en línea donde los usuarios pueden visualizar, agregar, editar y eliminar productos.  
Construido con **Node.js**, **Express**, **MySQL** y **Bootstrap**.

## Características

- Listado y catálogo de productos
- Crear, editar y eliminar productos
- Subida de imágenes para los productos
- Panel de administración básico
- Estilo responsive con Bootstrap

## Tecnologías utilizadas

- **Backend**: Node.js, Express
- **Frontend**: Bootstrap, HTML, CSS, JavaScript
- **Base de datos**: MySQL
- **Otros**: Multer (para la subida de imágenes)

##  Instalación

1. Clona este repositorio  
   ```bash
   git clone https://github.com/usuarioCL/tienda-producto.git
   cd tienda-producto

2. Intala depencias

    npm install

3. Configura la base de datos

    * Crea una base de datos MySQL (por ejemplo: tiendaed)

    * Ejecuta el script SQL que se encuentra en config/script.sql

    * Configura la conexión a la base de datos en config/database.js

4. Inicia aplicacion 

    node app.js

5. Abre navegador

    http://localhost:3000

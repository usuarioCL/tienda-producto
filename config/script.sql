CREATE DATABASE tiendaed;
-- drop database tiendaed;
USE tiendaed;

CREATE TABLE IF NOT EXISTS categorias
(
	idcategoria 			INT AUTO_INCREMENT PRIMARY KEY,
    categoria				VARCHAR (50)	NOT NULL,
    CONSTRAINT uk_categoria_ca	UNIQUE (categoria)
)ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS productos
(
    idproducto              INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria             INT         NOT NULL,
    nombre                  VARCHAR(50) NOT NULL,
    descripcion             TEXT,
    precio                  DECIMAL(10,2),
    stock                   INT DEFAULT 0,
    imgurl                  VARCHAR(500),
    fecha_creacion          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Agregado el campo fecha_creacion
    CONSTRAINT fk_categoria FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB;

INSERT INTO categorias (categoria) 
VALUES 
    ('Electrónica'), 
    ('Ropa'), 
    ('Juguetes'), 
    ('Hogar y Muebles'), 
    ('Deportes');

INSERT INTO productos (idcategoria, nombre, descripcion, precio, stock, imgurl)
VALUES
-- Electrónica (idcategoria = 1)
(1, 'Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido y micrófono integrado.', 59.99, 25, 'uploads/auriculares.jpg'),
(1, 'Smartphone Galaxy A14', 'Smartphone Android con pantalla de 6.5 pulgadas y 128 GB de almacenamiento.', 299.99, 15, 'uploads/smartphone.jpg'),

-- Ropa (idcategoria = 2)
(2, 'Camisa Casual', 'Camisa de algodón manga larga, ideal para eventos informales.', 24.50, 40, 'uploads/camisa.jpg'),
(2, 'Pantalón Jeans', 'Pantalón de mezclilla azul oscuro, corte slim fit.', 39.99, 30, 'uploads/jeans.jpg'),

-- Juguetes (idcategoria = 3)
(3, 'Bloques de Construcción', 'Set de 500 bloques de construcción para niños mayores de 5 años.', 45.00, 20, 'uploads/bloques.jpg'),
(3, 'Muñeca Interactiva', 'Muñeca que habla y canta canciones en español.', 35.99, 18, 'uploads/muneca.jpg'),

-- Hogar y Muebles (idcategoria = 4)
(4, 'Mesa de Centro', 'Mesa de centro de madera con acabado natural.', 120.00, 5, 'uploads/mesa.jpg'),
(4, 'Lámpara de Escritorio', 'Lámpara LED de escritorio con brazo ajustable.', 25.75, 10, 'uploads/lampara.jpg'),

-- Deportes (idcategoria = 5)
(5, 'Balón de Fútbol', 'Balón de fútbol tamaño 5, apto para todo tipo de canchas.', 29.99, 22, 'uploads/balon.jpg'),
(5, 'Pesas de 5kg', 'Par de mancuernas de 5 kg, recubiertas de neopreno.', 49.90, 12, 'uploads/pesas.jpg');

CREATE DATABASE tienda_productos;
USE tienda_productos;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
)ENGINE = INNODB;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    id_categoria INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
)ENGINE = INNODB;

INSERT INTO categorias (nombre) VALUES 
('Electrónica'),
('Ropa'),
('Hogar'),
('Juguetes'),
('Libros');

INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES 
('Smartphone Samsung', 'Teléfono inteligente modelo Galaxy A54', 899.99, 15, 1),
('Laptop HP', 'Laptop de 15 pulgadas, 8GB RAM', 2399.00, 8, 1),
('Camiseta Nike', 'Camiseta deportiva color azul', 129.99, 30, 2);

SELECT * FROM productos WHERE nombre LIKE 'Laptop';

SELECT * FROM productos ORDER BY precio ASC;

SELECT p.*, c.nombre AS categoria
FROM productos p
INNER JOIN categorias c ON p.id_categoria = c.id
ORDER BY c.nombre ASC;

SELECT 
    p.id, 
    p.nombre AS nombre_producto, 
    p.precio, 
    c.nombre AS categoria
FROM 
    productos p
INNER JOIN 
    categorias c ON p.id_categoria = c.id
ORDER BY 
    p.precio ASC;


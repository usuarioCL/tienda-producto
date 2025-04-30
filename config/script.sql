CREATE DATABASE tiendaed;
USE tiendaed;

CREATE TABLE IF NOT EXISTS categorias
(
	idcategoria 			INT AUTO_INCREMENT PRIMARY KEY,
    categoria				VARCHAR (50)	NOT NULL,
    CONSTRAINT uk_categoria_ca	UNIQUE (categoria)
)ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS productos
(
	idproducto				INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria				INT 		NOT NULL,
    nombre					VARCHAR(50) NOT NULL,
    descripcion				TEXT,
    precio					DECIMAL(10,2),
    stock					INT DEFAULT 0,
    CONSTRAINT fk_categoria FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria)
		ON DELETE CASCADE ON UPDATE CASCADE
    
)ENGINE = INNODB;

INSERT INTO categorias (categoria) VALUES 
('Tecnología'), 
('Ropa'),       
('Juguetes');    

INSERT INTO categorias (categoria)
VALUES ('Electrónica');

INSERT INTO productos (idcategoria, nombre, descripcion, precio, stock) VALUES
(1, 'Laptop Lenovo', 'Laptop con 16GB RAM y 512GB SSD', 2500.00, 10),
(1, 'Smartphone Samsung', 'Celular de 128GB y cámara triple', 1200.00, 15),
(1, 'Auriculares inalámbricos', 'Bluetooth con cancelación de ruido', 220.00, 20),
(1, 'Mouse gamer', 'Mouse con luces RGB y alta precisión', 85.00, 30),

(2, 'Camisa Blanca', 'Camisa de algodón para hombre', 75.50, 25),
(2, 'Pantalón Jeans', 'Pantalón denim azul clásico', 95.00, 18),
(2, 'Zapatillas deportivas', 'Zapatillas cómodas para correr', 130.00, 22),

(3, 'Muñeca Elsa', 'Muñeca de Frozen con vestido azul', 65.00, 20),
(3, 'Carro a control remoto', 'Auto eléctrico con batería recargable', 110.00, 10),
(3, 'Lego Star Wars', 'Set de construcción temático', 180.00, 12);
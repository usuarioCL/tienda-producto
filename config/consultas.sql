SELECT * FROM productos;
SELECT * FROM categorias;

SELECT 
    p.idproducto,
    p.nombre,
    p.descripcion,
    p.precio,
    p.stock,
    c.categoria
FROM productos p
INNER JOIN categorias c ON p.idcategoria = c.idcategoria;

SELECT * FROM productos WHERE idproducto = 1;
SELECT * FROM categorias WHERE idcategoria = 1;

UPDATE productos
SET nombre = 'Tablet Samsung',
    descripcion = 'Nueva versión de 128GB',
    precio = 1050.00,
    stock = 8,
    idcategoria = 1
WHERE idproducto = 1;


-- DELETE FROM productos WHERE idproducto = 1;